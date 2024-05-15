function main(container,outline,toolbar,sidebar,status){
    //Comprobamos si el navegador está soportado
    if(!mxClient.isBrowserSupported()){
        mxUtils.error("Navegador no soportado",200,false);
    }else{
        //Definimos la opacidad, el color y los offsets de las sombras con las constantes
        mxConstants.SHADOW_OPACITY=0.5;
        mxConstants.SHADOWCOLOR="#C0C0C0";
        mxConstants.SHADOW_OFFSET_X=5;
        mxConstants.SHADOW_OFFSET_Y=6;

        //Dimensiones y posición del icono de tabla
        mxSwimlane.prototype.imageSize=20;
        mxSwimlane.prototype.imageDx=16;
        mxSwimlane.prototype.imageDy=4;

        //Custom markers
        mxMarker.addMarker('cero_o_mas',function(canvas,shape,type,pe,unitX,unitY,size,source,sw,filled){
            let a = size / 2;

            let pt = pe.clone();
            pt.x -= unitX * a*2;
            pt.y -= unitY * a*2;

            let pt_2=pe.clone();
            pt_2.x-=unitX*a/2;
            pt_2.y-=unitY*a/2;

            let centro=pe.clone();
            centro.x-=unitX*a*5;
            centro.y-=unitY*a*5;

            unitX = unitX * (size + sw);
			unitY = unitY * (size + sw);

            let widthFactor=2/3;

            return function()
            {
                canvas.begin();
                //CIRCULO
                canvas.ellipse(centro.x - a, centro.y - a, size, size);
                canvas.setFillColor("white");
                canvas.fill();
                canvas.begin();
                canvas.ellipse(centro.x - a, centro.y - a, size, size);
                canvas.fillAndStroke();
                
                canvas.begin();
                
                //DIAGONALES
                canvas.moveTo(pt.x-unitX,pt.y-unitY);
                canvas.lineTo(pt_2.x-unitX-unitY*widthFactor,pt_2.y-unitY+unitX*widthFactor);
                canvas.moveTo(pt.x-unitX,pt.y-unitY);
                canvas.lineTo(pt_2.x+unitY*widthFactor-unitX,pt_2.y-unitY-unitX*widthFactor);

                canvas.stroke();
                
            };
        });

        mxMarker.addMarker('uno_o_mas',function(canvas,shape,type,pe,unitX,unitY,size,source,sw,filled){
            let a = size / 2;

            let pt = pe.clone();
            pt.x -= unitX * a*2;
            pt.y -= unitY * a*2;

            let pt_2=pe.clone();
            pt_2.x-=unitX*a/2;
            pt_2.y-=unitY*a/2;

            unitX = unitX * (size + sw);
			unitY = unitY * (size + sw);

            let widthFactor=2/3;

            return function()
            {
                canvas.begin();
                //HORIZONTAL
                canvas.moveTo(pt.x-unitX-unitY*widthFactor,pt.y-unitY+unitX*widthFactor);
                canvas.lineTo(pt.x+unitY*widthFactor-unitX,pt.y-unitY-unitX*widthFactor);

                canvas.stroke();
                
                canvas.begin();
                
                //DIAGONALES
                canvas.moveTo(pt.x-unitX,pt.y-unitY);
                canvas.lineTo(pt_2.x-unitX-unitY*widthFactor,pt_2.y-unitY+unitX*widthFactor);
                canvas.moveTo(pt.x-unitX,pt.y-unitY);
                canvas.lineTo(pt_2.x+unitY*widthFactor-unitX,pt_2.y-unitY-unitX*widthFactor);

                canvas.stroke();
                
            };
        });

        mxMarker.addMarker('solo_uno',function(canvas,shape,type,pe,unitX,unitY,size,source,sw,filled){
            let a = size / 2;

            let pt = pe.clone();
            pt.x -= unitX * a*2;
            pt.y -= unitY * a*2;

            let pt_2=pe.clone();
            pt_2.x-=unitX*a;
            pt_2.y-=unitY*a;

            unitX = unitX * (size + sw);
			unitY = unitY * (size + sw);

            let widthFactor=2/3;

            return function()
            {
                canvas.begin();

                //HORIZONTAL 1
                canvas.moveTo(pt.x-unitX-unitY*widthFactor,pt.y-unitY+unitX*widthFactor);
                canvas.lineTo(pt.x+unitY*widthFactor-unitX,pt.y-unitY-unitX*widthFactor);

                canvas.stroke();
                canvas.begin();

                //HORIZONTAL 2
                canvas.moveTo(pt_2.x-unitX-unitY*widthFactor,pt_2.y-unitY+unitX*widthFactor);
                canvas.lineTo(pt_2.x+unitY*widthFactor-unitX,pt_2.y-unitY-unitX*widthFactor);
                            
                canvas.stroke();
            };
        });

        mxMarker.addMarker('cero_o_uno',function(canvas,shape,type,pe,unitX,unitY,size,source,sw,filled){
            let a = size / 2;

            let pt = pe.clone();
            pt.x -= unitX * a*6;
            pt.y -= unitY * a*6;

            let pt_linea=pe.clone();
            pt_linea.x-=unitX*a;
            pt_linea.y-=unitY*a;

            unitX = unitX * (size + sw);
			unitY = unitY * (size + sw);

            let widthFactor=2/3;

            return function()
            {
                canvas.begin();

                //CIRCULO
                canvas.ellipse(pt.x - a, pt.y - a, size, size);
                canvas.setFillColor("white");
                canvas.fill();
                canvas.begin();
                canvas.ellipse(pt.x - a, pt.y - a, size, size);
                canvas.fillAndStroke();

                canvas.begin();

                //HORIZONTAL
                canvas.moveTo(pt_linea.x-unitX-unitY*widthFactor,pt_linea.y-unitY+unitX*widthFactor);
                canvas.lineTo(pt_linea.x+unitY*widthFactor-unitX,pt_linea.y-unitY-unitX*widthFactor);
                            
                canvas.stroke();
            };
        });

        //Establece los límites del icono
        mxSwimlane.prototype.getImageBounds=function(x,y,w,h){
            return new mxRectangle(x+this.imageDx,y+this.imageDy,this.imageSize,this.imageSize);
        };

        //Establece el icono que utilizamos para representar una nueva conexión en el manejador de conexiones
        //Corresponde con la flecha que aparece encima del nombre de la tabla al pasar el ratón por encima
        //Deshabilita automáticamente el resaltado del vértice fuente
        mxConnectionHandler.prototype.connectImage=new mxImage('../images/connector.gif',16,16);

        //Precargamos las imágenes que utilizaremos en las columnas para evitar problemas con el auto-layout
        let keyImage=new Image();
        keyImage.src='../images/key.png';

        let plusImage=new Image();
        plusImage.src='../images/plus.png';

        let checkImage=new Image();
        checkImage.src='../images/check.png';

        //Creamos el grafo en el container dado
        //El editor se utiliza para crear determinadas funcionalidades para el grafo, como
        //selección rubberband, pero la mayor parte de la interfaz es personalizada en este ejemplo
        let editor=new mxEditor();
        let graph=editor.graph;
        let model=graph.model;

        //Especificamos si el grafo puede permitir nuevas conexiones
        graph.setConnectable(true);
        //Establecemos que las celdas no se pueden desconectar. No queremos separar las distintas celdas que
        //componen una tabla
        graph.setCellsDisconnectable(false);
        //No permitimos clonar celdas manteniendo pulsada la tecla control mientras sujetamos una tabla
        graph.setCellsCloneable(false);
        //No se permite anidar swimlanes mediante drag and drop
        //Con esto activado se deberían poder anidar tablas
        graph.swimlaneNesting=false;
        //El grafo debe permitir soltar celdas en otras celdas
        //Utilizamos este método para añadir columnas a las tablas
        graph.dropEnabled=true;

        //Establecemos que el grafo no permita aristas sueltas
        graph.setAllowDanglingEdges(false);

        //Forzamos el uso del conector por defecto en mxConnectionHandler
        graph.connectionHandler.factoryMethod=null;

        //Establecemos que solo las tablas puedan cambiar de tamaño, no las columnas
        graph.isCellResizable=function(cell){
            return this.isSwimlane(cell);
        };

        //Solo se pueden mover las tablas
        graph.isCellMovable=function(cell){
            return this.isSwimlane(cell);
        };

        //Establecemos el container del grafo y configuramos el editor
        editor.setGraphContainer(container);
        /* //NO FUNCIONA
        var config = mxUtils.load(
            '../editors/config/keyhandler-minimal.xml').
                getDocumentElement();
        editor.configure(config);
        */

        //Configuramos el layout automático para las columnas de la tabla
        //Establecemos que los hijos de las swimlanes deben ser dispuestos vertical u horizontalmente
        //De esta forma establecemos que las columnas se vayan colocando unas debajo de otras en la tabla, en
        //vez de colocarse donde soltemos la celda
        editor.layoutSwimlanes=true;
        //Función con la que establecemos como se dispondrán los hijos de cada swimlane
        editor.createSwimlaneLayout=function(){
            //Creamos un stack vertical, indicado por false
            let layout=new mxStackLayout(this.graph,false);
            //El tamaño se debe ajustar para llenar la celda padre
            layout.fill=true;
            //La celda padre debe cambiar de tamaño para ajustarse al stack
            layout.resizeParent=true;

            //Sobreescribimos la función para que siempre devuelva true
            layout.isVertexMovable=function(cell){
                return true;
            };

            return layout;
        };

        //Función que se llama cuando cambia la etiqueta de una celda
        //Cambiamos la función para ajustarnos al objeto que utilizamos
        graph.model.valueForCellChanged=function(cell,value){
            //Si el campo value.name es null, el cambio se ha producido al hacer doble click y cambiar el nombre de una celda
            //Por tanto, el valor de value es ese nombre, sin campo null. En este caso accedemos al objeto de la celda para modificar el campo
            //name al nuevo valor
            //En caso de que no sea null, el campo value es el objeto de la columna completo, obtenido al modificar el objeto en las propiedades
            //Para este caso podemos hacer la llamada normal de la función
            if(value.name!=null){
                return mxGraphModel.prototype.valueForCellChanged.apply(this,arguments);
            }else{
                let old=cell.value.name;
                cell.value.name=value;
                return old;
            }
        };

        //Las columnas se crean utilizando HTML
        graph.isHtmlLabel=function(cell){
            return !this.isSwimlane(cell)&&!this.model.isEdge(cell);
        };

        //No se pueden editar las aristas
        /*
        graph.isCellEditable=function(cell){
            return !this.model.isEdge(cell);
        };
        */

        //Devuelve el campo name como etiqueta de la celda
        graph.convertValueToString=function(cell){
            if(cell.value!=null&&cell.value.name!=null){
                return cell.value.name;
            }

            return mxGraph.prototype.convertValueToString.apply(this,arguments);
        };

        //Tooltip para las columnas y las aristas
        graph.getTooltip=function(state){
            if(this.isHtmlLabel(state.cell)){
                return 'Titulo: '+state.cell.value.titulo+'\n'
                    +'Descripcion: '+state.cell.value.desc+'\n'
                    +'Tipo de datos: '+state.cell.value.type;
            }else if(this.model.isEdge(state.cell)){
                let src=this.model.getTerminal(state.cell,true);
                let parent=this.model.getParent(src);

                return parent.value.name+','+src.value.name;
            }

            return mxGraph.prototype.getTooltip.apply(this,arguments);
        }

        //Creamos dinámicamente la etiqueta para las celdas columna
        //Según los datos del objeto columna vamos añadiendo iconos a la etiqueta
        graph.getLabel=function(cell){
            if(this.isHtmlLabel(cell)){
                let label='';

                if(cell.value.primaryKey){
                    label+='<img title="Primary key" src="../images/key.png" width="16" height="16" align="top">&nbsp;';
                }else if(cell.value.foreignKey){
                    label+='<img title="Foreign key" src="../images/foreign_key.png" width="16" height="16" align="top">&nbsp;';
                }else{
                    label+='<img src="spacer/key.png" width="16" height="1" >&nbsp;';
                }

                if(cell.value.autoIncrement){
                    label+='<img title="Auto Increment" src="../images/plus.png" width="16" height="16" align="top">&nbsp;';
                }else if(cell.value.unique){
                    label+='<img title="Unique" src="../images/check.png" width="16" height="16" align="top">&nbsp;';
                }else{
                    label+='<img src="spacer/key.png" width="16" height="1" >&nbsp;';
                }

                let style=graph.getStylesheet().getCellStyle(cell.style);
                if(style==null){
                    style=graph.getStylesheet().getDefaultVertexStyle();
                }

                let fontfamily;
                if(style[mxConstants.STYLE_FONTFAMILY]){
                    fontfamily=style[mxConstants.STYLE_FONTFAMILY];
                }else{
                    //La fuente por defecto es arial
                    fontfamily="arial";
                }

                let size=style[mxConstants.STYLE_FONTSIZE];

                let fontstyle_n=style[mxConstants.STYLE_FONTSTYLE];
                let fontstyle="";
                if(fontstyle_n&mxConstants.FONT_BOLD){
                    fontstyle+="bold ";
                }
                if(fontstyle_n&mxConstants.FONT_ITALIC){
                    fontstyle+="italic ";
                }

                const font=fontstyle+size+"pt "+fontfamily


                let nueva_etiqueta=cell.value.name+": "+cell.value.type;
                const nombre=cell.value.name;

                if(getTextWidth(nueva_etiqueta,font)>cell.geometry.width){
                    for(let i=nombre.length;i>0;i--){
                        let etiqueta_temp=nombre.slice(0,i)+"..."+": "+cell.value.type;
                        if(getTextWidth(etiqueta_temp,font)<cell.geometry.width){
                            nueva_etiqueta=etiqueta_temp;
                            break;
                        }
                    }
                }

                return label+mxUtils.htmlEntities(nueva_etiqueta,false);
            }else{
                if(this.isSwimlane(cell)){
                    let label=cell.value.name;

                    const style=graph.getStylesheet().getCellStyle(cell.style);

                    let fontfamily;
                    if(style[mxConstants.STYLE_FONTFAMILY]){
                        fontfamily=style[mxConstants.STYLE_FONTFAMILY];
                    }else{
                        //La fuente por defecto es arial
                        fontfamily="arial";
                    }

                    let size=style[mxConstants.STYLE_FONTSIZE];

                    let fontstyle_n=style[mxConstants.STYLE_FONTSTYLE];
                    let fontstyle="";
                    if(fontstyle_n&mxConstants.FONT_BOLD){
                        fontstyle+="bold ";
                    }
                    if(fontstyle_n&mxConstants.FONT_ITALIC){
                        fontstyle+="italic ";
                    }

                    const font=fontstyle+size+"pt "+fontfamily;

                    if(getTextWidth(label,font)>cell.geometry.width){
                        for(let i=label.length-1;i>0;i--){
                            let nueva_etiqueta=label.slice(0,i)+"...";
                            if(getTextWidth(nueva_etiqueta,"bold 12pt arial")<cell.geometry.width){
                                return nueva_etiqueta;
                            }
                        }
                    }
                }
            }

            return mxGraph.prototype.getLabel.apply(this,arguments);
        }

        //Elimina el vértice origen si se elimina la arista
        //Las aristas sueltas se eliminan al no estar permitadas en el setAllowDanglingEdges
        graph.addListener(mxEvent.REMOVE_CELLS,function(sender,evt){
            let cells=evt.getProperty('cells');

            for(let i=0;i<cells.length;i++){
                let cell=cells[i];

                if(this.model.isEdge(cell)){
                    let terminal=this.model.getTerminal(cell,true);
                    let parent=this.model.getParent(terminal);
                    this.model.remove(terminal);
                }
            }
        });

        //Deshabilitamos el drag and drop para elementos que no sean swimlanes (tablas)
        graph.isValidDropTarget=function(cell,cells,evt){
            return this.isSwimlane(cell);
        };

        //Instalamos un manejador para un menú popup
        graph.popupMenuHandler.factoryMethod=function(menu,cell,evt){
            createPopupMenu(editor,graph,menu,cell,evt);
        };

        //Configuramos los estilos para el grafo
        configureStylesheet(graph);

        //Añadimos los iconos para la barra lateral
        //Icono de tabla
        let tableObject=new Table('TABLENAME');
        let table=new mxCell(tableObject,new mxGeometry(0,0,200,28),'table');

        table.setVertex(true);
        addSidebarIcon(graph,sidebar,table,'../images/icons48/table.png');

        //Icono de columna
        let columnObject=new Column('COLUMNNAME');
        let column=new mxCell(columnObject,new mxGeometry(0,0,0,26));

        column.setVertex(true);
        column.setConnectable(false);
        addSidebarIcon(graph,sidebar,column,'../images/icons48/column.png');

        //Creamos la columna que actuará como clave primaria de la tabla
        let firstColumn=column.clone();

        firstColumn.value.name='TABLENAME_ID';
        firstColumn.value.type='INTEGER';
        firstColumn.value.primaryKey=true;
        firstColumn.value.autoIncrement=true;
        //Insertamos la celda columna en la tabla
        table.insert(firstColumn);

        //Editamos la función para añadir aristas para que esta añada una columna con la referencia
        //a la tabla objetivo en la tabla de la que nace la arista
        graph.addEdge=function(edge,parent,source,target,index){
            let primaryKey=null;
            let childCount=this.model.getChildCount(target);

            //Obtenemos la clave primaria de la tabla objetivo
            for(let i=0;i<childCount;i++){
                let child=this.model.getChildAt(target,i);
                if(child.value.primaryKey){
                    primaryKey=child;
                    break;
                }
            }

            if(primaryKey==null){
                mxUtils.alert('La tabla objetivo debe tener una clave primaria');
                return;
            }

            //Actualizamos el grafo con la nueva columna
            this.model.beginUpdate();
            try {
                let coll=this.model.cloneCell(column);
                coll.value.name=primaryKey.value.name;
                coll.value.type=primaryKey.value.type;
                coll.value.foreignKey=true;

                this.addCell(coll,source);
                //Modificamos los parámetros source y target
                source=coll;    //source corresponde a la nueva columna
                target=primaryKey; //target corresponde a la columna con la clave primaria de la tabla objetivo

                //Con los nuevos parámetros llamamos a la función añadir arista por defecto, uniendo la celda de la columna con la
                //referencia de la tabla objetivo con la celda con la clave primaria
                edge.setValue(new Relacion("Relacion"));

                return mxGraph.prototype.addEdge.apply(this,arguments);
            } catch (error) {
                console.log("ERROR añadir arista");
                console.log(error);
            }finally{
                this.model.endUpdate();
            }

            return null;
        }

        graph.getView().updateStyle=true;
        let previous=graph.model.getStyle;

        graph.model.getStyle=function(cell){
            if(cell!=null){
                let style=previous.apply(this,arguments);

                if(this.isEdge(cell)){
                    if(style!=null){
                        style[mxConstants.STYLE_STARTARROW]=cell.value.startArrow;
                        style[mxConstants.STYLE_ENDARROW]=cell.value.endArrow;
                    }else{
                        style="startArrow="+cell.value.startArrow+";endArrow="+cell.value.endArrow+";";
                    }
                }

                return style;
                
            }
            return null;
        };

        //Texto que se muestra abajo a la derecha
        let hints = document.createElement('div');
        hints.style.position = 'absolute';
        hints.style.overflow = 'hidden';
        hints.style.width = '230px';
        hints.style.bottom = '56px';
        hints.style.height = '86px';
        hints.style.right = '20px';
        
        hints.style.background = 'black';
        hints.style.color = 'white';
        hints.style.fontFamily = 'Arial';
        hints.style.fontSize = '10px';
        hints.style.padding = '4px';

        mxUtils.setOpacity(hints, 50);
        
        mxUtils.writeln(hints, '- Drag an image from the sidebar to the graph');
        mxUtils.writeln(hints, '- Doubleclick on a table or column to edit');
        mxUtils.writeln(hints, '- Shift- or Rightclick and drag for panning');
        mxUtils.writeln(hints, '- Move the mouse over a cell to see a tooltip');
        mxUtils.writeln(hints, '- Click and drag a table to move and connect');
        mxUtils.writeln(hints, '- Shift- or Rightclick to show a popup menu');
        document.body.appendChild(hints);

        //Elemento que añadiremos en las toolbar para generar un espacio entre botones
        let spacer=document.createElement('div');
        spacer.style.display='inline';
        spacer.style.padding='8px';

        //Añadimos el botón propiedades
        addToolbarButton(editor,toolbar,'properties','Properties','../editors/images/properties.gif');
        //Añadimos la función del editor 'properties' a la función especificada
        editor.addAction('properties',function(editor,cell){
            //Cuando se pulse el botón propiedades recibimos una celda que comprobaremos si es null
            if(cell==null){
                //Si es null, asignamos la primera celda del conjunto de celdas seleccionadas
                //Esto funcionará en caso de que haya varias columnas seleccionadas
                //Si no hay nada seleccionado, causará error
                cell=graph.getSelectionCell();
            }

            //Comprobamos si lo seleccionado es una columna para mostrar sus propiedades
            if(graph.isHtmlLabel(cell)||graph.model.isEdge(cell)){
                showProperties(graph,cell);
            }
        });
        
        //Añadimos el resto de botones
        //Para estos botones no hace falta añadir funciones puesto que ya están definidas en el editor
        addToolbarButton(editor,toolbar,'delete','Delete','../images/delete2.png');
        toolbar.appendChild(spacer.cloneNode(true));

        addToolbarButton(editor,toolbar,'undo','','../images/undo.png');
        addToolbarButton(editor,toolbar,'redo','','../images/redo.png');

        toolbar.appendChild(spacer.cloneNode(true));

        addToolbarButton(editor,toolbar,'show','Show','../images/camera.png');
        addToolbarButton(editor,toolbar,'print','Print','../images/printer.png');

        toolbar.appendChild(spacer.cloneNode(true));

        //Añadimos la función para mosatrar el código SQL
        editor.addAction('showSql',function(editor,cell){
            const sql=createSql(graph);

            if(sql.length>0){
                let textarea=document.createElement('textarea');
                textarea.style.width='400px';
                textarea.style.height='400px';

                textarea.value=sql;
                showModalWindow('SQL',textarea,410,440);
            }else{
                mxUtils.alert('Esquema vacío');
            }
        });
        addToolbarButton(editor,toolbar,'showSql','Mostrar SQL','../images/export1.png');

        //Añadimos la función que exporta el grafo a XML
        editor.addAction('export',function(editor,cell){
            let textarea=document.createElement('textarea');
            textarea.style.width = '400px';
            textarea.style.height = '400px';
            //Obtenemos el encoder para un documento XML vacío
            //Con createXmlDocument obtenemos el docuemnto XML vacío
            let enc = new mxCodec(mxUtils.createXmlDocument());
            //El encoder codificar el modelo dle grafo a XML
            let node = enc.encode(editor.graph.getModel());
            //Escribimos el código XML en el textarea
            textarea.value = mxUtils.getPrettyXml(node);
            showModalWindow('XML', textarea, 410, 440);
        });
        addToolbarButton(editor,toolbar,'export','Export XML','../images/export1.png');


        addToolbarButton(editor,status,'collapseAll','Collapse All','../images/navigate_minus.png');
        addToolbarButton(editor,status,'expandAll','Expand All','../images/navigate_plus.png');

        status.appendChild(spacer.cloneNode(true));

        addToolbarButton(editor,status,'zoomIn','','../images/zoom_in.png');
        addToolbarButton(editor,status,'zoomOut','','../images/zoom_out.png');
        addToolbarButton(editor,status,'actualSize','','../images/view_1_1.png');
        addToolbarButton(editor,status,'fit','','../images/fit_to_size.png');

        //Creamos la vista que se ve arriba a la derecha en el grafo
        let outln=new mxOutline(graph,outline);

        //Hace un fundido para la splashscreen en caso de que haya alguna
        let splash=document.getElementById('splash');
        if(splash!=null){
            try {
                mxEvent.release(splash);
                mxEffect.fadeOut(splash,100,true);
            } catch (error) {
                console.log("ERROR splash:");
                console.log(error);
                splash.parentNode.removeChild(splash);
            }
        }
    }
}

