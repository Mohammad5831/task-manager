const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const fs = require('fs');
const path = require('path');
const User = require('./user.model');

const Task = sequelize.define('Task', {
    taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    attachment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    downloadName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userId',
        },
    },
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
});


Task.beforeDestroy(async (task, options) => {
    if (task.attachment) {
      const filePath = path.resolve(task.attachment);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('خطا در حذف فایل پیوست:', err);
        } else {
          console.log('فایل پیوست با موفقیت حذف شد:', filePath);
        }
      });
    }
  });

module.exports = Task;