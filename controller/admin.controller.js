const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { User, Task } = require('../model');

// دریافت لیست همه کاربران
const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            attributes: { exclude: ['password'] },
            offset,
            limit
        });

        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            users: rows
        });
    } catch (error) {
        res.status(500).json({ message: 'خطا در دریافت کاربران.', error: error.message });
    }
};

// ویرایش اطلاعات یک کاربر
const updateUser = async (req, res) => {
    try {
        const userId = req.params;
        const { email, phone, password } = req.body;

        const user = await User.findOne(userId);
        console.log(user);
        if (!user) return res.status(404).json({ message: 'کاربر یافت نشد.' });
        
        // هش کردن پسورد
         if (password) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    user.password = hashedPassword
                }
        if (email) user.email = email;
        if (phone) user.phone = phone;

        await user.save();
        res.json({ message: 'اطلاعات کاربر با موفقیت به‌روزرسانی شد.' });
    } catch (error) {
        res.status(500).json({ message: 'خطا در به‌روزرسانی کاربر.', error: error.message });
    }
};

// حذف یک کاربر
const deleteUser = async (req, res) => {
    try {
        const userId = req.params;

        const user = await User.findOne(userId);
        if (!user) return res.status(404).json({ message: 'کاربر یافت نشد.' });

        // حذف عکس پروفایل درصورت وجود
                    if (user.photo) {
                        const photoPath = path.join(__dirname, '..', user.photo);
        
                        if(fs.existsSync(photoPath)) {
                            fs.unlinkSync(photoPath);
                        }
                    }

        await Task.destroy({ where: { userId: user.userId }, individualHooks: true, });
        await user.destroy();

        res.json({ message: 'کاربر و تسک‌های مرتبط با موفقیت حذف شدند.' });
    } catch (error) {
        res.status(500).json({ message: 'خطا در حذف کاربر.', error: error.message });
    }
};

// تغییر دسترسی کاربر
const changeUserRole = async (req, res) => {
    try {
        const userId = req.params;
        const { role } = req.body;
        if (!['admin', 'user'].includes(role)) return res.status(400).json({ message: 'نقش نامعتبر است.' });

        const user = await User.findOne(userId);
        if (!user) return res.status(404).json({ message: 'کاربر یافت نشد.' });

        user.role = role;
        await user.save();

        res.json({ message: 'نقش کاربر با موفقیت تغییر یافت.' });
    } catch (error) {
        res.status(500).json({ message: 'خطا در تغییر نقش کاربر.', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    changeUserRole,
}