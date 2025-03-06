import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page non trouvée</p>
      <Link to="/" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;