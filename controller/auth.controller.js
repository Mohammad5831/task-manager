const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize')
const { User } = require('../model');

// ثبت نام
const register = async (req, res) => {
    try {
        const { username, email, phoneNumber, password } = req.body;
        const photo = req.file ? req.file.path : null;
        const role = req.body ? req.body.role : 'user';
        let downloadName = null;

        // بررسی وجود کاربر با نام کاربری، ایمیل یا شماره تلفن مشابه
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email },
                    { phoneNumber },
                ],
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'نام کاربری، ایمیل یا شماره تلفن قبلاً استفاده شده است.' });
        }
        if (photo) {
            downloadName = path.basename(photo);
        }

        // هش کردن رمز عبور
        const hashedPassword = await bcrypt.hash(password, 10);

        // ایجاد کاربر جدید
        const newUser = await User.create({
            username,
            email,
            phoneNumber,
            password: hashedPassword,
            photo,
            downloadName,
            role,
        });

        res.status(201).json({ message: 'ثبت‌نام با موفقیت انجام شد.', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'خطا در ثبت‌نام کاربر.', error: error.message });
    }
};

// ورود
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // بررسی وجود کاربر با نام کاربری وارد شده
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'نام کاربری یا رمز عبور اشتباه است.' });
        }

        // مقایسه رمز عبور وارد شده با رمز عبور ذخیره شده
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'نام کاربری یا رمز عبور اشتباه است.' });
        }

        // ایجاد توکن JWT
        const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'ورود با موفقیت انجام شد.', token });
    } catch (error) {
        res.status(500).json({ message: 'خطا در ورود به سیستم.', error: error.message });
    }
};

module.exports = {
    register,
    login
}