//Función para añadir un botón a una toolbar
function addToolbarButton(editor,toolbar,action,label,image,isTransparent){
    //Creamos le botón HTML
    let button=document.createElement('button');
    button.style.fontSize='10';
    //Añadimos la imagen que hemos especificado por parámetro al botón 
    if(image!=null){
        let img=document.createElement('img');
        img.setAttribute('src',image);
        img.style.width='16px';
        img.style.height='16px';
        img.style.verticalAlign='middle';
        img.style.marginRight='2px';
        button.appendChild(img);
    }

    if(isTransparent){
        button.style.background='transparent';
        button.style.color='#FFFFFF';
        button.style.border='none';
    }

    //Añadimos un listener mediante un evento de mxGraph
    //Cuando se haga click en el botón se ejecutará la acción en el editor indicada por parámetros
    mxEvent.addListener(button,'click',function(evt){
        editor.execute(action);
    });

    //Añadimos el botón a la toolbar
    mxUtils.write(button,label);
    toolbar.appendChild(button);
}

//Función para mostrar una ventana modal
function showModalWindow(title,content,width,height){
    //Modificamos el fondo para cuando se muestre la ventana se oscurezca
    let background=document.createElement('div');
    background.style.position='absolute';
    background.style.left='0px';
    background.style.top='0px';
    background.style.right='0px';
    background.style.bottom='0px';
    background.style.background='black';
    mxUtils.setOpacity(background,50);
    document.body.appendChild(background);

    if(mxClient.IS_QUIRKS){
        new mxDivResizer(background);
    }

    //Posición de la venta
    let x=Math.max(0,document.body.scrollWidth/2-width/2);
    let y=Math.max(10,(document.body.scrollHeight||document.documentElement.scrollHeight)/2-height*2/3);
    //Creamos la ventana
    let wnd=new mxWindow(title,content,x,y,width,height,false,true);
    wnd.setClosable(true);

    //Añadimos fundido para cuando se cierre la ventana quitar el fondo nuevo
    wnd.addListener(mxEvent.DESTROY,function(event){
        mxEffects.fadeOut(background,50,true,10,30,true);
    });
    wnd.setVisible(true);

    return wnd;
}

