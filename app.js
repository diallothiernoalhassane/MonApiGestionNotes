const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const connecterDb = require('./db');
const notesRoutes = require('./routes/notesRoutes');
const userRoutes = require('./routes/userRoute');
const logs = require('./middlewares/logs');
const gestionErreurs = require('./middlewares/gestionErreurs');

const app = express();

// Middlewares:
app.use(express.json());

// Sécurité : Helmet (ajoute des headers HTTP de sécurité)
app.use(helmet());

// Sécurité : CORS (autoriser uniquement certaines origines)
app.use(cors({
    origin: 'http://localhost:4000', // par exemple si ton frontend est en Vite.js
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares logs:
app.use(logs);

// Rendre le dossier uploads public:
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// La connexion avec mongodb:
connecterDb();


// Les routes:
app.use('/api',userRoutes)
app.use('/api',notesRoutes);

// Middlewares gestion des erreurs:
app.use(gestionErreurs);

// Lancement du serveur:
app.listen(3000,()=>{
    console.log('Serveur lancé sur le port 3000 !')
});

