module.exports = (socket, io, salas, conexiones,Preguntas,obtenerIndex,darPoderes,rellenarPreguntas,comprobarCero) => {
    
let Auxpreguntas={
        "id": false,
        "operacion": "",
        "respuesta_correcta": "",
        "respuestaIncorrecta_1": "",
        "respuestaIncorrecta_2": "",
        "respuestaIncorrecta_3": "",
        "nivel": "",
        "duracion": 50
}


    socket.on('empezar_tenis',(sala)=>{
        socket.user.index=1;
        if(conexiones[salas[sala][0].socketId]){
            conexiones[salas[sala][0].socketId].emit('pregunta',Preguntas[sala][0])
        }
        if(conexiones[salas[sala][1].socketId]){
            conexiones[salas[sala][1].socketId].emit('pregunta',Auxpreguntas)
        }
    

       
    });

    function emitirRankingSinOrder(sala){
        io.to(sala).emit('ranking', salas[sala]);
    }

    socket.on('acabar_tenis',(sala)=>{
        salas[sala].sort((a, b) => b.puntacion - a.puntacion);
        salas[sala].forEach((user,index) => {
            if(conexiones[user.socketId]){
               conexiones[user.socketId].emit('acabar_tenis',index+1, user.puntacion);

           }
       }) 
    });


    socket.on('cambio_pregunta_tenis',(username,sala,tiro,vida,modo)=>{
        const index=obtenerIndex(username,sala)  
         
        let indexRival=0;
        if(index==0){
            indexRival=1;
        }

        let aux=salas[sala][index].index;
    
        salas[sala][index].index+=2;
      
       

        aux=salas[sala][index].index;
        console.log(tiro); 
        socket.emit('pregunta',Auxpreguntas)

        switch (tiro) {
            case 1:
                Preguntas[sala][aux].duracion=3;
                break;

            case 2:
                Preguntas[sala][aux].duracion=5;
                break;
            case 3:
                Preguntas[sala][aux].duracion=7;
                break;
            default:
                Preguntas[sala][aux].duracion=10;
                break;
        }



        if(conexiones[salas[sala][indexRival].socketId]){
            conexiones[salas[sala][indexRival].socketId].emit('pregunta',Preguntas[sala][aux])
        }

        if (aux>15){
            rellenarPreguntas(sala);
            salas[sala][index].index=0;
             
        }
     
        if(vida){
            salas[sala][indexRival].puntacion++;
        }else{
            salas[sala][index].darPoder-=5;  
        }
        console.log("poder:",salas[sala][index].darPoder);
        
        if(salas[sala][index].darPoder<=0){
            console.log("darpoder:",salas[sala][index].darPoder);
           darPoderes(salas[sala],index,modo)
           salas[sala][index].darPoder=15;
        }
        
        
    
        emitirRankingSinOrder(sala);
    })




    socket.on('poder_tenis',(poder,sala,username,modo)=>{
        let index=obtenerIndex(username,sala)
        let indexRival=0;
        switch (poder.direccion) {
            case 0:
                salas[sala][index].puntacion+=poder.num;
                break;
            case 1:
                if(index==0){
                    indexRival=1;
                }
                    if(salas[sala][indexRival]){
                        salas[sala][indexRival].puntacion-=poder.num;
                        comprobarCero(indexRival,sala)
                         
                        if(conexiones[salas[sala][indexRival].socketId]){
                            conexiones[salas[sala][indexRival].socketId].emit('tedio',username,poder) 
                        }
                    }
                
               
                break;
        }
        salas[sala][index].poder=null;
        setInterval(()=>{
            emitirRankingSinOrder(sala);     
        },1000)

    })
};