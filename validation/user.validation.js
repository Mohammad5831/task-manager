const { body } = require('express-validator');

// ولیدیشن ثبت نام کاربران
const registerValidation = [
  body('username')
    .notEmpty().withMessage('نام کاربری الزامی است.')
    .isLength({ min: 3 }).withMessage('نام کاربری باید حداقل ۳ کاراکتر باشد.'),
  body('email')
    .notEmpty().withMessage('ایمیل الزامی است.')
    .isEmail().withMessage('ایمیل معتبر نیست.'),
  body('phoneNumber')
    .notEmpty().withMessage('شماره تلفن الزامی است.')
    .isMobilePhone('fa-IR').withMessage('شماره تلفن معتبر نیست.'),
  body('password')
    .notEmpty().withMessage('رمز عبور الزامی است.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage('رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ و کوچک باشد.'),
];

// ولیدیشن ورود کاربران
const loginValidation = [
    body('username')
      .notEmpty().withMessage('نام کاربری الزامی است.'),
    body('password')
      .notEmpty().withMessage('رمز عبور الزامی است.'),
  ];

module.exports = {
  registerValidation,
  loginValidation,
};
