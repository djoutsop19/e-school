const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nomme les fichiers avec un timestamp
  },
});
const upload = multer({ storage });

// Route pour uploader le fichier
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Fichier reçu :", req.file);
  res.status(200).json({ message: "Fichier uploadé avec succès !" });
});

// Démarrer le serveur
app.listen(5000, () => {
  console.log("Serveur démarré sur http://localhost:5000");
});