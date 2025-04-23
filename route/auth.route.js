const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const profileController = require('../controller/profile.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const {registerValidation, loginValidation } = require('../validation/user.validation');
const {validate, handleValidationErrors} = require('../middleware/validate.middleware');

// ثبت نام کاربران
router.post('/register', registerValidation,validate, handleValidationErrors, upload.profile.single('photo'), authController.register);
// ورود کاربران
router.post('/login', loginValidation, handleValidationErrors, validate, authController.login);

// دریافت اطلاعات پروفایل کاربران
router.get('/profile', authMiddleware.verifyToken, profileController.getProfile);
// ویرایش اطلاعات پروفایل کاربران
router.put('/profile', authMiddleware.verifyToken, upload.profile.single('photo'), profileController.updateProfile);

module.exports = router;