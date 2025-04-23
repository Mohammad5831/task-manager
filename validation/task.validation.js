const { body } = require('express-validator');

// ولیدیشن ایجاد تسک
const createTaskValidator = [
    body('taskName')
      .notEmpty().withMessage('Task name is required')
      .isLength({ min: 3 }).withMessage('Task name must be at least 3 characters long'),
  
    body('description')
      .optional()
      .isLength({ min: 3 }).withMessage('Description must be at least 5 characters long'),
  
    body('attachment')
      .optional()
      .isString().withMessage('Attachment must be a string'),
];

// ولیدیشن ویرایش تسک
const updateTaskValidator = [
  body('taskName')
    .optional()
    .isLength({ min: 3 }).withMessage('Task name must be at least 3 characters long'),

  body('description')
    .optional()
    .isLength({ min: 3 }).withMessage('Description must be at least 5 characters long'),

  body('attachment')
    .optional()
    .isString().withMessage('Attachment must be a string'),
];

module.exports = {
  createTaskValidator,
  updateTaskValidator,
};
