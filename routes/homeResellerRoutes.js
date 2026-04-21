const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeResellerController');

router.post('/', controller.createProperty);
router.get('/', controller.getProperties);
router.get('/:id', controller.getPropertyById);
router.put('/:id', controller.updateProperty);
router.delete('/:id', controller.deleteProperty);

module.exports = router;
