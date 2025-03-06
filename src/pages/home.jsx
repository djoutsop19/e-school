import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import illustration from "../assets/illustration.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1E4D6B] text-center">
      
      {/* Illustration animée */}
      <motion.img
        src={illustration}
        alt="Illustration"
        className="w-60 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Carte avec animation */}
      <motion.div
        className="bg-white rounded-t-3xl p-8 w-full max-w-md"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-xl font-bold text-gray-900">
          eSchool - Virtual School Management System
        </h1>
        <p className="text-gray-600 mt-2">
          eSchool Serves You Virtual Education At Your Home
        </p>

        {/* Boutons avec animation de clic */}
        <div className="mt-6 space-y-4">
          {/* Lien vers la page de connexion étudiant */}
          <Link to="/login-student">
            <motion.button
              className="w-full bg-[#1E4D6B] text-white py-3 rounded-md text-lg font-semibold"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05, backgroundColor: "#23658A" }} // Animation hover
              aria-label="Login as Student" // Accessibilité
            >
              Login as Student
            </motion.button>
          </Link>

          {/* Lien vers la page de connexion parent */}
          <Link to="/login-parent">
            <motion.button
              className="w-full border-2 border-[#1E4D6B] text-[#1E4D6B] py-3 rounded-md text-lg font-semibold hover:bg-[#1E4D6B] hover:text-white transition"
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }} 
              aria-label="Login as Parent" 
            >
              Login as Parent
            </motion.button>
          </Link>

          {/* Lien vers la page de vidéoconférence */}
          <Link to="/PaymentForm">
            <motion.button
              className="w-full bg-[#23658A] text-white py-3 rounded-md text-lg font-semibold mt-4"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05, backgroundColor: "#1E4D6B" }}
              aria-label="Paym" // Accessibilité
            >
              Join Video Conference
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
  
}
