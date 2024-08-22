const express = require('express');
const { createAdmin, getAdminById, updateAdminById, deleteAdminById } = require('../controllers/admin.controller');

const adminRouter = express.Router();

adminRouter
  .post('/admin', createAdmin)  
  .get('/admin/:adminId', getAdminById)  
  .put('/admin/:adminId', updateAdminById)  
  .delete('/admin/:adminId', deleteAdminById); 

module.exports = adminRouter;
