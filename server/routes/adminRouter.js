const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')

router.get('/block_unlock', adminController.blockUnlock)
router.get('/applying_administrator', adminController.applyingAdministrator)

module.exports = router