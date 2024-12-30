
const express = require('express');
const UserController = require('../controllers/UserController');
const UserValidator = require('../validators/UserValidator');
const { validationResult } = require('express-validator');
const { requireAuth } = require('../middlewares/AuthMiddleware');

const router = express.Router();
//router.use(requireAuth);


router.get('/:type', UserController.getUsers);

router.get('/:type/create', UserController.createUser);

router.post('/store', UserValidator.store, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, UserController.storeUser);

router.get('/:type/edit/:slug', UserController.editUser);

router.put('/update/:slug', UserValidator.update, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, UserController.updateUser);

router.delete('/delete/:slug', UserController.deleteUser);

module.exports = router;

