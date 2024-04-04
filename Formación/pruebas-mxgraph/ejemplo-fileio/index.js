function main(container){
    //Comprobamos navegador
    if(!mxClient.isBrowserSupported()){
        mxUtils.error("Navegador no soportado",200,false);
    }else{
        let graph=new mxGraph(container);

        //El grafo no permitirá interacciones
        graph.setEnabled(false);
        graph.setPanning(true);
        graph.setTooltips(true);
        graph.panningHandler.useLeftButtonForPanning=true;

        //Las celdas bajo el puntero se resaltan
        new mxCellTracker(graph);

        let style=graph.getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_SHAPE]=mxConstants.SHAPE_ROUNDED;
        style[mxConstants.STYLE_PERIMETER]=mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_GRADIENTCOLOR]='white';
        style[mxConstants.STYLE_PERIMETER_SPACING]=4;
        style[mxConstants.STYLE_SHADOW]=true;

        style=graph.getStylesheet().getDefaultEdgeStyle();
        style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]='white';

        //Añadimos el estilo '2way'
        //De esta forma podemos utilizar aristas con una flecha en origen y otra en destino
        style=mxUtils.clone(style);
        //Cambiamos el estilo del comienzo de la flecha por otra flecha
        style[mxConstants.STYLE_STARTARROW]=mxConstants.ARROW_CLASSIC;
        //Añadimos el nuevo estilo al grafo
        graph.getStylesheet().putCellStyle('2way',style);

        graph.isHtmlLabel=function(cell){
            return true;
        };

        graph.gridSize=20;

        //Creamos un algoritmo de disposición para ser usado en el grafo
        let layout=new mxFastOrganicLayout(graph);

        //Movemos los objetos más lejos unos de otros de lo habitual
        layout.forceConstant=140;

        //Añadimos un botón para que ejecute el layout
        document.body.appendChild(mxUtils.button('Arrange',function(evt){
            let parent=graph.getDefaultParent();
            layout.execute(parent);
        }));

        //Cargamos las celdas del fichero
        graph.getModel().beginUpdate();
        try {
            //Cargamos el fichero en formato txt
            //parse(graph,'https://raw.githubusercontent.com/jgraph/mxgraph/master/javascript/examples/fileio.txt');

            //Cargamos el fichero en formato xml
            read(graph,'https://raw.githubusercontent.com/jgraph/mxgraph/master/javascript/examples/fileio.xml');

            let parent=graph.getDefaultParent();
            layout.execute(parent);
        } catch (error) {
            console.log("ERROR add elementos");
            console.log(error);
        }finally{
            graph.getModel().endUpdate();
        }

        graph.dblClick=function(evt,cell){
            let mxe=new mxEventObject(mxEvent.DOUBLE_CLICK,'event',evt,'cell',cell);
            this.fireEvent(mxe);

            if(this.isEnabled()&&!mxEvent.isConsumed(evt)&&!mxe.isConsumed()&&cell!=null){
                mxUtils.alert("Mostrar propiedades para la celda "+(cell.customId||cell.getId()));
            }
        };

        if(mxClient.IS_QUIRKS){
            document.body.style.overflow='hidden';
            new mxDivResizer(container);
        }
    }
}

function parse(graph,filename){
    let model=graph.getModel();

    let parent=graph.getDefaultParent();

    let req=mxUtils.load(filename);
    let text=req.getText();

    const lines=text.split('\n');
    const vertices=[];

    graph.getModel().beginUpdate();
    try {
        for(let i=0;i<lines.length;i++){
            let colon=lines[i].indexOf(':');

            if(lines[i].substring(0,1)!="#"||colon==-1){
                let comma=lines[i].indexOf(',');
                let value=lines[i].substring(colon+2,lines[i].length);

                if(comma==-1||comma>colon){
                    let key=lines[i].substring(0,colon);

                    if(key.length>0){
                        vertices[key]=graph.insertVertex(parent,null,value,0,0,80,70);
                    }
                }else if(comma<colon){
                    let source=vertices[lines[i].substring(0,comma)];
                    let target=vertices[lines[i].substring(comma+1,colon)];

                    if(source!=null&&target!=null){
                        let e=graph.insertEdge(parent,null,value,source,target);

                        if(value.indexOf('2-Way')>=0){
                            e.style='2way';
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.log("ERROR parse:");
        console.log(error);
    }finally{
        graph.getModel().endUpdate();
    }
}

function read(graph,filename){
    let req=mxUtils.load(filename);
    let root=req.getDocumentElement();
    let dec=new mxCodec(root.ownerDocument);

    dec.decode(root,graph.getModel());
}