import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const JoinConference = () => {
  const { roomId } = useParams();
  const [userName, setUserName] = useState("");
  const [socket, setSocket] = useState(null);
  const [stream, setStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [error, setError] = useState("");
  const [isViewing, setIsViewing] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const screenVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    const socketIo = io("http://localhost:5000");
    setSocket(socketIo);

    return () => socketIo.disconnect();
  }, []);

  const joinConference = async () => {
    if (!userName || !socket) return;

    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(userStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = userStream;
      }
      socket.emit("join-room", roomId, userName);
    } catch (error) {
      console.error("Erreur média:", error);
      setError("Erreur d'accès à la caméra ou au microphone.");
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleReceiveOffer = async (offer) => {
      peerConnectionRef.current = new RTCPeerConnection();
      await peerConnectionRef.current.setRemoteDescription(offer);
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socket.emit("send-answer", roomId, answer);

      peerConnectionRef.current.ontrack = (event) => {
        setRemoteStreams((prevStreams) => [...prevStreams, event.streams[0]]);
      };

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("send-ice-candidate", roomId, event.candidate);
        }
      };
    };

    const handleReceiveScreen = (screenStream) => {
      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = screenStream;
      }
    };

    socket.on("receive-offer", handleReceiveOffer);
    socket.on("receive-screen", handleReceiveScreen);

    return () => {
      socket.off("receive-offer", handleReceiveOffer);
      socket.off("receive-screen", handleReceiveScreen);
    };
  }, [socket, roomId]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive-ice-candidate", (candidate) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.addIceCandidate(candidate);
      }
    });

    return () => {
      socket.off("receive-ice-candidate");
    };
  }, [socket]);

  const toggleView = () => {
    setIsViewing(!isViewing);
  };

  return (
    <div className="conference-container">
      <h1>Rejoindre la conférence {roomId}</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Votre nom"
        value={userName}
        onChange={(e) => setUserName(e.target.value.trim())}
      />
      <button onClick={joinConference} disabled={!userName}>
        Rejoindre
      </button>

      {stream && (
        <button onClick={toggleView} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
          {isViewing ? "Masquer" : "Visualiser"}
        </button>
      )}

      {isViewing && (
        <div className="video-grid">
          <video autoPlay muted ref={localVideoRef} className="local-video" />
          {remoteStreams.map((remoteStream, index) => (
            <video key={index} autoPlay className="remote-video" srcObject={remoteStream} />
          ))}
          <video autoPlay ref={screenVideoRef} className="screen-share" />
        </div>
      )}
    </div>
  );
};

export default JoinConference;
