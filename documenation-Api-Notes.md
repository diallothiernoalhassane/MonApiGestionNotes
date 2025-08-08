# 📘 Documentation de l’API – Gestion de Notes

##  Base de l’API
- **URL de base :** `http://localhost:3000/api/notes`
- **Format des données :** JSON
- **Authentification :** Aucune (en développement)

---

##  Endpoints disponibles

### 1. ➕ Ajouter une note
- **Méthode :** `POST`
- **URL :** `/api/notes`
- **Body requis (JSON) :**
```json
{
  "matiere": "Mathématiques",
  "note": 8.5
}
```
- **Réponse :**
```json
{
  "_id": "ID_GENERÉ",
  "matiere": "Mathématiques",
  "note": 8.5,
  "date": "2025-08-02T21:10:45.000Z"
}
```

---

### 2. 📄 Voir toutes les notes
- **Méthode :** `GET`
- **URL :** `/api/notes`
- **Réponse :**
```json
[
  {
    "_id": "ID1",
    "matiere": "Physique",
    "note": 14,
    "date": "..."
  },
  {
    "_id": "ID2",
    "matiere": "Maths",
    "note": 17,
    "date": "..."
  }
]
```

---

### 3. 🔍 Voir une note par ID
- **Méthode :** `GET`
- **URL :** `/api/notes/:id`
- **Exemple :** `/api/notes/688fcae957565a0196369597`
- **Réponse :**
```json
{
  "_id": "688fcae957565a0196369597",
  "matiere": "Biologie",
  "note": 12,
  "date": "..."
}
```

---

### 4. ✏️ Modifier une note
- **Méthode :** `PUT`
- **URL :** `/api/notes/:id`
- **Body JSON (au moins un champ) :**
```json
{
  "note": 18
}
```
- **Réponse :**
```json
{
  "message": "Note mise à jour avec succès."
}
```

---

### 5. ❌ Supprimer une note
- **Méthode :** `DELETE`
- **URL :** `/api/notes/:id`
- **Réponse :**
```json
{
  "message": "Note supprimée avec succès."
}
```

---

## ⚠️ Gestion des erreurs
- **400 Bad Request :** Données manquantes ou invalides
- **404 Not Found :** Note non trouvée avec l’ID
- **500 Internal Server Error :** Problème serveur

---

## 🛠️ Middleware
- **Logs :** Chaque requête est enregistrée dans la console avec méthode + URL.
- **Gestion des erreurs :** Les erreurs sont captées et une réponse JSON est envoyée au client.