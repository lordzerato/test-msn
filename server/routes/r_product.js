const router = require('express').Router()
const Controller = require('../controllers/c_product')

router.get('/', Controller.showAll)
router.get('/category/:category_id', Controller.showByCategory)
router.get('/input-auto', Controller.addAuto)
router.put('/:product_id', Controller.updateProduct)
router.delete('/:product_id', Controller.removeProduct)

module.exports = router