//Añadimos los iconos de la barra lateral
//Iconos para añadir tabla y columna
function addSidebarIcon(graph,sidebar,prototype,image){
    //Función que se ejecutará cuando se suelte uno de estos iconos en el grafo
    //El parámetro cell indica la celda que hay debajo del ratón
    const funct=function(graph,evt,cell){
        //El grafo para la edición
        graph.stopEditing(false);

        //Punto donde se ha soltado el icono
        let pt=graph.getPointForEvent(evt);

        let parent=graph.getDefaultParent();
        let model=graph.getModel();

        //Comprobamos si el icono soltado es una tabla, comprobando si el prototipo es una swimlane
        let isTable=graph.isSwimlane(prototype);
        let name=null;

        if(!isTable){
            //Si no es una tabla, la celda padre es la celda donde hemos soltado el ratón
            parent=cell;
            //Obtenemos el punto donde se encuentra la celda padre
            let pstate=graph.getView().getState(parent);

            if(parent==null||pstate==null){
                mxUtils.alert('El destino debe ser una tabla');
                return;
            }

            //Modificamos el punto donde se ha soltado la columna nueva para que la geometría de la tabla padre
            //no se vea afectada
            pt.x-=pstate.x;
            pt.y-=pstate.y;

            let columnCount=graph.model.getChildCount(parent)+1;
            name=mxUtils.prompt('Introduce el nombre para la nueva columna','COLUMN'+columnCount);
        }else{
            let tableCount=0;
            let childCount=graph.model.getChildCount(parent);

            for(let i=0;i<childCount;i++){
                if(!graph.model.isEdge(graph.model.getChildAt(parent,i))){
                    tableCount++;
                }
            }

            name=mxUtils.prompt('Introduce el nomrbe para la tabla nueva','TABLE'+(tableCount+1));
        }

        if(name!=null){
            //Creamos la celda nueva y editamos el modelo
            let v1=model.cloneCell(prototype);

            model.beginUpdate();
            try {
                //Añadimos nombre y coordenadas de la celda nueva
                v1.value.name=name;
                v1.geometry.x=pt.x;
                v1.geometry.y=pt.y;

                //Añadimos la celda nueva a su padre, el grafo si es una tabla, una tabla si es una columna
                graph.addCell(v1,parent);
                if(isTable){
                    v1.geometry.alternateBounds=new mxRectangle(0,0,v1.geometry.width,v1.geometry.height);
                    //Editamos el nombre de la columna que contiene la clave primaria para que coincida con el de la tabla
                    v1.children[0].value.name=name+'_ID';
                }
            } catch (error) {
                console.log("ERROR addSidebarIcon:");
                console.log(error);
            }finally{
                model.endUpdate();
            }
            graph.setSelectionCell(v1);
        }
    }

    //Añadimos imagen para el icono de la toolbar
    let img=document.createElement('img');
    img.setAttribute('src',image);
    img.style.width='48px';
    img.style.height='48px';
    img.title='Suelta esto en el diagrama para crear un vértice nuevo';
    sidebar.appendChild(img);

    //Imagen que se muestra mientras arrastramos el icono por el grafo
    let dragImage=img.cloneNode(true);
    let ds=mxUtils.makeDraggable(img,graph,funct,dragImage);

    //Las zonas donde se pueden soltar los iconos se resaltan
    ds.highlightDropTargets=true;
    ds.getDropTarget=function(graph,x,y){
        //Si el draggable es una tabla devolvemos null, se añade al grafo
        if(graph.isSwimlane(prototype)){
            return null;
        }else{
            let cell=graph.getCellAt(x,y);
            //Si el draggable es una columna, comprobamos donde se está soltando
            if(graph.isSwimlane(cell)){
                //Si se suelta en la celda tabla se añade a esta
                return cell;
            }else{
                //Si se suelta encima de otra columna se añade a la tabla padre de dicha columna
                let parent=graph.getModel().getParent(cell);
                if(graph.isSwimlane(parent)){
                    return parent;
                }
            }
        }
    };
}

