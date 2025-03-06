import React from "react";
import { FaCalendarCheck, FaClock, FaClipboardList, FaClipboardCheck, FaPoll, FaUserFriends, FaCalendarAlt, FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Attendance", icon: <FaCalendarCheck size={28} />, path: "/attendance" },
  { name: "Timetable", icon: <FaClock size={28} />, path: "/timetable" },
  { name: "Notice Board", icon: <FaClipboardList size={28} />, path: "/notice-board" },
  { name: "Exams", icon: <FaClipboardCheck size={28} />, path: "/exams" },
  { name: "Result", icon: <FaPoll size={28} />, path: "/result" },
  { name: "Report", icon: <FaPoll size={28} />, path: "/report" },
  { name: "Parent Profile", icon: <FaUserFriends size={28} />, path: "/parent-profile" },
  { name: "Academic Calendar", icon: <FaCalendarAlt size={28} />, path: "/academic-calendar" },
  { name: "Settings", icon: <FaCogs size={28} />, path: "/settings" },
];

const MenuPage = () => {
  return (
    <motion.div 
      className="bg-gray-100 min-h-screen flex flex-col items-center pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER */}
      <div className="bg-white shadow-md rounded-2xl w-11/12 p-6 relative">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/50" alt="Profile" className="w-14 h-14 rounded-full border-2 border-gray-300" />
          <div className="ml-4">
            <h2 className="text-lg font-bold text-gray-800">Divy Jani</h2>
            <p className="text-sm text-gray-600">Class: 9 A Science | Roll No: 1</p>
          </div>
          <Link to="/" className="absolute right-6 top-6 text-gray-500 text-xl">➝</Link>
        </div>
        <hr className="my-4" />
        {/* MENU ITEMS */}
        <div className="grid grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-green-100 text-gray-800 p-4 rounded-lg flex flex-col items-center shadow-md"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {item.icon}
              <p className="text-xs text-center font-semibold mt-2">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="fixed bottom-4 w-11/12 bg-white shadow-xl rounded-2xl flex justify-around py-4">
        <Link to="/" className="text-gray-500 text-2xl hover:text-[#1E4D6B]"><FaClock /></Link>
        <Link to="/messages" className="text-gray-500 text-2xl hover:text-[#1E4D6B]"><FaClipboardList /></Link>
        <Link to="/library" className="text-gray-500 text-2xl hover:text-[#1E4D6B]"><FaClipboardCheck /></Link>
        <Link to="/menu" className="text-[#1E4D6B] text-2xl"><FaPoll /></Link>
      </div>
    </motion.div>
  );
};

export default MenuPage;
