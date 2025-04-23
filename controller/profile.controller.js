const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { User } = require('../model');

// دریافت اطلاعات پروفایل کاربر بجز پسورد
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password', 'attachment'] }
        });
        if (!user) return res.status(404).json({ message: 'کاربر یافت نشد.' });
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).json({ message: 'خطا در دریافت پروفایل.', error: error.message });
    }
};

// ویرایش اطلاهات کاربر
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { email, phone, password } = req.body;
        const photo = req.file?.path;
        let downloadName = task.downloadName ? task.downloadName : null;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'کاربر یافت نشد.' });

        // بررسی وجود عکس پروفایل و جایگزینی با عکس جدید درصورت وجود
        if (photo) {
            downloadName = path.basename(photo);
            if (user.photo) {
                const oldPhoto = path.join(__dirname, '..', user.photo);

                if (fs.existsSync(oldPhoto)) {
                    fs.unlinkSync(oldPhoto);
                }
            }
            user.photo = photo;
            user.downloadName = downloadName;
        }

        // به‌روزرسانی فیلدها
        if (email) user.email = email;
        if (phone) user.phone = phone;
        // هش کردن رمز عبور
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword
        }

        await user.save();
        res.json({ message: 'پروفایل با موفقیت به‌روزرسانی شد.', user });
    } catch (error) {
        res.status(500).json({ message: 'خطا در به‌روزرسانی پروفایل.', error: error.message });
    }
}

module.exports = {
    getProfile,
    updateProfile,
};