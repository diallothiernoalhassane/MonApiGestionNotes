const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes pour ajouter un utilisateur:
router.post('/users',userController.ajoutUser);
// Route de connexion de l'utilisateur
router.post('/login', userController.loginUser);
// Afficher tous les utilisateurs existant dans la base de données:
router.get('/users',userController.getAllUser);

// exportation du router:
module.exports = router;

