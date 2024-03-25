function main(){
    let slide=document.getElementById("slide");
    let droppable=document.getElementById("objetivo");
    let limIzq=droppable.getBoundingClientRect().left;
    let limDer=droppable.getBoundingClientRect().right;

    slide.onmousedown=(event)=>{
        event.preventDefault();
        //posición del cursor con respecto a la bola
        //evitamos que la bola se centre con respecto del cursor
        let shiftX=event.clientX-slide.getBoundingClientRect().left;

        //centra la bola en las coordenadas (pageX, pageY)
        function moveAt(pageX){
            slide.style.left=pageX-shiftX+'px';
            let pos="Pos: "+(pageX-shiftX);
            document.getElementById("num").innerHTML=pos;
        }

        //obtenemos las coordenadas del evento y movemos la bola ahí
        moveAt(event.pageX,event.pageY);

        function onMouseMove(event){
            //evitamos que se active fuera de los límites
            if(!(event.pageX<limIzq||event.pageX>limDer)){
                moveAt(event.pageX);
            }
        }

        const onMouseUp=()=>{
            document.removeEventListener('mouseup',onMouseUp);
            document.removeEventListener('mousemove',onMouseMove);
        }

        document.addEventListener('mousemove',onMouseMove);
        document.addEventListener('mouseup',onMouseUp);
    }

    slide.ondragstart=()=>{
        return false;
    }
}