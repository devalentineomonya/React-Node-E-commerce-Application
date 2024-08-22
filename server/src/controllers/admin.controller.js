const mongoose = require('mongoose');
const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');


const hashPassword = async (password) => {
  return await bcrypt.hash(password, 15);
};


const createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, password } = req.body;


    const hashedPassword = await hashPassword(password);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      gender,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ success: true, message: 'Admin created successfully', data: newAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


const getAdminById = async (req, res) => {
  const { adminId } = req.params;

  if (!mongoose.isValidObjectId(adminId)) {
    return res.status(400).json({ success: false, message: 'Invalid admin ID' });
  }

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


const updateAdminById = async (req, res) => {
  const { adminId } = req.params;

  if (!mongoose.isValidObjectId(adminId)) {
    return res.status(400).json({ success: false, message: 'Invalid admin ID' });
  }

  try {
    const updateData = req.body;
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({ success: true, message: 'Admin updated successfully', data: updatedAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


const deleteAdminById = async (req, res) => {
  const { adminId } = req.params;

  if (!mongoose.isValidObjectId(adminId)) {
    return res.status(400).json({ success: false, message: 'Invalid admin ID' });
  }

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    res.status(200).json({ success: true, message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


module.exports = {
  createAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
