const express = require('express')
const router = express.Router()
const noteController = require('../controllers/notesControllers')
const auth = require('../middlewares/auth')
const upload = require('../middlewares/multer')

// Post: Ajouter une note avec upload fichier:
router.post('/notes',auth, upload.single('fichier'), noteController.ajouterNote);

// Autres routes CRUD
router.get('/notes', noteController.getToutesNotes);
router.get('/notes/:id', auth, noteController.getNoteById);
router.put('/notes/:id', auth, noteController.modifierNote);
router.delete('/notes/:id', auth, noteController.supprimerNote);

// Export du router (UNE SEULE FOIS)
module.exports = router;
