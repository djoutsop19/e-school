import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoTrash } from "react-icons/io5";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setFiles(savedFiles);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier.");
      return;
    }

    const newFile = {
      name: file.name,
      url: URL.createObjectURL(file),
    };

    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));

    alert("Fichier téléchargé avec succès !");
    setFile(null);
  };

  const handleDelete = (fileName) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-md shadow-md bg-white space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Télécharger un fichier</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {file && (
        <p className="text-sm text-gray-600">
          Fichier sélectionné : <span className="font-medium">{file.name}</span>
        </p>
      )}
      <button
        onClick={handleFileUpload}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Télécharger
      </button>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      <h2 className="text-lg font-semibold text-gray-700 mt-6">Fichiers téléchargés :</h2>
      <div className="space-y-2">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              <a href={file.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
              <button onClick={() => handleDelete(file.name)} className="text-red-500 hover:text-red-700">
                <IoTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">Aucun fichier disponible.</p>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
