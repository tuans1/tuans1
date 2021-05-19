const express = require('express')
const router = express.Router()
const AccountController = require('../app/controllers/AccountController')

router.get('/', AccountController.index)
router.post('/create', AccountController.create)
router.put('/edit', AccountController.edit)
router.delete('/delete', AccountController.delete)
// router.get('/:slug',courseController.index)

module.exports = router