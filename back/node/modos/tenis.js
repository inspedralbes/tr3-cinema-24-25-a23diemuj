module.exports = (socket, io, salas, conexiones) => {
    

    socket.on('empezar_tenis',(sala)=>{
        io.to(sala).emit('empezar_tenis', sala);
    });
};