function configureStylesheet(graph){
    let style=new Object();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    style[mxConstants.STYLE_FONTSIZE] = '11';
    style[mxConstants.STYLE_FONTSTYLE] = 0;
    style[mxConstants.STYLE_SPACING_LEFT] = 4; //Modificado para evitar error con getPreferredSizeForCell
    style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
    style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
    graph.getStylesheet().putDefaultVertexStyle(style);

    style = new Object();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
    style[mxConstants.STYLE_GRADIENTCOLOR] = '#41B9F5';
    style[mxConstants.STYLE_FILLCOLOR] = '#8CCDF5';
    style[mxConstants.STYLE_SWIMLANE_FILLCOLOR] = '#ffffff';
    style[mxConstants.STYLE_STROKECOLOR] = '#1B78C8';
    style[mxConstants.STYLE_FONTCOLOR] = '#000000';
    style[mxConstants.STYLE_STROKEWIDTH] = '2';
    style[mxConstants.STYLE_STARTSIZE] = '28';
    style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
    style[mxConstants.STYLE_FONTSIZE] = '12';
    style[mxConstants.STYLE_FONTSTYLE] = 1;
    style[mxConstants.STYLE_IMAGE] = '../images/icons48/table.png';
    // Looks better without opacity if shadow is enabled
    //style[mxConstants.STYLE_OPACITY] = '80';
    style[mxConstants.STYLE_SHADOW] = 1;
    style[mxConstants.STYLE_SPACING_LEFT]=48;
    graph.getStylesheet().putCellStyle('table', style);

    style = graph.stylesheet.getDefaultEdgeStyle();
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
    style[mxConstants.STYLE_STROKEWIDTH] = '2';
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
    style[mxConstants.STYLE_STARTSIZE]='8';
    style[mxConstants.STYLE_ENDSIZE]='8';
}

