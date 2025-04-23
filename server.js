const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const db = require('./model')

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// ایمپورت روت‌ها
const authRoutes = require('./route/auth.route');
const taskRoutes = require('./route/task.route');
const adminRoute = require('./route/admin.route');
const downloadRoutes = require('./route/download.route');

// روت‌ها
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoute);
app.use('/api/download', downloadRoutes); //دانلود فایل

// اتصال به دیتابیس و راه‌اندازی سرور
db.sequelize
  .sync()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
