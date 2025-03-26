import { io } from 'socket.io-client'; 

let socketInstance;

const makeSocket = (token) => {
  // Si no existe la instancia, la creamos
  if (!socketInstance) {
    console.log("Token enviado al servidor:", token);
  //  socketInstance = io("http://a23diemujper.juego.daw.inspedralbes.cat:20070", {
  //   socketInstance = io("http://localhost:20071", {
    //   socketInstance = io("http://192.168.1.139:20071", {
    socketInstance = io("http://masket2.daw.inspedralbes.cat:20071", {
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        username: token,
      },
    });

    
  }

 
  return socketInstance;
};


const getSocket = () => {
  return socketInstance;
};

const RemSocket=()=>{

  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;  
  }
}

export default { getSocket, RemSocket,makeSocket } ;