//Función para crear las entradas del menú popup
function createPopupMenu(editor,graph,menu,cell,evt){
    //Comprobamos si hemos hecho click en una tabla o en una columna
    if(cell!=null){
        //Si hemos hecho click en una columna añadimos la entrada propiedades
        if(graph.isHtmlLabel(cell)||graph.model.isEdge(cell)){
            menu.addItem('Propiedades','../editors/images/properties.gif',function(){
                editor.execute('properties',cell);
            });

            menu.addSeparator();
        }else{
            menu.addItem('Anadir columna','../images/plus.png',function(){
                //Nueva columna
                let columnCount=graph.model.getChildCount(cell)+1;
                let name=mxUtils.prompt('Introduce el nombre para la nueva columna','COLUMN'+columnCount);

                let columnObject=new Column(name);
                let column=new mxCell(columnObject,new mxGeometry(0,0,0,26));

                column.setVertex(true);
                column.setConnectable(false);
                //Añadimos la nueva columna a la tabla
                graph.addCell(column,cell);
            });

            menu.addSeparator();
        }

        menu.addItem('Borrar','../images/delete2.png',function(){
            editor.execute('delete',cell);
        });

        menu.addSeparator();
    }

    menu.addItem('Deshacer','../images/undo.png',function(){
        editor.execute('undo',cell);
    });

    menu.addItem('Rehacer','../images/redo.png',function(){
        editor.execute('redo',cell);
    });

    menu.addSeparator();

    menu.addItem('Mostrar SQL','../images/export1.png',function(){
        editor.execute('showSql',cell);
    })
}

