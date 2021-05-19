const express = require('express')
const router = express.Router()
const AdminController = require('../app/controllers/AdminController')

router.get('/',AdminController.index)
router.post('/create',AdminController.create)
router.post('/login',AdminController.login)
router.post('/getMail',AdminController.getEmail)
router.post('/changePassword',AdminController.changePassword)
// router.post('/store',courseController.store)
// router.get('/:slug',courseController.index)

module.exports = router