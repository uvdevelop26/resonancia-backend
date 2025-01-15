const express = require('express');
const DashboardController = require('../controllers/DashboardController');

const router = express.Router();

router.get('/', DashboardController.start);

module.exports = router;