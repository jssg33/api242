const express = require('express');
const router = express.Router();
const controller = require('../controllers/userNoticeController');

router.get('/', controller.getAllNotices);
router.get('/:id', controller.getNoticeById);
router.post('/', controller.createNotice);
router.put('/:id', controller.updateNotice);
router.delete('/:id', controller.deleteNotice);

module.exports = router;