//Función que crea un formulario para editar los parámetros de las columnas
function showProperties(graph,cell){
    let form=new mxForm('properties');

    //Añadimos los campos al formulario
    let nameField=form.addText('Nombre',cell.value.name);
    let name;

    if(graph.isHtmlLabel(cell)){
        let typeField=form.addText('Tipo',cell.value.type);

        let primaryKeyField=form.addCheckbox('Clave primaria',cell.value.primaryKey);
        let foreignKeyField=form.addCheckbox('Clave foranea',cell.value.foreignKey);
        let autoIncrementField=form.addCheckbox('Auto Incrementar',cell.value.autoIncrement);
        let notNullField=form.addCheckbox('No Nulo',cell.value.notNull);
        let uniqueField=form.addCheckbox('Unico',cell.value.unique);

        let defaultField=form.addText('Por defecto',cell.value.defaultValue||'');
        let useDefaultValue=form.addCheckbox('Usar por defecto',(cell.value.defaultValue!=null));

        let titulo=form.addText('Titulo',cell.value.titulo);
        let descripcion=form.addTextarea('Descripcion',cell.value.desc,5);

        let wnd=null;

        //Si pulsamos el botón ok del formulario actualizamos los datos de la columna
        const okFunction=function(){
            let clone=cell.value.clone();
    
            clone.name=nameField.value;
            clone.type=typeField.value;
    
            if(useDefaultValue.checked){
                clone.defaultValue=defaultField.value;
            }else{
                clone.defaultValue=null;
            }
    
            clone.primaryKey=primaryKeyField.checked;
            clone.foreignKey=foreignKeyField.checked;
            clone.autoIncrement=autoIncrementField.checked;
            clone.notNull=notNullField.checked;
            clone.unique=uniqueField.checked;

            clone.titulo=titulo.value;
            clone.desc=descripcion.value;
    
            graph.model.setValue(cell,clone);
    
            wnd.destroy();
        }

        
        //Función que se ejecuta cuando se pulsa el botón cancelar
        const cancelFunction=function(){
            wnd.destroy();
        }
        form.addButtons(okFunction,cancelFunction);

        let parent=graph.model.getParent(cell);
        name=parent.value.name+'.'+cell.value.name;
        //Mostramos el formualrio utilizando la función anterior
        wnd=showModalWindow(name,form.table,240,340);
    }else{
        let valor_actual_s=cell.value.startArrow;
        let valor_actual_e=cell.value.endArrow;

        let table_s=cell.getTerminal(true).getParent();//Tabla source
        let table_t=cell.getTerminal(false).getParent();//tabla target

        let combo_s=form.addCombo(table_s.value.name,false,4);
        //Marcamos como seleccionado el que coincida con valor_actual
        form.addOption(combo_s,"solo uno","solo_uno","solo_uno"==valor_actual_s);
        form.addOption(combo_s,"cero o uno","cero_o_uno","cero_o_uno"==valor_actual_s);
        form.addOption(combo_s,"cero o mas","cero_o_mas","cero_o_mas"==valor_actual_s);
        form.addOption(combo_s,"uno o mas","uno_o_mas","uno_o_mas"==valor_actual_s);

        let combo_e=form.addCombo(table_t.value.name,false,4);
        form.addOption(combo_e,"solo uno","solo_uno","solo_uno"==valor_actual_e);
        form.addOption(combo_e,"cero o uno","cero_o_uno","cero_o_uno"==valor_actual_e);
        form.addOption(combo_e,"cero o mas","cero_o_mas","cero_o_mas"==valor_actual_e);
        form.addOption(combo_e,"uno o mas","uno_o_mas","uno_o_mas"==valor_actual_e);

        let wnd=null;

        const okFunction=function(){
            let newValue_s=combo_s.value || '';
            let oldValue_s=valor_actual_s;
            let newValue_e=combo_e.value || '';
            let oldValue_e=valor_actual_e;

            if(newValue_s!=oldValue_s||newValue_e!=oldValue_e){
                graph.getModel().beginUpdate();
                try {
                    let clone=cell.value.clone();
                    clone.startArrow=newValue_s;
                    clone.endArrow=newValue_e;

                    graph.model.setValue(cell,clone);
                    actualizarClaves(graph,cell);
                } catch (error) {
                    console.log("ERROR update");
                    console.log(error);
                }finally{
                    graph.getModel().endUpdate();
                }
            }

            let clone=cell.value.clone();

            clone.name=nameField.value;
            graph.model.setValue(cell,clone);

            wnd.destroy();
        }
        const cancelFunction=function(){
            wnd.destroy();
        }
        form.addButtons(okFunction,cancelFunction);

        let name=cell.value.name;
        wnd=showModalWindow(name,form.table,240,240);
    }
}

