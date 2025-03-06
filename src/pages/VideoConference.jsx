import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Assure-toi que ton serveur Socket.io fonctionne sur ce port.

const VideoConference = () => {
  const [inConference, setInConference] = useState(false);
  const [room, setRoom] = useState('');
  const [userStream, setUserStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    // Demander l'accès au média (vidéo et audio)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setUserStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Error accessing media devices", err);
      });

    socket.on('receive-offer', handleOffer);
    socket.on('receive-answer', handleAnswer);
    socket.on('receive-ice-candidate', handleNewICECandidate);
    
    return () => {
      socket.off('receive-offer');
      socket.off('receive-answer');
      socket.off('receive-ice-candidate');
    };
  }, []);

  // Fonction pour rejoindre la conférence
  const joinConference = () => {
    if (!room) {
      alert('Please enter a room name');
      return;
    }
    setInConference(true);
    createPeerConnection();
    socket.emit('join-room', room);
  };

  // Fonction pour quitter la conférence
  const leaveConference = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    setInConference(false);
    socket.emit('leave-room', room);
  };

  // Créer une connexion peer-to-peer
  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection();

    // Ajouter le flux utilisateur local
    userStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, userStream);
    });

    // Créer un flux distant lorsque nous recevons un flux de l'autre participant
    peerConnection.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Configurer les ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('send-ice-candidate', room, event.candidate);
      }
    };

    peerConnectionRef.current = peerConnection;

    // Créer une offre de connexion si c'est le premier utilisateur
    if (userStream) {
      peerConnection.createOffer()
        .then(offer => {
          return peerConnection.setLocalDescription(offer);
        })
        .then(() => {
          socket.emit('send-offer', room, peerConnection.localDescription);
        })
        .catch(err => {
          console.error("Error creating offer", err);
        });
    }
  };

  // Répondre à une offre
  const handleOffer = (offer) => {
    const peerConnection = peerConnectionRef.current;
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => {
        return peerConnection.createAnswer();
      })
      .then(answer => {
        return peerConnection.setLocalDescription(answer);
      })
      .then(() => {
        socket.emit('send-answer', room, peerConnection.localDescription);
      })
      .catch(err => {
        console.error("Error handling offer", err);
      });
  };

  // Répondre à une réponse
  const handleAnswer = (answer) => {
    const peerConnection = peerConnectionRef.current;
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  // Gérer les nouveaux ICE candidates
  const handleNewICECandidate = (candidate) => {
    const peerConnection = peerConnectionRef.current;
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
      .catch(err => {
        console.error("Error adding ICE candidate", err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1E4D6B] text-white">
      <h1 className="text-3xl font-bold mb-6">Vidéoconférence</h1>

      {/* Interface pour rejoindre la conférence */}
      {!inConference ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="mb-4 p-2 rounded-md"
          />
          <button
            onClick={joinConference}
            className="bg-[#23658A] py-2 px-4 rounded-md text-white"
          >
            Join Conference
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={leaveConference}
            className="bg-[#1E4D6B] py-2 px-4 rounded-md text-white mb-4"
          >
            Leave Conference
          </button>

          {/* Vidéo locale */}
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full max-w-md rounded-lg mb-4"
          />

          {/* Vidéo distante */}
          {remoteStream && (
            <video
              ref={remoteVideoRef}
              autoPlay
              className="w-full max-w-md rounded-lg"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default VideoConference;
