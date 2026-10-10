const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/authController');
const validate = require('../middleware/validate');

router.post('/register', [body('name').trim().isLength({ min: 2, max: 80 }), body('email').trim().isEmail().normalizeEmail(), body('password').isLength({ min: 8 })], validate, controller.register);
router.post('/login', [body('email').trim().isEmail().normalizeEmail(), body('password').notEmpty()], validate, controller.login);
module.exports = router;
