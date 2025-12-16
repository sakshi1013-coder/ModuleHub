const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, notificationController.getMyNotifications);
router.put('/read', auth, notificationController.markAsRead);

module.exports = router;
