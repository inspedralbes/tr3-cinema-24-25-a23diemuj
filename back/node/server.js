const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');  
const { log } = require('console');
const tenis = require('./modos/tenis');
const app = express();


app.use(cors({
    origin: "*",  
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true  
}));

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",  
        methods: ["GET", "POST"],
        credentials: true  
    }
});

const salas={};
let deporte={};
let conexiones = {};
let Preguntas={};
let poderes_basket=[
    {
        poder:"banana",
        num: 5,
        direccion: -1,
    },
    {
        poder:"caparazon_verde",
        num: 10,
        direccion:-1
    },
    {   
        poder:"caparazon_rojo",
        num: 15,
        direccion:1
    },
    {   
        poder:"honguito",
        num:10,
        direccion:0

    },
    {   
        poder:"bomba",
        num: 20,
        direccion:2
    },
    {   
        poder:"estrella",
        num:30,
        direccion:2
    },
    {   
        poder:"caparazon_azul",
        num:30,
        direccion:2
    },
    {   
        poder:"rayo",
        num:50,
        direccion:2
    },
    {   
        poder:"bill_bala",
        num:40,
        direccion:2
    }
]


let poderes_futbol=[
    {
        poder:"banana",
        num: 1,
        direccion: -1,
    },
    {
        poder:"caparazon_verde",
        num: 2,
        direccion:-1
    },
    {   
        poder:"caparazon_rojo",
        num: 4,
        direccion:1
    },
    {   
        poder:"honguito",
        num:6,
        direccion:0

    },
    {   
        poder:"bomba",
        num: 7,
        direccion:2
    },
    {   
        poder:"estrella",
        num:10,
        direccion:2
    },
    {   
        poder:"caparazon_azul",
        num:10,
        direccion:2
    },
    {   
        poder:"rayo",
        num:20,
        direccion:2
    },
    {   
        poder:"bill_bala",
        num:15,
        direccion:2
    }

]

let poderes_beisbol=[
    {
        poder:"banana",
        num: 1,
        direccion: -1,
    },
    {
        poder:"caparazon_verde",
        num: 2,
        direccion:-1
    },
    {   
        poder:"caparazon_rojo",
        num: 4,
        direccion:1
    },
    {   
        poder:"honguito",
        num:6,
        direccion:0

    },
    {   
        poder:"bomba",
        num: 7,
        direccion:2
    },
    {   
        poder:"estrella",
        num:10,
        direccion:2
    },
    {   
        poder:"caparazon_azul",
        num:10,
        direccion:2
    },
    {   
        poder:"rayo",
        num:20,
        direccion:2
    },
    {   
        poder:"bill_bala",
        num:15,
        direccion:2
    }

]


let poderes_tenis=[
    {
        poder:"caparazon_rojo",
        num: 5,
        direccion: 1,
    },
    {
        poder:"caparazon_rojo",
        num: 10,
        direccion:1
    },
    {   
        poder:"caparazon_rojo",
        num: 15,
        direccion:1
    },
    {   
        poder:"honguito",
        num:10,
        direccion:0

    },
    {   
        poder:"bomba",
        num: 20,
        direccion:1
    },
    {   
        poder:"estrella",
        num:30,
        direccion:0
    },
    {   
        poder:"caparazon_azul",
        num:30,
        direccion:1
    },
    {   
        poder:"rayo",
        num:50,
        direccion:1
    },
    {   
        poder:"bill_bala",
        num:40,
        direccion:1
    }
]

 

async function rellenarPreguntas(claveSala){
   // const URL = `http://localhost:8000/api/preguntas/nivel/0`;
   //   const URL = `http://a23diemujper.juego.daw.inspedralbes.cat/laravel/public/api/preguntas/nivel/0`;
   const URL = `http://masket2.daw.inspedralbes.cat/laravel/public/api/preguntas/nivel/0`;
   const response = await fetch(URL);
   if (!Preguntas[claveSala]) {
    Preguntas[claveSala] = [];  // Inicializamos la sala como un array vacío
}
    Preguntas[claveSala]=await response.json();


 }

