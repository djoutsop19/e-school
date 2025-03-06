const io = require("socket.io")(5000, {
    cors: {
      origin: "*",
    },
  });
  
  console.log("Serveur WebSocket démarré sur http://localhost:5000");
  
  const rooms = {};
  
  io.on("connection", (socket) => {
    console.log("Nouvelle connexion d'un client : ", socket.id);
  
    socket.on("join-room", (room, userName) => {
      if (!rooms[room]) {
        rooms[room] = [];
      }
      rooms[room].push({ id: socket.id, name: userName });
  
      socket.to(room).emit("user-joined", userName);
      console.log(`${userName} a rejoint la salle ${room}`);
  
      socket.join(room);
      io.to(socket.id).emit("update-participants", rooms[room]);
    });
  
    socket.on("send-offer", (room, offer) => {
      console.log(`Offre reçue pour la salle ${room}: `, offer);
      socket.to(room).emit("receive-offer", offer);
    });
  
    socket.on("send-answer", (room, answer) => {
      console.log(`Réponse reçue pour la salle ${room}: `, answer);
      socket.to(room).emit("receive-answer", answer);
    });
  
    socket.on("send-ice-candidate", (room, candidate) => {
      console.log(`ICE candidate reçu pour la salle ${room}: `, candidate);
      socket.to(room).emit("receive-ice-candidate", candidate);
    });
  
    socket.on("send-screen", (room, screenStream) => {
      console.log(`Partage d'écran reçu pour la salle ${room}`);
      socket.to(room).emit("receive-screen", screenStream);
    });
  
    socket.on("disconnect", () => {
      for (const room in rooms) {
        rooms[room] = rooms[room].filter((user) => user.id !== socket.id);
        io.to(room).emit("update-participants", rooms[room]);
      }
      console.log(`Utilisateur ${socket.id} déconnecté`);
    });
  });
  