const authorController = require('../controllers/authorControllers')
const express = require('express')
const router = express.Router()

router.post('/newauthor', authorController.addAuthor)
router.get('/getAll', authorController.getAllAuthor)
router.get('/getAnAuthor/:id', authorController.getAnAuthor)
router.put('/updateAnAuthor/:id', authorController.updateAnAuthor)
router.delete('/deleteAuthor/:id', authorController.deleteAuthor)
module.exports = router