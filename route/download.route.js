const express = require('express');
const router = express.Router();
const {downloadFile} = require('../controller/download.controller')
const authMiddleware = require('../middleware/auth.middleware');

router.get('/:type/:fileName', downloadFile);

module.exports = router;