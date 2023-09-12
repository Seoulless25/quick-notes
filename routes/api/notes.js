const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, notesCtrl.create);

router.get('/', ensureLoggedIn, notesCtrl.index);

router.delete('/:id', ensureLoggedIn, notesCtrl.delete);

router.put('/:id', ensureLoggedIn, notesCtrl.edit);

module.exports = router;