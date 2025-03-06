import { useState } from "react";
import axios from "axios";
import { FaPlus, FaBars, FaGlobe, FaUpload } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const API_KEY = "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"; // Remplace par ta clé OpenAI

  const sendMessage = async () => {
    if (!input.trim() && !uploadedFile) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      let botMessage;

      if (uploadedFile) {
        // Si un fichier est uploadé, l'analyser
        const formData = new FormData();
        formData.append("file", uploadedFile);
        formData.append("purpose", "file-analysis");

        const fileResponse = await axios.post(
          "https://api.openai.com/v1/files",
          formData,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        botMessage = {
          role: "assistant",
          content: `Fichier **${uploadedFile.name}** analysé avec succès !\nRéponse en cours...`,
        };
      } else if (input.toLowerCase().includes("image de")) {
        // Génération d'images précises avec DALL·E 3
        const dalleResponse = await axios.post(
          "https://api.openai.com/v1/images/generations",
          {
            model: "dall-e-3",
            prompt: input.replace("image de", "").trim(),
            n: 1,
            size: "1024x1024",
            quality: "hd",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        botMessage = {
          role: "assistant",
          content: "Voici l'image demandée :",
          image: dalleResponse.data.data[0].url,
        };
      } else {
        // Réponse textuelle avec GPT
        const chatResponse = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [...messages, userMessage],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        botMessage = {
          role: "assistant",
          content: chatResponse.data.choices[0].message.content,
        };
      }

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Erreur:", error);
    }

    setUploadedFile(null);
    setLoading(false);
  };

  // Gestion du drag & drop pour uploader les fichiers
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setUploadedFile(acceptedFiles[0]),
  });

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <FaBars className="text-xl" />
        <h1 className="text-lg font-semibold">Nouvelle discussion</h1>
        <FaPlus className="text-xl" />
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-center my-4">
          <img
            src="/assets/a.png"
            alt="Dejesus AI"
            className="h-12 mx-auto"
          />
          <h2 className="text-lg font-bold">Bonjour, je suis Dejesus AI.</h2>
          <p className="text-gray-500">Comment puis-je vous aider aujourd’hui ?</p>
        </div>

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-lg max-w-xs ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.image ? (
              <img src={msg.image} alt="Généré par IA" className="rounded-lg" />
            ) : (
              msg.content
            )}
          </div>
        ))}

        {loading && <p className="text-center text-gray-400">Dejesus AI écrit...</p>}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t bg-gray-100">
        <div className="flex items-center bg-gray-200 rounded-full p-2">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none px-4 text-sm"
            placeholder="Envoyer un message à Dejesus AI"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button {...getRootProps()} className="p-2 bg-gray-300 rounded-full ml-2">
            <FaUpload />
            <input {...getInputProps()} />
          </button>
        </div>

        {/* Affichage du fichier uploadé */}
        {uploadedFile && (
          <p className="text-sm text-center mt-2 text-gray-600">
            Fichier sélectionné : {uploadedFile.name}
          </p>
        )}

        <div className="flex justify-between mt-2">
          <button className="flex items-center px-4 py-2 bg-gray-200 rounded-full text-sm">
            ✖ Réflexion Profonde (R1)
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-200 rounded-full text-sm">
            <FaGlobe className="mr-2" /> Rechercher
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
