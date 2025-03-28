module.exports = (socket, io, salas, conexiones,Preguntas,obtenerIndex,darPoderes) => {
    
let Auxpreguntas={
        "id": false,
        "operacion": "",
        "respuesta_correcta": "",
        "respuestaIncorrecta_1": "",
        "respuestaIncorrecta_2": "",
        "respuestaIncorrecta_3": "",
        "nivel": "",
        "duracion": 24
}


    socket.on('empezar_tenis',(sala)=>{
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
        io.to(sala).emit('acabar_tenis', sala);
    });


    socket.on('cambio_pregunta_tenis',(username,sala,tiro,vida,modo,encesta)=>{
        const index=obtenerIndex(username,sala)  
        console.log("hola"+index)
        let indexRival=0;
        if(index==0){
            indexRival=1;
        }

        let aux=salas[sala][index].index;
    
        salas[sala][index].puntacion=tiro;

        salas[sala][index].index++;
        aux=salas[sala][index].index;
        
        socket.emit('pregunta',Auxpreguntas)

        if(conexiones[salas[sala][indexRival].socketId]){
            conexiones[salas[sala][indexRival].socketId].emit('pregunta',Preguntas[sala][aux])
        }

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
    }else{
        salas[sala][indexRival].puntacion++;
    }




        if(salas[sala][index].darPoder<=0){

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
                if(index=0){
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
        setInterval(()=>{
            emitirRankingSinOrder(sala);     
        },1000)

    })
};