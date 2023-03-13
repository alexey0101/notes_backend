const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const validateNote = require('../middleware/validateNote');
const noteController = require('../controllers/noteController');

router.post('/api/note', auth, validateNote, noteController.create);
router.get('/api/note', auth, noteController.findAll);
router.get('/api/note/:id', auth, noteController.findById);
router.patch('/api/note/:id', auth, validateNote, noteController.update);
router.delete('/api/note/:id', auth, noteController.delete);

module.exports = router;

