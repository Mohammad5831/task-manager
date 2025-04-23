
// میدلور اپلود فایل(پروفایل و پیوست ها)
const multer = require('multer');
const path = require('path');

// اپلود پیوست
const attachmentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/attachments');
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
})

// اپلود عکس پروفایل
const profileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/profiles');
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
})

const upload = {
    profile: multer({ storage: profileStorage }),
    attachment: multer({ storage: attachmentStorage }),
};


module.exports = upload