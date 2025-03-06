import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const CreateConference = () => {
  const [stream, setStream] = useState(null);
  const [room, setRoom] = useState("");
  const [socket, setSocket] = useState(null);
  const [isConferenceStarted, setIsConferenceStarted] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [conferenceLink, setConferenceLink] = useState("");
  const [screenStream, setScreenStream] = useState(null);

  useEffect(() => {
    const socketIo = io("http://localhost:5000");

    socketIo.on("connect", () => {
      console.log("Connecté au serveur WebSocket !");
    });

    socketIo.on("user-joined", (name) => {
      setParticipants((prev) => [...prev, name]);
    });

    socketIo.on("receive-offer", async (offer) => {
      await handleOffer(offer);
    });

    socketIo.on("receive-answer", (answer) => {
      handleAnswer(answer);
    });

    socketIo.on("receive-ice-candidate", (candidate) => {
      handleNewICECandidate(candidate);
    });

    socketIo.on("receive-screen", (screen) => {
      const screenVideo = document.querySelector("#screen-video");
      if (screenVideo) {
        screenVideo.srcObject = screen;
      }
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const startConference = async () => {
    if (!room || !userName) {
      setError("Veuillez entrer un nom et un code de salle.");
      return;
    }

    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(userStream);
      setIsConferenceStarted(true);

      const generatedLink = `${window.location.origin}/join/${room}`;
      setConferenceLink(generatedLink);

      socket.emit("join-room", room, userName);

      const offer = await createOffer(userStream);
      socket.emit("send-offer", room, offer);

      const videoElement = document.querySelector("video");
      if (videoElement) {
        videoElement.srcObject = userStream;
      }
    } catch (error) {
      console.error("Erreur d'accès aux médias :", error);
      setError("Erreur d'accès à la caméra ou au microphone.");
    }
  };

  const createOffer = async (userStream) => {
    const peerConnection = new RTCPeerConnection();

    userStream.getTracks().forEach(track => peerConnection.addTrack(track, userStream));

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("send-ice-candidate", room, event.candidate);
      }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    return offer;
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenStream(screenStream);

      socket.emit("send-screen", room, screenStream);

      const peerConnection = new RTCPeerConnection();
      screenStream.getTracks().forEach(track => peerConnection.addTrack(track, screenStream));

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socket.emit("send-offer", room, offer);

      const screenVideoElement = document.querySelector("#screen-video");
      if (screenVideoElement) {
        screenVideoElement.srcObject = screenStream;
      }

    } catch (error) {
      console.error("Erreur lors du partage d'écran :", error);
      setError("Impossible de démarrer le partage d'écran.");
    }
  };

  const handleOffer = async (offer) => {
    const peerConnection = new RTCPeerConnection();

    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit("send-answer", room, answer);

    peerConnection.ontrack = (event) => {
      const remoteVideo = document.querySelector("#remote-video");
      if (remoteVideo) {
        remoteVideo.srcObject = event.streams[0];
      }
    };
  };

  const handleAnswer = (answer) => {
    const peerConnection = new RTCPeerConnection();
    peerConnection.setRemoteDescription(answer);
  };

  const handleNewICECandidate = (candidate) => {
    const peerConnection = new RTCPeerConnection();
    peerConnection.addIceCandidate(candidate);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E4D6B] text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Créer une Vidéoconférence</h1>

      {error && <div className="text-red-400 mb-4 p-2">{error}</div>}

      {!isConferenceStarted ? (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Votre nom"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border border-gray-300 text-gray-900"
          />
          <input
            type="text"
            placeholder="Entrez le code de la salle"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border border-gray-300 text-gray-900"
          />
          <button onClick={startConference} className="w-full bg-[#1E4D6B] text-white py-3 rounded-md">
            Démarrer la conférence
          </button>
        </div>
      ) : (
        <div className="flex w-full max-w-5xl">
          <div className="w-3/4 p-4">
            {stream && (
              <video autoPlay muted className="w-full rounded-xl shadow-lg border-4 border-[#1E4D6B]" ref={(video) => {
                if (video) {
                  video.srcObject = stream;
                }
              }} />
            )}
            {screenStream && (
              <video autoPlay className="w-full mt-4 rounded-xl shadow-lg border-4 border-[#1E4D6B]" id="screen-video" />
            )}
          </div>
          <div className="w-1/4 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-bold">Participants</h2>
            <ul>
              {participants.map((participant, index) => (
                <li key={index} className="p-2 border-b border-gray-600">
                  {participant}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <button onClick={startScreenShare} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
        Partager mon écran
      </button>

      {conferenceLink && (
        <div className="mt-4">
          <p className="text-sm">Lien de la conférence :</p>
          <input type="text" value={conferenceLink} readOnly className="w-full p-2 text-black border rounded-md" />
          <button onClick={() => navigator.clipboard.writeText(conferenceLink)} className="mt-2 bg-[#1E4D6B] text-white py-2 px-4 rounded-md">
            Copier le lien
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateConference;