function actualizarClaves(graph,cell){
    let columnObject=new Column("COLUMNA");
    let column=new mxCell(columnObject,new mxGeometry(0,0,0,26));

    column.setVertex(true);
    column.setConnectable(false);

    let relacion=cell.value;

    let table_s=cell.getTerminal(true).getParent();
    let table_t=cell.getTerminal(false).getParent();
    let primaryKey_s=obtenerClavePrimaria(graph,table_s);
    let primaryKey_t=obtenerClavePrimaria(graph,table_t);

    //Eliminamos la clave foranea en la otra tabla y el enlace
    let clone=cell.clone();
    graph.removeCells([cell]); //Se activa el listener definido anteriormente REMOVE_CELLS

    if(relacion.startArrow==='solo_uno'||relacion.startArrow==='cero_o_uno'){
        if(relacion.endArrow==='uno_o_mas'||relacion.endArrow==='cero_o_mas'){
            console.log("Clave en target");
            column.value.name=primaryKey_s.value.name;
            column.value.type=primaryKey_s.value.type;
            column.value.foreignKey=true;
            graph.addCell(column,table_t);
            
            let e_1=clone.clone();
            let temp=relacion.startArrow;
            relacion.startArrow=relacion.endArrow;
            relacion.endArrow=temp;
            e_1.setValue(relacion);
            e_1.setTerminal(column,true);
            e_1.setTerminal(primaryKey_s,false);
            graph.addCell(e_1);
        }else{
            console.log("Indiferente");
            column.value.name=primaryKey_t.value.name;
            column.value.type=primaryKey_t.value.type;
            column.value.foreignKey=true;
            graph.addCell(column,table_s);
            
            let e_1=clone.clone();
            let temp=relacion.startArrow;
            relacion.startArrow=relacion.endArrow;
            relacion.endArrow=temp;
            e_1.setValue(relacion);
            e_1.setTerminal(column,true);
            e_1.setTerminal(primaryKey_t,false);
            graph.addCell(e_1);
        }
    }else{
        if(relacion.endArrow==='uno_o_mas'||relacion.endArrow==='cero_o_mas'){
            console.log("Tabla intermedia");

            //Calculamos donde colocar la nueva tabla
            let distancia=table_t.geometry.x-(table_s.geometry.x+200);

            let x=table_t.geometry.x-100-distancia/2;
            let y=table_s.geometry.y<table_t.geometry.y?table_t.geometry.y:table_s.geometry.y;

            //Creamos nueva tabla para la relación
            let tableObject=new Table(table_s.value.name+'_'+table_t.value.name);
            let table=new mxCell(tableObject,new mxGeometry(x,y,200,28),'table');
    
            table.setVertex(true);
            let firstColumn=column.clone();
            firstColumn.value.name=tableObject.name+'_ID';
            firstColumn.value.type='INTEGER';
            firstColumn.value.primaryKey=true;
            firstColumn.value.autoIncrement=true;
            //Insertamos la celda columna en la tabla
            table.insert(firstColumn);

            //Insertamos claves foráneas
            let k_1=column.clone();
            k_1.value.name=primaryKey_s.value.name;
            k_1.value.type=primaryKey_s.value.type;
            k_1.value.foreignKey=true;
            table.insert(k_1);
            let k_2=column.clone();
            k_2.value.name=primaryKey_t.value.name;
            k_2.value.type=primaryKey_t.value.type;
            k_2.value.foreignKey=true;
            table.insert(k_2);

            graph.addCell(table);

            //Creamos relaciones nuevas
            let relacion_s=new Relacion("Relacion_s");
            relacion_s.startArrow='uno_o_mas';
            relacion_s.endArrow='solo_uno';
            let e_1=clone.clone();
            e_1.setValue(relacion_s);
            e_1.setTerminal(primaryKey_s,false);
            e_1.setTerminal(k_1,true);
            graph.addCell(e_1);

            let relacion_t=new Relacion("Relacion_t");
            relacion_t.startArrow='uno_o_mas';
            relacion_t.endArrow='solo_uno';
            let e_2=clone.clone();
            e_2.setValue(relacion_t);
            e_2.setTerminal(primaryKey_t,false);
            e_2.setTerminal(k_2,true);
            graph.addCell(e_2);
        }else{
            console.log("Clave en source");
            column.value.name=primaryKey_t.value.name;
            column.value.type=primaryKey_t.value.type;
            column.value.foreignKey=true;
            graph.addCell(column,table_s);
            
            let e_1=clone.clone();
            e_1.setValue(relacion);
            e_1.setTerminal(column,true);
            e_1.setTerminal(primaryKey_t,false);
            graph.addCell(e_1);
        }
    }
}

