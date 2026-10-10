const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/productController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');

router.get('/stats/summary', controller.summary);
router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', auth, upload.single('image'), [body('name').trim().isLength({ min: 2, max: 120 }), body('price').isFloat({ min: 0 }).toFloat(), body('category').trim().notEmpty(), body('stock').optional().isInt({ min: 0 }).toInt()], validate, controller.create);
router.put('/:id', auth, upload.single('image'), [body('name').optional().trim().isLength({ min: 2, max: 120 }), body('price').optional().isFloat({ min: 0 }).toFloat(), body('category').optional().trim().notEmpty(), body('stock').optional().isInt({ min: 0 }).toInt()], validate, controller.update);
router.delete('/:id', auth, controller.remove);
module.exports = router;
