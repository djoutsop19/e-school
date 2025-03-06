import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaComment, FaBook, FaThLarge, FaBell } from "react-icons/fa";
import { motion } from "framer-motion";
import Assignments from './Assignments';
import ChatBot from './ChatBot';

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  const toggleChatBot = () => setShowChatBot(!showChatBot);

  const subjects = [
    { name: "Maths (Practical)", color: "bg-blue-400", icon: "✏️" },
    { name: "English", color: "bg-orange-400", icon: "📖" },
    { name: "Hindi", color: "bg-gray-600", icon: "🅰️" },
    { name: "Science (Practical)", color: "bg-red-400", icon: "🔬", link: "/join/:roomId" },
    { name: "Account", color: "bg-purple-400", icon: "📊" },
    { name: "Cours (Practical)", color: "bg-orange-500", icon: "📹", link: "/create-conference" }
  ];

  return (
    <motion.div
      className="bg-gray-100 min-h-screen flex flex-col items-center pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#1E4D6B] w-full p-6 rounded-b-2xl text-white flex items-center relative">
        <img src="https://via.placeholder.com/50" alt="Profile" className="w-14 h-14 rounded-full border-2 border-white" />
        <div className="ml-4">
          <h2 className="text-lg font-bold">Divy Jani</h2>
          <p className="text-sm">Class: 9 A Science | Roll No: 1</p>
        </div>
        <FaBell className="absolute right-6 top-6 text-white text-2xl cursor-pointer" />
      </div>

      <div className="w-11/12 mt-6">
        <h3 className="text-gray-700 font-bold text-lg mb-3">My Subjects</h3>
        <div className="grid grid-cols-3 gap-4">
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              className={`${subject.color} text-white p-4 rounded-lg flex flex-col items-center shadow-md`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {subject.link ? (
                <Link to={subject.link} className="flex flex-col items-center">
                  <span className="text-3xl">{subject.icon}</span>
                  <p className="text-xs text-center font-semibold mt-2">{subject.name}</p>
                </Link>
              ) : (
                <>
                  <span className="text-3xl">{subject.icon}</span>
                  <p className="text-xs text-center font-semibold mt-2">{subject.name}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {showMenu && (
        <motion.div
          className="absolute top-20 left-0 w-full h-full bg-white shadow-lg rounded-t-2xl p-6"
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <img src="https://via.placeholder.com/50" alt="Profile" className="w-14 h-14 rounded-full border-2 border-gray-300" />
            <div className="ml-4">
              <h2 className="text-lg font-bold">Divy Jani</h2>
              <p className="text-sm">Class: 9 A Science | Roll No: 1</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "Attendance", icon: "📅" },
              { name: "Timetable", icon: "⏰" },
              { name: "Notice Board", icon: "📜" },
              { name: "Exams", icon: "📝" },
              { name: "Result", icon: "📄" },
              { name: "Report", icon: "🗂" },
              { name: "Parent Profile", icon: "👨‍👩‍👧" },
              { name: "Academic Calendar", icon: "📆" },
              { name: "Settings", icon: "⚙️" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-green-200 p-4 rounded-lg flex flex-col items-center shadow-md"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="text-xs text-center font-semibold mt-2">{item.name}</p>
              </motion.div>
            ))}
          </div>
          <button
            onClick={() => setShowMenu(false)}
            className="mt-6 bg-red-500 text-white py-2 px-6 rounded-full shadow-md"
          >
            Fermer
          </button>
        </motion.div>
      )}

      {showAssignments && (
        <motion.div
          className="absolute top-20 left-0 w-full h-full bg-white shadow-lg rounded-t-2xl p-6"
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <img src="https://via.placeholder.com/50" alt="Profile" className="w-14 h-14 rounded-full border-2 border-gray-300" />
            <div className="ml-4">
              <h2 className="text-lg font-bold">Divy Jani</h2>
              <p className="text-sm">Class: 9 A Science | Roll No: 1</p>
            </div>
          </div>
          <Assignments />
          <button
            onClick={() => setShowAssignments(false)}
            className="absolute top-20 right-6 bg-red-500 text-white py-2 px-6 rounded-full shadow-md"
          >
            Fermer
          </button>
        </motion.div>
      )}

      <div className="fixed bottom-4 w-11/12 bg-white shadow-xl rounded-2xl flex justify-around py-4">
        <Link to="/" className="text-[#1E4D6B] text-2xl"><FaHome /></Link>
        <button
          className="text-gray-500 text-2xl hover:text-[#1E4D6B]"
          onClick={() => setShowAssignments(!showAssignments)}
        >
          <FaBook />
        </button>
        <button
          className="text-gray-500 text-2xl hover:text-[#1E4D6B]"
          onClick={() => setShowMenu(true)}
        >
          <FaThLarge />
        </button>
        <button
          onClick={toggleChatBot}
          className="text-gray-500 text-2xl hover:text-[#1E4D6B]"
        >
          <FaComment />
        </button>
      </div>

      {showChatBot && (
        <motion.div
          className="absolute bottom-24 left-0 w-full max-h-[60vh] bg-white shadow-xl rounded-t-2xl p-6 overflow-y-auto"
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ChatBot />
          <button
            onClick={toggleChatBot}
            className="mt-4 bg-red-500 text-white py-2 px-6 rounded-full shadow-md"
          >
            Fermer
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dashboard;
