const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');

// یررسی داشتن توکن و ادمین بودن
router.use(authMiddleware.verifyToken, authMiddleware.isAdmin);

// دریافت لیست همه کاربرام 
router.get('/users', adminController.getAllUsers);

// ویرایش اطلاعات کاربر
router.put('/update-user/:userId', adminController.updateUser);
// تغییر سطح دسترسی کاربر
router.put('/update-user-role/:userId', adminController.changeUserRole);

// حذف کاربر
router.delete('/delete-user/:userId', adminController.deleteUser);

module.exports = router