//Devuelve la celda correspondiente a la clave primaria de la tabla indicada
function obtenerClavePrimaria(graph,tabla){
    let primaryKey=null;
    let childCount=graph.model.getChildCount(tabla);

    //Obtenemos la clave primaria de la tabla objetivo
    for(let i=0;i<childCount;i++){
        let child=graph.model.getChildAt(tabla,i);
        if(child.value.primaryKey){
            primaryKey=child;
            break;
        }
    }

    return primaryKey;
}

//Función que crea el código SQL según los elementos del grafo
function createSql(graph){
    const sql=[];
    let parent=graph.getDefaultParent();
    let childCount=graph.model.getChildCount(parent);

    for(let i=0;i<childCount;i++){
        let child=graph.model.getChildAt(parent,i);

        if(!graph.model.isEdge(child)){
            sql.push('CREATE TABLE IF NOT EXISTS '+child.value.name+' (');
            let columnCount=graph.model.getChildCount(child);

            if(columnCount>0){
                for(let j=0;j<columnCount;j++){
                    let column=graph.model.getChildAt(child,j).value;
                    sql.push('\n '+column.name+' '+column.type);
                    if(column.notNull){
                        sql.push(' NOT NULL');
                    }
                    if(column.primaryKey){
                        sql.push(' PRIMARY KEY');
                    }
                    if(column.autoIncrement){
                        sql.push(' AUTOINCREMENT');
                    }
                    if(column.unique){
                        sql.push(' UNIQUE');
                    }
                    if(column.defaultValue!=null){
                        sql.push(' DEFAULT '+column.defaultValue);
                    }

                    sql.push(',');
                }

                sql.splice(sql.length-1,1);
                sql.push('\n);');
            }
            sql.push('\n');
        }
    }
    return sql.join('');
}

//Función para obtener la anchura de una cadena de texto en píxeles
function getTextWidth(text,font){
    const canvas=getTextWidth.canvas || (getTextWidth.canvas=document.createElement("canvas"));
    const context=canvas.getContext("2d");
    context.font=font;
    const metrics=context.measureText(text);
    return metrics.width;
}


//Definición del objeto de usuario columna
function Column(name){
    this.name=name;
}

Column.prototype.type='TEXT';
Column.prototype.defaultValue=null;
Column.prototype.primaryKey=false;
Column.prototype.foreignKey=false;
Column.prototype.autoIncrement=false;
Column.prototype.notNull=false;
Column.prototype.unique=false;
Column.prototype.clone=function(){
    return mxUtils.clone(this);
}
Column.prototype.desc='DESCRIPCION';
Column.prototype.titulo='TITULO';


//Definición del objeto de usuario tabla
function Table(name){
    this.name=name;
}
Table.prototype.clone=function(){
    return mxUtils.clone(this);
}

//Objeto asociado a las relaciones
function Relacion(name){
    this.name=name;
}
Relacion.prototype.startArrow="solo_uno";
Relacion.prototype.endArrow="solo_uno";
Relacion.prototype.clone=function(){
    return mxUtils.clone(this);
}