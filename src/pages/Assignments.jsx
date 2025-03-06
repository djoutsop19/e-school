import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Assignments = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  // Charger les fichiers depuis le stockage local
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setFiles(savedFiles);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:underline mb-6"
        >
          <IoArrowBack className="mr-2" /> Retour
        </button>
        <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Bibliothèque Étudiante</h1>

        <h2 className="text-2xl font-medium text-gray-700 mb-4">Mes livres téléchargés</h2>

        {/* Grille de fichiers téléchargés */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.length > 0 ? (
            files.map((file, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <div className="w-32 h-48 bg-gray-200 flex items-center justify-center text-gray-600 font-bold rounded-md mb-4">
                  📖
                </div>
                <p className="text-center text-lg font-semibold text-gray-800 mb-2">{file.name}</p>
                <a
                  href={file.url}
                  className="block text-center text-blue-600 hover:underline mb-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir le livre
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">Aucun livre téléchargé pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
