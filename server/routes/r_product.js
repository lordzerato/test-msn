const router = require('express').Router()
const Controller = require('../controllers/c_product')

router.get('/showAll', Controller.showAll)
router.get('/show/:id_category', Controller.showByCategory)
router.get('/input-auto', Controller.addAuto)

module.exports = router