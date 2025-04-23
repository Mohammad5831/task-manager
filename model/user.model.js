const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const fs = require('fs');
const path = require('path');


const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    downloadName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        DefaultValue: 'user',
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
});


User.beforeDestroy(async (user, options) => {
    if (user.profileImage) {
      const filePath = path.resolve(user.profileImage);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('خطا در حذف تصویر پروفایل:', err);
        } else {
          console.log('تصویر پروفایل با موفقیت حذف شد:', filePath);
        }
      });
    }
  });

module.exports = User;