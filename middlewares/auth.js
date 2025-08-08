const jwt = require('jsonwebtoken');
const JWT_SECRET = "SuperSecrete1234"; // même clé que dans loginUser

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Accès non autorisé. Token manquant." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // On ajoute les infos du token à la requête
        next(); // Autorisé à accéder à la route suivante
    } catch (err) {
        res.status(401).json({ error: "Token invalide ou expiré." });
    }
};