io.on('connection', async (socket) => {
 
    socket.user = { username: socket.handshake.auth.username };
    tenis(socket, io, salas, conexiones,Preguntas,obtenerIndex,darPoderes);
    

    function comprobarCero(datas,sala){

        if (salas[sala][datas].puntacion<0) {
            salas[sala][datas].puntacion=0;
        }

    }
    function comprobarNombre(username,sala) {
        
        const index = salas[sala].findIndex(user => user.username === username);
       
        return index
      }

    function obtenerIndex(username,sala) {
       
        const index = salas[sala].findIndex(user => user.username === username);
        return index
      }
    
   
    function emitirRanking(sala){
        salas[sala].sort((a, b) => b.puntacion - a.puntacion);
        io.to(sala).emit('ranking', salas[sala]); 
    }
    function asignarValores(){
        socket.user.puntacion=0;
        socket.user.index=0;
        socket.user.socketId=socket.id; 
        socket.user.darPoder=15;
        socket.user.poder=null;

    }

    function darPoderes(data,index,modo){

        if(data[index].poder==null){
          let numeroAleatorio = Math.floor(Math.random() * 3);  
       
          let aux= ((index+1)*100)/data.length;
           
          if(aux<34){
            
          }
           if(aux>=34 && aux<67){
            let probabilidad=Math.floor(Math.random() * 3);
            if(probabilidad>0){
                numeroAleatorio+=3;

            }
            
            
           }
           if(aux>=67){
            let probabilidad=Math.floor(Math.random() * 5);
            if(probabilidad==1){
                numeroAleatorio+=3;
            }
            if(probabilidad>1){
                numeroAleatorio+=6;
            }

           
         
           }
           console.log(modo)
          switch (modo) {
            case 1:
                data[index].poder=poderes_beisbol[numeroAleatorio];
                console.log("beibol")
                break;
            case 2:
                data[index].poder=poderes_basket[numeroAleatorio];
                console.log("basket")
                break;
            case 3:
                data[index].poder=poderes_futbol[numeroAleatorio];
                console.log("futbol")
                break;
            case 4:
                data[index].poder=poderes_tenis[numeroAleatorio];
                console.log("tenis")
                break;
          }
           
      
       
       
        socket.emit('poderes', data[index].poder)
         



        }


    }
 


    socket.on('poder',(poder,sala,username)=>{
        let index=obtenerIndex(username,sala)
       
        
        switch (poder.direccion) {
            case 1:
                
                if(salas[sala][index-1]){
                    salas[sala][index-1].puntacion-=poder.num;
                    comprobarCero(index-1,sala)
                    if( conexiones[salas[sala][index-1].socketId]){
                        conexiones[salas[sala][index-1].socketId].emit('tedio',username,poder) 
                    }
                    
                }

            
                break;
            case -1:
                if(salas[sala][index+1]){
                    salas[sala][index+1].puntacion-=poder.num;
                    comprobarCero(index+1,sala)
                    if(conexiones[salas[sala][index+1].socketId]){
                        conexiones[salas[sala][index+1].socketId].emit('tedio',username,poder) 
                    } 
                }
             
                break;
            case 0:
                salas[sala][index].puntacion+=poder.num;
                break;
            default:
                let aux=index;

                switch (poder.poder) {
                    case "rayo":
                        for (let i = 0; i < salas[sala].length; i++) {
                         
                            if(i==index){
                              
                            }else{
                          
                          
                            if(salas[sala][i]){
                                salas[sala][i].puntacion-=poder.num;
                                comprobarCero(i,sala)
                                 
                                if(conexiones[salas[sala][i].socketId]){
                                    conexiones[salas[sala][i].socketId].emit('tedio',username,poder) 
                                }
                            }
                        }



                        }
                    break;


                    case "bomba":
                    for (let i = 3; i > 0; i--) {
                         
                        if(salas[sala][index-i]){
                            salas[sala][index-i].puntacion-=poder.num;
                            comprobarCero(index-i,sala) 

                            if(conexiones[salas[sala][index-i].socketId]){
                                conexiones[salas[sala][index-i].socketId].emit('tedio',username,poder) 
                            }
                        }
                        
                    }

                    break;


                    case "estrella": 
                   
                     
                    salas[sala][index].puntacion+=poder.num;
                   
                    index=obtenerIndex(username,sala);
                    aux-=index;

                    for (let i = 1; i <= aux; i++) {
                        let probabilidad=Math.floor(Math.random() * 2); 
                        if(probabilidad==1){
                           
                            if(salas[sala][index+i]){
                                salas[sala][index+i].puntacion-=3;
                                comprobarCero(index+i,sala);
                                if(conexiones[salas[sala][index+i].socketId]){
                                    conexiones[salas[sala][index+i].socketId].emit('tedio',username,poder) 
                                } 
                            }
                            

                        }

                        
                    }
                        
                        break;

                    case "bill_bala" :
                    
                     
                    salas[sala][index].puntacion+=poder.num;
                    emitirRanking(sala);
                    index=obtenerIndex(username,sala);
                    aux-=index;

                    for (let i = 1; i <= aux; i++) {
                        
                     
                         
                           
                            if(salas[sala][index+i]){
                                salas[sala][index+i].puntacion-=5;
                                comprobarCero(index+i,sala);
                                
                                conexiones[salas[sala][index+i].socketId].emit('tedio',username,poder) 
                                if(conexiones[salas[sala][index+i].socketId]){
                                    conexiones[salas[sala][index+i].socketId].emit('tedio',username,poder) 
                                }
                            }
                        

                        
                    }
                    
                    break;
                    case "caparazon_azul":

                        if(salas[sala][0]){
                            salas[sala][0].puntacion-=poder.num;
                            comprobarCero(0,sala)
                            if(conexiones[salas[sala][0].socketId]){
                                conexiones[salas[sala][0].socketId].emit('tedio',username,poder) 
                            }


                            
                            let probabilidad=Math.floor(Math.random() * 2);
                            if(probabilidad==1){
                                if(salas[sala][1]){
                                    salas[sala][1].puntacion-=poder.num;
                                    comprobarCero(1,sala)

                                    if(conexiones[salas[sala][1].socketId]){
                                        conexiones[salas[sala][1].socketId].emit('tedio',username,poder) 
                                    }


                                    
                                }

                            }
                        }

                    break;
                
                    default:
                        break;
                }


               




                break;
        }


            salas[sala][index].poder=null;
            setInterval(()=>{
                emitirRanking(sala);     
            },1000)
              
        

    })


    socket.on('empezar',(sala)=>{
        delete deporte[sala];
        salas[sala].shift();

        socket.broadcast.to(sala).emit('pregunta', Preguntas[sala][0]);
           
        emitirRanking(sala)
    });

    socket.on('acabar',(sala)=>{
        

        salas[sala].forEach((user,index) => {
             if(conexiones[user.socketId]){
                conexiones[user.socketId].emit('acabar',index+1, user.puntacion);

            }
        }) 
        socket.emit('acabar',0, 0);
    })

    socket.on('puntaje_beisbol',(username,sala,tiro)=>{
        const index= obtenerIndex(username,sala);
        salas[sala][index].puntacion=tiro;
        emitirRanking(sala);

    });
 

    socket.on('cambio_pregunta',(username,sala,tiro,vida,modo,encesta)=>{
        const index= obtenerIndex(username,sala)  
       
        let aux=salas[sala][index].index;
    
        salas[sala][index].puntacion=tiro;

        salas[sala][index].index++;
        aux=salas[sala][index].index;
        
        socket.emit('pregunta',Preguntas[sala][aux])
        if (aux>18){
            rellenarPreguntas(sala);
            salas[sala][index].index=0;
        }
     
        if(vida){
            salas[sala][index].puntacion-=3;
            if(salas[sala][index].puntacion<0){
                salas[sala][index].puntacion=0;
            }
        }

        if(encesta){
        salas[sala][index].darPoder-=5;     
    }
        if(salas[sala][index].darPoder<=0){

           darPoderes(salas[sala],index,modo)
           salas[sala][index].darPoder=15;
        }
        
        
    
        emitirRanking(sala);
    })

 function eliminarModo(claveSala){
    setTimeout(()=>{
        delete deporte[claveSala];
        console.log(deporte);
    },600000);
     
 }
 
    socket.on('create-room', (param) => {
        const claveSala = uuidv4().slice(0, 5); 
        if (!salas[claveSala]) {
            salas[claveSala] = [];  // Inicializamos la sala como un array vacío
        }
        
       deporte[claveSala]=param;
       eliminarModo(claveSala);
       asignarValores()
       socket.user.username="jugador1"
       salas[claveSala].push(socket.user);
        conexiones[socket.id]=socket
        
        socket.join(claveSala);
        rellenarPreguntas(claveSala);
        socket.emit('room-created', claveSala);
        console.log(`Sala creada: ${claveSala} por el usuario: ${socket.user.username} (ID=${socket.user.id})`);
       
        io.to(claveSala).emit('room-users', {
            room: claveSala,
            users: [...io.sockets.adapter.rooms.get(claveSala)].map(id => ({
                id,
                username: io.sockets.sockets.get(id)?.user?.username || 'Anfitrión',
            })),
        });

    });

   
    socket.on('comprobarSala', (claveSala,modo) => {
        const room = io.sockets.adapter.rooms.get(claveSala);
        console.log(deporte[claveSala],modo)
        if(deporte[claveSala]!=modo){
            socket.emit('error', 'Modo de juego equivocado');
            return
        }


        if (room) {
            socket.emit('ComprobarSala');
        } else {
            socket.emit('error', 'Sala no encontrada');
        }
 
    });
    

    socket.on('prueba', (claveSala) => {
        const room = io.sockets.adapter.rooms.get(claveSala);
        
        if (room ==0) {
            socket.emit('ComprobarSala');
        } else {
            socket.emit('error', 'sexooo');
        }
 
    });

    socket.on('join-room', (claveSala,name,modo) => {

        if(deporte[claveSala]!=modo){
            socket.emit('error', 'Modo de juego equivocado');
            return
        }


        const room = io.sockets.adapter.rooms.get(claveSala);
        if (!salas[claveSala]) {
            salas[claveSala] = [];  // Inicializamos la sala como un array vacío
        }
        
        if(comprobarNombre(name,claveSala)>=0){
            socket.emit('error', 'El nombre que has puesto ya está en uso, prueba con otro');
            return
        }
        


        if (room) {
            socket.user.username=name;
            socket.join(claveSala);
            console.log(`Usuario ${socket.user.username} (ID=${socket.user.id}) se unió a la sala: ${claveSala}`);
            socket.emit('room-joined', claveSala);
            asignarValores();
            
            
            salas[claveSala].push(socket.user);
            conexiones[socket.id]=socket

          
            io.to(claveSala).emit('room-users', {
                room: claveSala,
                users: [...room].map(id => ({
                    id,
                    username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
                }))
            });
        } else {
            console.log(`Intento de unión a sala inexistente: ${claveSala}`);
            socket.emit('error', 'Sala no encontrada');
        }
    });

    socket.on('leave-room', (claveSala) => {
        socket.leave(claveSala);

        const room = io.sockets.adapter.rooms.get(claveSala);
        if (room) {
            io.to(claveSala).emit('room-users', {
                room: claveSala,
                users: [...room].map(id => ({
                    id,
                    username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
                }))
            });
        }
        
        if(salas[claveSala]){
        salas[claveSala].splice(salas[claveSala].indexOf(socket.user), 1);
  
        if(salas[claveSala].length===0){

            delete salas[claveSala];
            
        }
    }
        socket.emit('left-room');
    });

    socket.on('disconnecting', () => {
        for (const claveSala of socket.rooms) {
            if (claveSala !== socket.id) {
                const room = io.sockets.adapter.rooms.get(claveSala);
                if (room) {
                    const usersActualizados = [...room].filter((id) => id !== socket.id);
                    io.to(claveSala).emit('room-users', {
                        room: claveSala,
                        users: usersActualizados.map(id => ({
                            id,
                            username: io.sockets.sockets.get(id)?.user?.username || 'Invitado',
                        }))
                    });
                    
                
                
                }
            }
        }

       


    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
        delete conexiones[socket.id]
        console.log(deporte);
         
        
    });
});

const PORT = 20071;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
