const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')

router.get('/block_unlock', adminController.blockUnlock)
router.get('/all_users', adminController.allUsers)
router.get('/one_users', adminController.oneUsers)
router.get('/applying_administrator', adminController.applyingAdministrator)

module.exports = router