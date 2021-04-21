const router = require('express').Router()
const r_product = require('./r_product')

router.get('/', (req, res) => {
    res.status(200).json({ message: "Success" })
})
router.use('/products', r_product)

module.exports = router