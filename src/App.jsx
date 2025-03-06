import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginParent from "./pages/LoginParent";
import LoginStudent from "./pages/LoginStudent";
import Dashboard from "./pages/Dashboard";
import MenuPage from "./pages/MenuPage";
import Assignments from "./pages/Assignments";
import UploadFile from "./pages/UploadFile";
import ChatBot from "./pages/ChatBot";
import CreateConference from "./pages/CreateConference";
import VideoConference from "./pages/VideoConference";
import JoinConference from "./pages/JoinConference";
import Buy from "./pages/Buy";
import PaymentForm from './pages/PaymentForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-parent" element={<LoginParent />} />
        <Route path="/login-student" element={<LoginStudent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/chatbot" element={<ChatBot />} /> {/* Correction casse */}
        <Route path="/video-conference" element={<VideoConference />} />
        <Route path="/create-conference" element={<CreateConference />} />
        <Route path="/join/:roomId" element={<JoinConference />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/PaymentForm" element={<PaymentForm />} />
        {/* Ajoute d'autres routes ici si nécessaire */}
      

        {/* Redirection en cas de route inconnue */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;