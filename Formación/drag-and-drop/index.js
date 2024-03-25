function main(){
    let ball=document.getElementById("ball");
    ball.onmousedown=(event)=>{
        //posición del cursor con respecto a la bola
        //evitamos que la bola se centre con respecto del cursor
        let shiftX=event.clientX-ball.getBoundingClientRect().left;
        let shiftY=event.clientY-ball.getBoundingClientRect().top;

        ball.style.position='absolute';
        ball.style.zIndex=1000;

        document.body.append(ball);

        //centra la bola en las coordenadas (pageX, pageY)
        function moveAt(pageX,pageY){
            ball.style.left=pageX-shiftX+'px';
            ball.style.top=pageY-shiftY+'px';
        }

        //obtenemos las coordenadas del evento y movemos la bola ahí
        moveAt(event.pageX,event.pageY);

        //sitio potencial donde soltar la bola
        let currentDroppable=null;

        function onMouseMove(event){
            moveAt(event.pageX,event.pageY);

            //escondemos la bola para que elementFromPoint no la devuelva,
            //si no siempre obtendremos la bola
            ball.hidden=true;
            let elemBelow=document.elementFromPoint(event.clientX,event.clientY);
            ball.hidden=false;

            //evitamos que se active fuera de la ventana
            if(!elemBelow) return;

            //obtenemos el elemento de la clase droppable mas cercano de los
            //elementos debajo
            let droppableBelow=elemBelow.closest('.droppable');

            if(currentDroppable!=droppableBelow){
                if(currentDroppable){
                    leaveDroppable(currentDroppable);
                }
                currentDroppable=droppableBelow;
                if(currentDroppable){
                    enterDroppable(currentDroppable);
                }
            }
        }

        //movemos la bola con mousemove
        document.addEventListener('mousemove',onMouseMove);

        //al soltar el click eliminamos el listener
        ball.onmouseup=(event)=>{
            //console.log("onmouseup");
            //console.log("x: "+event.pageX+" y: "+event.pageY);

            document.removeEventListener('mousemove',onMouseMove);
            ball.onmouseup=null;
        }
    }

    ball.ondragstart=()=>{
        return false;
    }

    const leaveDroppable=(elem)=>{
        elem.style.background='lightblue';
    }

    const enterDroppable=(elem)=>{
        elem.style.background='pink';
    }
}