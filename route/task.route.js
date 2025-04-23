const express = require('express');
const router = express.Router();
const taskController = require('../controller/task.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { createTaskValidator, updateTaskValidator  } = require('../validation/task.validation');
const {validate, handleValidationErrors} = require('../middleware/validate.middleware');

// بررسی داشتن توکن
router.use(authMiddleware.verifyToken)

// ایجاد تسک
router.post('/', createTaskValidator, validate, handleValidationErrors, upload.attachment.single('attachment'), taskController.createTask);

//دریافت لیست تسک ها
router.get('/', taskController.getTasks);
// دریافت یک تسک خاص
router.get('/:taskId', taskController.getTask);

// ویرایش اطلاعات یک تسک خاص
router.put('/:taskId', updateTaskValidator, validate, handleValidationErrors, upload.attachment.single('attachment'), taskController.updateTask);

// حذف یک تسک خاص
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;