const sequelize = require('../config/database');

// ایمپورت مدل‌ها
const User = require('./user.model');
const Task = require('./task.model');

// تعریف ارتباطات 

//User and Task
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

// خروجی مدل‌ها 
module.exports = {
    sequelize,
    User,
    Task,
};