# 🧠 Task Manager API

مدیریت تسک‌های شخصی با احراز هویت، بارگذاری فایل و پنل ادمین.

---

## 🚀 شروع سریع

### پیش‌نیازها

- Node.js
- MySQL
- Redis

### نصب

```bash
npm install
```

### تنظیمات

یک فایل `.env` بسازید:

```
DB_NAME=your_database
DB_USER=root
DB_PASS=123456
JWT_SECRET=yourSecretKey
```

### اجرا

```bash
npm run dev
```

---

## 📁 ساختار پوشه‌ها

```
├── controllers/
├── models/
├── routes/
├── middlewares/
├── storage/
└── app.js
```

---

## 🛠 APIهای اصلی

| متد | مسیر | توضیحات |
|-----|------|---------|
| GET | /api/tasks | لیست تسک‌ها (با پگینیشن، فیلتر، سورت) |
| POST | /api/tasks | ساخت تسک جدید |
| GET | /api/tasks/:taskId | دریافت تسک خاص |
| PUT | /api/tasks/:taskId | ویرایش تسک |
| DELETE | /api/tasks/:taskId | حذف تسک |
| GET | /api/auth/profile | دریافت پروفایل |
| PUT | /api/auth/profile | ویرایش پروفایل |
| GET | /api/download/:type/:fileName | دانلود فایل پیوست |
| GET | /api/admin/users | دریافت لیست کاربران (با پگینیشن) |
| PUT | /api/admin/update-user/:userId | ویرایش کاربر |
| PUT | /api/admin/update-user-role/:userId | تغییر نقش کاربر |
| DELETE | /api/admin/delete-user/:userId | حذف کاربر |

---

## ⚙️ راه‌اندازی با PM2

```bash
npm install -g pm2
pm run build
pm2 start app.js --name task-manager
```

برای مشاهده وضعیت:
```bash
pm2 status
```

برای توقف:
```bash
pm2 stop task-manager
```

---

## 🧪 تست با Postman

کالکشن Postman در مسیر `postman_collection.json` قرار دارد. پس از ایمپورت در Postman، می‌توانید تمام APIها را تست کنید.

---

## 📄 مجوز و مشارکت

کامیت‌ها با رعایت استاندارد Gitflow انجام شده‌اند. مشارکت‌ها خوش‌آمد هستند! ✅

