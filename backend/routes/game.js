const express = require('express')
const router = express.Router()
const GameController = require('../app/controllers/GameController')

router.get('/',GameController.index)
router.post('/create',GameController.create)
router.delete('/delete',GameController.delete)
// router.post('/getMail',GameController.getEmail)
// router.post('/changePassword',GameController.changePassword)


module.exports = router