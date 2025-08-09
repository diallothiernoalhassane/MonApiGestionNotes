const Notes = require('../models/notesModels');

// Ajouter une note à la base de données:

exports.ajouterNote = async (req, res) => {
    try {
        const { matiere, note } = req.body;
        const fichierNom = req.file ? req.file.filename : null; // récupère le nom du fichier

        const nouvelleNote = new Notes({
            matiere,
            note,
            fichier: fichierNom
        });

        await nouvelleNote.save();

        res.status(201).json({
            message: 'Note ajoutée avec succès',
            note: nouvelleNote
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Lire toutes les notes dans la base de données:
// controllers/noteController.js

exports.getToutesNotes = async (req, res) => {
  try {
    // 1️⃣ Pagination (version courte)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 2️⃣ Tri (version claire avec if...else)
    let sortField;
    if (req.query.sort && req.query.sort.toLowerCase() === 'matiere') {
      sortField = 'matiere';
    } else {
      sortField = 'date'; // par défaut
    }

    let sortOrder;
    if (req.query.order && req.query.order.toLowerCase() === 'asc') {
      sortOrder = 1; // croissant
    } else {
      sortOrder = -1; // décroissant par défaut
    }

    // 3️⃣ Compter le total des notes
    const totalCount = await Notes.countDocuments();

    // 4️⃣ Requête avec pagination et tri
    const notes = await Notes.find()
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    // 5️⃣ Réponse
    res.json({
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      sortField,
      sortOrder,
      notes
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Lire une note spécifique dans la base de données:
exports.getNoteById = async (req,res)=>{
    try{
        const notes = await Notes.findById(req.params.id);
        if(!notes) return res.status(404).json({error: 'Note non trouvée !'});
        res.status(200).json(notes);

    }catch(err){
        res.status(400).json({error: "Id invalide !"})
    }
}

// Modifier une note dans la base de données:
exports.modifierNote = async (req,res)=>{
    try{
        const {matiere, note} = req.body;
        if(!matiere || !note) return res.status(404).json({error: "Le nom de la matière et la note sont requise !"});
        const noteModifie = await Notes.findByIdAndUpdate(
            req.params.id,
            {matiere, note},
            {new:true}
        )

        if(!noteModifie) return res.status(404).json({error: "Note non trouvée !"});
        res.status(201).json({message: "Mise de la note effectuée avec succès !", notes:noteModifie})
    
    }catch(err){
        res.status(400).json({error: "Id invalide !"});
    }
}

// Suppression d'une note dans la base de données:
exports.supprimerNote = async (req, res)=>{
    try{
        const noteSupprime = await Notes.findByIdAndDelete(req.params.id);
        if(!noteSupprime) return res.status(404).json({error: "Note non trouvée !"});
        res.status(201).json({message: "Suppression effectuée avec succès !"});

    }catch(err){
        res.status(400).json({error: "Id invalide ou erreur serveur !"})
    }
};

