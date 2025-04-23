const express = require('express');
const path = require('path');
const fs = require('fs');

// دانلود فایل با نام از URL
const downloadFile = async(req, res) => {
    const { type, fileName }= req.params;
    console.log('type:', type);
    console.log('filename:', fileName);
    
    if (!type || !fileName) {
        return res.status(400).json({ message: 'پارامترهای مسیر ناقص هستند.' });
    }

    // بررسی نوع مجاز
    if (!['profiles', 'attachments'].includes(type)) {
        return res.status(400).json({ message: 'نوع فایل نامعتبر است.' });
    }

    const filePath = path.join(__dirname, '../storage', type, fileName);

    // بررسی وجود فایل
    if (fs.existsSync(filePath)) {
        res.download(filePath); // دانلود مستقیم
    } else {
        res.status(404).json({ message: 'فایل پیدا نشد' });
    }
};

module.exports = {downloadFile};
