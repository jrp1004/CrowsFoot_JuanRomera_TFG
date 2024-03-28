function main(){
    //comprobamos navegador
    if(!mxClient.isBrowserSupported()){
        mxUtils.error("Navegador no soportado",200,false);
    }else{
        //Añadimos container para la toolbar
        const containerToolbar=document.getElementById("toolbar");
        let toolbar=new mxToolbar(containerToolbar);
        toolbar.enabled=false;

        //Añadimos container para el grafo
        let container=document.getElementById("graph-container");
        let model=new mxGraphModel();
        let graph=new mxGraph(container,model);
        graph.dropEnabled=true; //Podemos soltar celdas dentro del grafo


        //Función que se ejecutará cuando movamos el elemento draggable encima del grafo
        mxDragSource.prototype.getDropTarget=(graph,x,y)=>{
            let cell=graph.getCellAt(x,y);
            if(!graph.isValidDropTarget(cell)){
                cell=null;
            }
            return cell;
        };

        //Podemos establecer nuevas conexiones en el grafo
        graph.setConnectable(true);
        //No podemos establecer múltiples conexiones entre los mismos elementos del garfo
        graph.setMultigraph(false);

        //Parar de editar cuando se pulsa esc o intro
        let keyHandler=new mxKeyHandler(graph);
        let rubberband=new mxRubberband(graph);

        //Función para añadir elementos a la toolbar
        const addVertex=(icon,w,h,style)=>{
            let vertex=new mxCell(null,new mxGeometry(0,0,w,h),style);
            vertex.setVertex(true);
            
            addToolbarItem(graph,toolbar,vertex,icon);
        }

        //De momento solo añadimos el rectángulo normal
        addVertex('images/rectangle.gif',100,40,'');
        //Añade una línea horizontal
        toolbar.addLine();
    }
}



function addToolbarItem(graph,toolbar,prototype,image){
    //Función que se ejecuta cuando la imagen de la toolbar se suelta en el grafo.
    //El argumento celda apunta a la celda debajo del ratón, si hay una
    const func=(graph,evt,cell)=>{
        graph.stopEditing(false);

        let pt=graph.getPointForEvent(evt);
        let vertex=graph.getModel().cloneCell(prototype);
        vertex.geometry.x=pt.x;
        vertex.geometry.y=pt.y;

        graph.setSelectionCells(graph.importCells([vertex],0,0,cell));
    }

    let img=toolbar.addMode(null,image,func);
    mxUtils.makeDraggable(img,graph,func);
}