const express = require('express');

const router = express.Router();
const OrderController = require('../controllers/order');


router.post('/', OrderController.create)
router.get('/',OrderController.getAll)

module.exports = router;