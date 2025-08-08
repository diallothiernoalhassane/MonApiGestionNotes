const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = "SuperSecrete1234"; // 🔐 À mettre dans .env
const userSchema = require('../validateurs/userValidateur');

// ✅ Ajouter un utilisateur
exports.ajoutUser = async (req, res) => {
    try {
        // Validation avec Joi
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, passWord } = req.body;

        // Hachage du mot de passe
        const masquerPassWord = await bcrypt.hash(passWord, 10);

        // Création et sauvegarde
        const user = new User({ email, passWord: masquerPassWord });
        await user.save();

        res.status(201).json({
            message: "Utilisateur ajouté avec succès !",
            user: { _id: user._id, email: user.email }
        });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "Email déjà utilisé !" });
        }
        res.status(500).json({ error: "Erreur serveur !" });
    }
};



// ✅ Connexion d’un utilisateur
exports.loginUser = async (req, res) => {
    try {
        const { email, passWord } = req.body;

        if (!email || !passWord) {
            return res.status(400).json({ error: "Email et mot de passe requis !" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }

        const isMatch = await bcrypt.compare(passWord, user.passWord);
        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Connexion réussie !",
            token,
            user: { _id: user._id, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: "Erreur de serveur !" });
    }
};

// ✅ Afficher les utilisateurs
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find().select('-passWord');
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: "Erreur de serveur !" });
    }
};

