const bookController = require('../controllers/bookControllers')
const express = require('express')
const router = express.Router()

router.post('/newbook', bookController.addBook)
router.get('/getAll', bookController.getBook)
router.get('/getABook/:id', bookController.getABook)
router.put('/updateABook/:id', bookController.updateABook)
router.delete('/deleteBook/:id', bookController.deleteBook)
module.exports = router