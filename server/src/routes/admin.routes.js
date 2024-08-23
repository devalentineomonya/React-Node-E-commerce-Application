const express = require('express');
const { createAdmin, getAdminById, updateAdminById, deleteAdminById } = require('../controllers/admin.controller');
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware');

const adminRouter = express.Router();

adminRouter
  .get('/get/:adminId', authMiddleware, isAdmin, getAdminById)
  .post('/add', authMiddleware, isAdmin, createAdmin)
  .put('/update/:adminId', authMiddleware, isAdmin, updateAdminById)
  .delete('/delete/:adminId', authMiddleware, isAdmin, deleteAdminById);

module.exports = adminRouter;
