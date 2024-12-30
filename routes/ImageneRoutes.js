const express = require('express');
const { ImageneController, upload } = require('../controllers/ImageneController');

const router = express.Router();

router.get('/', ImageneController.getImagenes);

router.post('/store', upload.single('file'), ImageneController.storeImagene);

module.exports = router;
