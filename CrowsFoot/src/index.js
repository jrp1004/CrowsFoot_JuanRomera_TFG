function main(container,outline,toolbar,sidebar,status,properties){
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

        /**
         * Sobreescribimos la función para comprobar donde se está produciendo un cambio en la etiqueta
         * de un celda, si es desde la propia celda, pulsando F2 o haciendo doble click, o desde el panel
         * de propiedades y almacenar la etiqueta correctamente
         * @param {mxCell} cell 
         * @param {*} value - Objeto de la celda o cadena con la etiqueta
         * @returns {string} - Etiqueta de la celda
         */
        graph.model.valueForCellChanged=function(cell,value){
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

        //Devuelve el campo name como etiqueta de la celda
        graph.convertValueToString=function(cell){
            if(cell.value?.name){
                return cell.value.name;
            }

            return mxGraph.prototype.convertValueToString.apply(this,arguments);
        };

        /**
         * Obtenemos la tooltip de una celda en función del tipo de celda
         * Si es una columna mostramos la información almacenada en el diccionario de datos
         * Si es una relación mostramos también el nombre de las tablas que une
         * @param {mxCellState} state 
         * @returns {string} - Tooltip para la celda
         */
        graph.getTooltip=function(state){
            if(this.isHtmlLabel(state.cell)){
                return 'Titulo: '+state.cell.value.titulo+'\n'
                    +'Descripcion: '+state.cell.value.desc+'\n'
                    +'Tipo de datos: '+state.cell.value.type;
            }else if(this.model.isEdge(state.cell)){
                let source=this.model.getTerminal(state.cell,true);
                let target=this.model.getTerminal(state.cell,false);

                return source.value.name+', '+state.cell.value.name+', '+target.value.name;
            }

            return mxGraph.prototype.getTooltip.apply(this,arguments);
        }

        /**
         * Sobreescribimos la función para obtener la etiqueta de una celda
         * Si es una columna se formatea añadiendo los iconos correspondientes
         * Si es una tabla o una columna se comprueba la anchura para devolverla o no recortada
         * @param {mxCell} cell - Celda del grafo
         * @returns {string} - Etiqueta de la celda
         */
        graph.getLabel=function(cell){
            if(this.isHtmlLabel(cell)){
                let label='';

                if(cell.value.primaryKey){
                    label+='<img title="Primary key" src="../images/key.png" width="16" height="16" align="top">&nbsp;';
                }else if(cell.value.foreignKey){
                    label+='<img title="Foreign key" src="../images/foreign_key.png" width="16" height="16" align="top">&nbsp;';
                }else{
                    label+='<img src="../images/spacer.gif" width="16" height="1" >&nbsp;';
                }

                if(cell.value.autoIncrement){
                    label+='<img title="Auto Increment" src="../images/plus.png" width="16" height="16" align="top">&nbsp;';
                }else if(cell.value.unique){
                    label+='<img title="Unique" src="../images/check.png" width="16" height="16" align="top">&nbsp;';
                }else{
                    label+='<img src="../images/spacer.gif" width="16" height="1" >&nbsp;';
                }

                let style=graph.getStylesheet().getCellStyle(cell.style)||graph.getStylesheet().getDefaultVertexStyle();

                let nueva_etiqueta=cell.value.name+": "+cell.value.type;
                let etiqueta_final=obtenerEtiquetaRecortada(nueva_etiqueta,cell.value.type,style,cell.geometry.width,true);
                return label+mxUtils.htmlEntities(etiqueta_final,false);
            }else if(this.isSwimlane(cell)){
                    let label=cell.value.name;

                    const style=graph.getStylesheet().getCellStyle(cell.style);
                    return obtenerEtiquetaRecortada(label,null,style,cell.geometry.width,false);
            }

            return mxGraph.prototype.getLabel.apply(this,arguments);
        }

        /**
         * Listener para eliminar las claves foráneas de las relaciones cuando se elimina una relación
         */
        graph.addListener(mxEvent.REMOVE_CELLS,function(sender,evt){
            let cells=evt.getProperty('cells');
            for(let cell of cells){
                if(this.model.isEdge(cell)){
                    const clavesForaneas=cell.value.clavesForaneas;
                    clavesForaneas.forEach(id=>this.model.remove(this.model.getCell(id)));
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
        addSidebarIcon(graph,document.getElementById('containerTabla'),table,'../images/icons128/table.png');

        //Icono de columna
        let columnObject=new Column('COLUMNNAME');
        let column=new mxCell(columnObject,new mxGeometry(0,0,0,26));

        column.setVertex(true);
        column.setConnectable(false);
        addSidebarIcon(graph,document.getElementById('containerColumna'),column,'../images/icons128/column.png');

        //Creamos la columna que actuará como clave primaria de la tabla
        let firstColumn=column.clone();

        firstColumn.value.name='TABLENAME_ID';
        firstColumn.value.type='INTEGER';
        firstColumn.value.primaryKey=true;
        firstColumn.value.autoIncrement=true;
        //Insertamos la celda columna en la tabla
        table.insert(firstColumn);

        /**
         * Sobreescribimos la función para añadir un enlace para que utilice
         * nuestras funcionalidades
         * @param {mxCell} edge - Enlace a añadir
         * @param {mxCell} parent - Celda padre del enlace
         * @param {mxCell} source - Celda origen del enlace
         * @param {mxCell} target - Celda destino del enlace
         * @param {number} index - Índice del enlace
         * @returns {*} - El enlace añadido o null en caso de error
         */
        graph.addEdge=function(edge,parent,source,target,index){
            const primaryKey=obtenerClavePrimaria(this,target);

            if(primaryKey==null){
                mxUtils.alert('La tabla objetivo debe tener una clave primaria');
                return;
            }

            //Actualizamos el grafo con la nueva columna
            this.model.beginUpdate();
            try {
                let relacion=new Relacion("Relacion");
                insertarNuevaRelacion(this,edge,relacion,source,target,primaryKey,false);

                return mxGraph.prototype.addEdge.apply(this,arguments);
            } catch (error) {
                console.log("ERROR añadir arista");
                console.log(error);
            }finally{
                this.model.endUpdate();
            }

            return null;
        }

        //Elemento que añadiremos en las toolbar para generar un espacio entre botones
        let spacer=document.createElement('div');
        spacer.style.display='inline';
        spacer.style.padding='8px';

        editor.addAction('clear',function(editor,cell){
            if(confirm('¿Eliminar todos los elementos del diagrama?')){
                editor.graph.getModel().clear();
            }
        });
        editor.addAction('borrar',function(editor,cell){
            cell=cell||graph.getSelectionCell();
            if(cell&&graph.isHtmlLabel(cell)){
                //Manejamos el posible borrado de una clave primaria
                if(cell.value.primaryKey){
                    cell.value.primaryKey=false;
                    handleCambioClavePrimaria(graph,graph.getModel().getParent(cell),true,false);
                    graph.setSelectionCell(cell);
                }
                handleCambioUnique(cell,graph.getModel().getParent(cell));
            }
            editor.execute('delete',cell);
        });
        
        editor.addAction('subirColumna',function(editor,cell){
            cell=cell||graph.getSelectionCell();
            if(graph.isHtmlLabel(cell)){
                let posicion=(cell.geometry.y-28)/26;
                let parent=cell.getParent();
                if(posicion>0){
                   moverPosicionColumna(graph,cell,parent,posicion,1);
                }
            }
        });
        editor.addAction('bajarColumna',function(editor,cell){
            cell=cell||graph.getSelectionCell();
            if(graph.isHtmlLabel(cell)){
                let posicion=(cell.geometry.y-28)/26;
                let parent=cell.getParent();
                if(posicion<parent.getChildCount()-1){
                    moverPosicionColumna(graph,cell,parent,posicion,-1);
                }
            }
        });

        editor.addAction('addColumna',function(editor,cell){ 
            cell=cell||graph.getSelectionCell();
            if(graph.isSwimlane(cell)){
                let columnCount=graph.model.getChildCount(cell)+1;
                let name=mxUtils.prompt('Introduce el nombre para la nueva columna','COLUMN'+columnCount);
                if(name){
                    let columnObject=new Column(name);
                    let column=new mxCell(columnObject,new mxGeometry(0,0,0,26));
                    let altura=column.geometry.height;
    
                    column.setVertex(true);
                    column.setConnectable(false);
                    //Añadimos la nueva columna a la tabla
                    graph.addCell(column,cell);
                    if(cell.isCollapsed()){
                        column.geometry.height=altura;
                    }
                }
            }
        });

        editor.setGraphContainer(container);
        let config = mxUtils.load(
            '../editors/config/keyhandler.xml').
                getDocumentElement();
        editor.configure(config);

        //Añadimos el resto de botones
        addToolbarButton(editor,toolbar,'borrar','Borrar elemento','../images/delete2.png');
        addToolbarButton(editor,toolbar,'clear','Borrar todo','../images/delete2.png');
        toolbar.appendChild(spacer.cloneNode(true));

        addToolbarButton(editor,toolbar,'undo','','../images/undo.png');
        addToolbarButton(editor,toolbar,'redo','','../images/redo.png');

        toolbar.appendChild(spacer.cloneNode(true));

        addToolbarButton(editor,toolbar,'show','Imagen','../images/camera.png');

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
        addToolbarButton(editor,sidebar,'showSql','SQL','../images/sql.png');
        editor.addAction('showSqlAlch',function(editor,cell){
            const sql=createSqlAlchemy(graph);
            if(sql.length){
                let textarea=document.createElement('textarea');
                textarea.style.width='400px';
                textarea.style.height='400px';

                textarea.value=sql;
                showModalWindow('SQLAlchemy',textarea,410,440);
            }else{
                alert('Esquema vacío');
            }
        });
        addToolbarButton(editor,sidebar,'showSqlAlch','SQLAlchemy','../images/Python-logo_24.png');

        //Añadimos la función que exporta el grafo a XML
        editor.addAction('export',function(editor,cell){
            let div=document.createElement('div');
            let textarea=document.createElement('textarea');
            textarea.style.width = '400px';
            textarea.style.height = '400px';
            textarea.readOnly=true;
            //Obtenemos el encoder para un documento XML vacío
            //Con createXmlDocument obtenemos el docuemnto XML vacío
            let enc = new mxCodec(mxUtils.createXmlDocument());
            //El encoder codificar el modelo dle grafo a XML
            let node = enc.encode(editor.graph.getModel());
            //Escribimos el código XML en el textarea
            textarea.value = mxUtils.getPrettyXml(node);
            div.appendChild(textarea);
            //Botón de descarga
            let button=document.createElement('button');
            button.style.fontSize='10';
            button.textContent='Descargar';
            div.appendChild(button);
            mxEvent.addListener(button,'click',function(evt){
                let nombre=null;
                nombre=mxUtils.prompt('Nombre para el fichero:');
                if(nombre!=null){
                    descarga(mxUtils.getPrettyXml(node),nombre);
                }
            });

            showModalWindow('XML', div, 410, 480);
        });
        addToolbarButton(editor,toolbar,'export','Exportar XML','../images/export1.png');

        editor.addAction('import',function(editor,cell){
            let div=document.createElement('div');
            let textarea=document.createElement('textarea');
            textarea.style.width = '400px';
            textarea.style.height = '400px';
            textarea.readOnly=true;
            div.appendChild(textarea);
            
            let input=document.createElement('input');
            input.type='file';
            input.accept='text/xml';
            div.appendChild(input);

            //Comprobamos los cambios en el input
            mxEvent.addListener(input,'change',function(evt){
                let nombre=input.value;
                //Comprobamos que se trata de un fichero xml
                if(nombre.substring(nombre.lastIndexOf('.'))!='.xml'){
                    input.value='';
                    window.alert('Selecciona un fichero .xml');
                    button.disabled=true;
                }else{
                    button.disabled=false;
                    let file=evt.srcElement.files[0];

                    //Mostramos el texto del fichero en el textarea
                    let reader=new FileReader();
                    reader.onload=function(e){
                        let content=e.target.result;
                        textarea.value=content;
                    }
                    reader.readAsText(file);
                }
            });

            let wnd=null;
            //Botón para confirmar la importación del grafo
            let button=document.createElement('button');
            button.style.fontSize='10';
            button.textContent='Importar';
            button.disabled=true;
            div.appendChild(button);
            mxEvent.addListener(button,'click',function(evt){
                if(confirm('¿Importar el diagrama?')){
                    let doc=mxUtils.parseXml(textarea.value);
                    let dec=new mxCodec(doc);
                    try{
                        dec.decode(doc.documentElement,graph.getModel());
                    }catch(error){
                        console.log(error);
                        alert('El fichero XML contiene errores');
                        editor.graph.getModel().clear();
                    }

                    wnd.destroy();
                }
            });

            wnd=showModalWindow('IMPORTAR',div,410,480);
        });
        addToolbarButton(editor,toolbar,'import','Importar XML',null);

        editor.addAction('diccionario',function(editor,cell){
            let dicc=obtenerDiccDatos(graph);
            showModalWindow('Diccionario de datos',dicc,window.innerWidth*0.7,window.innerHeight*0.7);
        });
        addToolbarButton(editor,status,'diccionario','Diccionario','../images/dict-icon.jpg');

        status.appendChild(spacer.cloneNode(true));

        addToolbarButton(editor,status,'collapseAll','Colapsar todo','../images/navigate_minus.png');
        addToolbarButton(editor,status,'expandAll','Expandir todo','../images/navigate_plus.png');

        status.appendChild(spacer.cloneNode(true));

        addToolbarButton(editor,status,'zoomIn','','../images/zoom_in.png');
        addToolbarButton(editor,status,'zoomOut','','../images/zoom_out.png');
        addToolbarButton(editor,status,'actualSize','','../images/view_1_1.png');
        addToolbarButton(editor,status,'fit','','../images/fit_to_size.png');

        //Creamos la vista que se ve arriba a la derecha en el grafo
        new mxOutline(graph,outline);

        let datosDiv=document.getElementById("datos");
        /**
         * Añadimos un listener para los cambios de selección del grafo para actualizar el panel de propiedades
         */
        graph.getSelectionModel().addListener(mxEvent.CHANGE,function(sender,event){
            datosDiv.innerHTML='<br>';
            //Los últimos elementos seleccionados se encuentran en la propiedad removed del evento
            let cells=event.getProperty('removed');
            //Eliminamos todos los listeners añadidos al panel de estilo
            mxEvent.removeAllListeners(document.getElementById('colorPicker'));
            mxEvent.removeAllListeners(document.getElementById('gradientPicker'));
            mxEvent.removeAllListeners(document.getElementById('gradientCheck'));
            mxEvent.removeAllListeners(document.getElementById('selectFont'));
            mxEvent.removeAllListeners(document.getElementById('gradientDirection'));
            mxEvent.removeAllListeners(document.getElementById('tamFont'));
            mxEvent.removeAllListeners(document.getElementById('colorFontPicker'));
            mxEvent.removeAllListeners(document.getElementById('negrita'));
            mxEvent.removeAllListeners(document.getElementById('cursiva'));
            mxEvent.removeAllListeners(document.getElementById('shadowCheck'));
            mxEvent.removeAllListeners(document.getElementById('selectEstiloLinea'));
            //Comprobamos la longitud para evitar error con la selección múltiple
            //Si se ha seleccionado una tabla, columna o enlace mostramos el panel de propiedades
            //si no lo escondemos
            if(cells!=null&&cells.length>0){
                properties.style.display="inline";
                showProperties(graph,cells[0],datosDiv);
                configurarTabEstilos(graph,cells[0]);
            }else{
                properties.style.display="none";
                document.getElementById("propertiesEstilos").click();
            }
        });

        //Tab abierta por defecto
        document.getElementById("propertiesEstilos").click();
    }
}

/**
 * Añade un botón a la toolbar indicada realizando la acción correspondiente
 * @param {mxEditor} editor - Instancia del editor
 * @param {HTMLDivElement} toolbar - Div de la toolbar
 * @param {string} action - Nombre de la acción que ejecutará el botón
 * @param {string} label - Etiqueta del botón
 * @param {string} image - URL de la imagen del botón
 * @param {boolean} isTransparent - Indica si el fondo del botón será transparente
 */
function addToolbarButton(editor,toolbar,action,label,image){
    //Creamos le botón HTML
    let button=document.createElement('button');
    button.classList.add('buttonToolbar');
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
/**
 * Muestra una ventana modal con el título y contenido indicados
 * Modifica el fondo para cuando se muestre la ventana se oscurezca
 * @param {string} title - Título de la ventana modal
 * @param {HTMLElement} content - Contenido a mostrar en la ventana
 * @param {number} width - Ancho de la ventana
 * @param {number} height - Altura de la ventana
 * @returns {mxWindow} - Ventana modal
 */
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
    wnd.setScrollable(true);
    wnd.setVisible(true);

    return wnd;
}

/**
 * Añade un icono a la barra lateral y lo configura para su uso
 * Utilizado para añadir columnas y tablas
 * @param {mxGraph} graph - Instancia del grafo
 * @param {HTMLDivElement} sidebar - Div donde se añadirán los iconos
 * @param {mxCell} prototype - Prototipo de la celda que se añadirá
 * @param {string} image - URL de la imagen
 */
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
            let childCount=graph.getChildVertices(parent).length;
            name=mxUtils.prompt('Introduce el nombre para la tabla nueva','TABLE'+(childCount+1));
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
                }else if(parent.isCollapsed()){
                    //Corregir bug add columna a tabla colapsada
                    v1.geometry.height=prototype.geometry.height;
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
    img.style.width='128px';
    img.style.height='128px';
    if(graph.isSwimlane(prototype)){
        img.title='Arrastra este icono para crear una tabla';
    }else{
        img.title='Arrastra este icono sobre una tabla para añadir una columna';
    }
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

/**
 * Configura el estilo del grafo a partir de un fichero de configuración XML
 * @param {mxGraph} graph - Instancia del grafo
 */
function configureStylesheet(graph){ 
    let req = mxUtils.load('../editors/config/stylesheet.xml');
    let root = req.getDocumentElement();
    let dec = new mxCodec(root.ownerDocument);
    dec.decode(root, graph.getStylesheet());
}

/**
 * Crea un menú popup para la celda indicada
 * @param {mxEditor} editor - Instancia del editor
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxPopupMenu} menu - Instancia del menú popup
 * @param {mxCell} cell - Celda para la que se crea el menú
 * @param {Event} evt - Evento
 */
function createPopupMenu(editor,graph,menu,cell,evt){
    //Comprobamos si hemos hecho click en una tabla o en una columna
    if(cell!=null){
        //Si hemos hecho click en una columna añadimos la entrada propiedades
        if(graph.isHtmlLabel(cell)){
            menu.addItem('Subir posición',null,function(){
                editor.execute('subirColumna',cell);
            });
            menu.addItem('Bajar posición',null,function(){
                editor.execute('bajarColumna',cell);
            });

            menu.addSeparator();
        }else if(graph.isSwimlane(cell)){
            menu.addItem('Anadir columna','../images/plus.png',function(){
                editor.execute('addColumna',cell);
            });

            menu.addSeparator();
        }

        menu.addItem('Borrar','../images/delete2.png',function(){
            editor.execute('borrar',cell);
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

    menu.addItem('Mostrar SQL','../images/sql.png',function(){
        editor.execute('showSql',cell);
    });
    menu.addItem('Mostrar SQLAlchemy','../images/Python-logo_24.png',function(){
        editor.execute('showSqlAlch',cell);
    });

    menu.addSeparator();

    menu.addItem('Mostrar Diccionario de datos','../images/dict-icon_24.jpg',function(){
        editor.execute('diccionario',cell);
    });
}

/**
 * Mueve de posición una columna dentro de una tabla
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} col_a_mover - Columna a mover
 * @param {mxCell} parent - Tabla la columna a mover
 * @param {number} posicion - Posición de la columna a mover
 * @param {number} desp - Desplazamiento
 */
function moverPosicionColumna(graph,col_a_mover,parent,posicion,desp){
    let col_desplazada=graph.model.getChildAt(parent,posicion-desp);
    let value_desplazada=col_desplazada.value.clone();
    let value_cell=col_a_mover.value.clone();
    let temp_style=col_desplazada.getStyle();

    //Comprobamos si las columnas a mover tienen alguna relación asociada que hay que editar
    if(col_desplazada.value.relacionAsociada){
        intercambioIds(graph,col_desplazada.value.relacionAsociada,col_a_mover.getId(),col_desplazada.getId());
    }
    if(col_a_mover.value.relacionAsociada){
        intercambioIds(graph,col_a_mover.value.relacionAsociada,col_desplazada.getId(),col_a_mover.getId());
    }
    
    //Actualizamos referencias a claves primarias
    if(col_a_mover.value.primaryKey||col_desplazada.value.primaryKey){
        actualizarRefPK(graph,col_a_mover,col_desplazada,parent);
    }

    //Intercambiamos los ids en caso de que pertenzcan a un unique compuesto
    if(parent.value.uniqueComp.length){
        intercambioIdsUnique(parent,col_a_mover.getId(),col_desplazada.getId());
    }

    //Actualizamos valores y estilos
    graph.model.setValue(col_desplazada,value_cell);
    graph.model.setValue(col_a_mover,value_desplazada);
    graph.model.setStyle(col_desplazada,col_a_mover.getStyle());
    graph.model.setStyle(col_a_mover,temp_style);

    graph.setSelectionCell(col_desplazada);
}

/**
 * Actualizamos las claves foráneas asociadas a una relación
 * cuando movemos una columna dentro de una tabla
 * @param {mxGraph} graph - Instancia del grafo
 * @param {number} relacionId - Id de la relación asociada
 * @param {number} nuevo - Id de la nueva columna
 * @param {number} actual - Id de la columna actual
 */
function intercambioIds(graph,relacionId,nuevo,actual){
    let relacion=graph.model.getCell(relacionId);
    let clavesForaneas=relacion.value.clavesForaneas;
    for(let i=0;i<clavesForaneas.length;i++){
        if(clavesForaneas[i]==actual){
            clavesForaneas[i]=nuevo;
            break;
        }
    }
}

/**
 * Actualiza las referencias en los unique compuestos a las columnas que pueda tener una tabla
 * cuando movemos de posición una columna dentro de una tabla
 * @param {mxCell} parent - Celda de la tabla donde se realiza el cambio
 * @param {number} id_1 - Id de una de las columnas a mover
 * @param {number} id_2 - Id de una de las columnas a mover
 */
function intercambioIdsUnique(parent,id_1,id_2){
    for(const arr of parent.value.uniqueComp){
        let index1=arr.indexOf(id_1);
        let index2=arr.indexOf(id_2);
        if(index1>-1){
            arr[index1]=id_2;
        }
        if(index2>-1){
            arr[index2]=id_1;
        }
    }
}

/**
 * Actualizamos las referencias a las claves primarias que pueda tener una clave foránea
 * cuando movemos de posición una columna dentro de una tabla
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} key1 - Id de una de las columnas a mover
 * @param {mxCell} key2 - Id de una de las columnas a mover
 * @param {mxCell} tabla - Celda de la tabla donde se realiza el cambio
 */
function actualizarRefPK(graph,key1,key2,tabla){
    const enlaces=graph.getEdges(tabla,null,true,false);
    for(const enlace of enlaces){
        const clavesForaneas=enlace.value.clavesForaneas;
        for(const fkID of clavesForaneas){
            let cell=graph.model.getCell(fkID);
            if(cell.value.pkAsociada===key1.getId()){
                cell.value.pkAsociada=key2.getId();
            }else if(cell.value.pkAsociada===key2.getId()){
                cell.value.pkAsociada=key1.getId();
            }
        }
    }
}

/**
 * Configura el menú propiedades para la celda indicada
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} cell - Celda de la que mostrar propiedades
 * @param {HTMLDivElement} properties - Div donde se mostrarán las propiedades
 */
function showProperties(graph,cell,properties){
    let form=new mxForm('properties');

    //Añadimos los campos al formulario
    let nameField=form.addText('Nombre',cell.value.name);

    if(graph.isHtmlLabel(cell)){
        //COLUMNA
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
        
        mxEvent.addListener(form.getTable(),'change',function(event){
            let clone=cell.value.clone();
    
            clone.name=nameField.value;
            clone.type=typeField.value;
    
            if(useDefaultValue.checked){
                clone.defaultValue=defaultField.value;
            }else{
                clone.defaultValue=null;
            }

            let old_primaryKey=clone.primaryKey;
    
            clone.primaryKey=primaryKeyField.checked;
            clone.foreignKey=foreignKeyField.checked;
            clone.autoIncrement=autoIncrementField.checked;
            clone.notNull=notNullField.checked;
            clone.unique=uniqueField.checked;

            clone.titulo=titulo.value;
            clone.desc=descripcion.value;
    
            graph.model.setValue(cell,clone);
            handleCambioClavePrimaria(graph,graph.getModel().getParent(cell),old_primaryKey,clone.primaryKey);
            graph.setSelectionCell(cell);
        });
    }else if(graph.model.isEdge(cell)){
        //ENLACE
        let valor_actual_s=cell.value.startArrow;
        let valor_actual_e=cell.value.endArrow;

        let table_s=cell.getTerminal(true);//Tabla source
        let table_t=cell.getTerminal(false);//Tabla target

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

        mxEvent.addListener(form.getTable(),'change',function(event){
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
        });
    }else{
        //TABLA
        mxEvent.addListener(form.getTable(),'change',function(evt){
            let clone=cell.value.clone();

            clone.name=nameField.value;
    
            graph.model.setValue(cell,clone);
        });
    }
    let tabla=form.getTable();
    properties.appendChild(tabla);
    //Cabeceras de la tabla de propiedades
    let cabecera=tabla.createTHead();
    let fila=cabecera.insertRow(0);
    let c_propiedad=fila.insertCell(0);
    c_propiedad.outerHTML='<th>Propiedad</th>';
    let c_valor=fila.insertCell(1);
    c_valor.outerHTML='<th>Valor</th>';

    if(graph.isSwimlane(cell)){
        let uniqueTable=getTableUniqueComp(graph,cell);
        properties.appendChild(document.createElement('hr'));
        properties.appendChild(uniqueTable);
    }
}

/**
 * Maneja un cambio de clave primara de una tabla
 * Se actualizan las relaciones entrantes, añadiendo o eliminando la clave foránea correspondiente
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} tabla - Celda de la tabla
 * @param {boolean} oldValue - Valor anterior
 * @param {boolean} newValue - Valor nuevo
 */
function handleCambioClavePrimaria(graph,tabla,oldValue,newValue){
    //Comprobamos que el valor cambia
    if(oldValue!=newValue){
        //Actualizamos las relaciones entrantes
        let relaciones=graph.getEdges(tabla,null,true,false);
        relaciones.forEach(rel=>{actualizarClaves(graph,rel)});
    }
}

/**
 * Maneja un posible cambio en un unique compuesto de la tabla indicadada
 * @param {mxCell} cell - Celda de la columna
 * @param {mxCell} parent - Celda de la tabla
 */
function handleCambioUnique(cell,parent){
    if(parent.value.uniqueComp.length){
        let uniqueComp=parent.value.uniqueComp;
        parent.value.uniqueComp=uniqueComp.filter(unique=>!unique.includes(cell.getId()));
    }  
}

/**
 * Actualizamos las claves cuando se cambia la relación entre 2 tablas
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} cell - Celda de la relación
 */
function actualizarClaves(graph,cell){
    let relacion=cell.value.clone();

    let table_s=cell.getTerminal(true);
    let table_t=cell.getTerminal(false);
    const primaryKey_s=obtenerClavePrimaria(graph,table_s);
    const primaryKey_t=obtenerClavePrimaria(graph,table_t);

    //Eliminamos la clave foranea en la otra tabla y el enlace
    let clone=cell.clone();
    graph.removeCells([cell]); //Se activa el listener definido anteriormente REMOVE_CELLS

    if(relacion.startArrow==='solo_uno'||relacion.startArrow==='cero_o_uno'){
        if(relacion.endArrow==='uno_o_mas'||relacion.endArrow==='cero_o_mas'){
            console.log("Clave en target");
            insertarNuevaRelacion(graph,clone.clone(),relacion,table_t,table_s,primaryKey_s,true);
        }else{
            if(relacion.endArrow==='cero_o_uno'){
                insertarNuevaRelacion(graph,clone.clone(),relacion,table_t,table_s,primaryKey_s,true);
            }else{
                insertarNuevaRelacion(graph,clone.clone(),relacion,table_s,table_t,primaryKey_t,false);
            }
            console.log("Indiferente");
        }
    }else if(relacion.endArrow==='uno_o_mas'||relacion.endArrow==='cero_o_mas'){
        console.log("Tabla intermedia");
        let nombre=table_s.value.name+'_'+table_t.value.name;
        let table=obtenerTablaIntermedia(table_s.geometry,table_t.geometry,nombre);
        graph.addCell(table,graph.getDefaultParent());

        //Claves foraneas
        let relacion_s=new Relacion("Relacion_s");
        relacion_s.startArrow='uno_o_mas';
        relacion_s.endArrow='solo_uno';
        insertarNuevaRelacion(graph,clone.clone(),relacion_s,table,table_s,primaryKey_s,false);

        let relacion_t=new Relacion("Relacion_t");
        relacion_t.startArrow='uno_o_mas';
        relacion_t.endArrow='solo_uno';
        insertarNuevaRelacion(graph,clone.clone(),relacion_t,table,table_t,primaryKey_t,false);
        graph.setSelectionCell(table);
    }else{
        console.log("Clave en source");
        insertarNuevaRelacion(graph,clone.clone(),relacion,table_s,table_t,primaryKey_t,false);
    }
}

/**
 * Inserta una nueva relación entre 2 tablas
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} enlace - Celda correspondiente al enlace
 * @param {Relacion} relacion - Relación entre las tablas
 * @param {mxCell} source - Tabla origen
 * @param {mxCell} target - Tabla destino
 * @param {Array<mxCell>} pks - Array de claves primarias
 * @param {boolean} invertir - Indica si invertir la relación
 */
function insertarNuevaRelacion(graph,enlace,relacion,source,target,pks,invertir){
    editarRelacion(graph,enlace,relacion,source,target,invertir);
    for(let pk of pks){
        let column=addClaveForanea(graph,source,pk,enlace.getId(),relacion.endArrow,relacion.startArrow);
        relacion.clavesForaneas.push(column.getId());
    }
    graph.setSelectionCell(enlace);
}

/**
 * Obtiene una tabla intermedia entre 2 tablas para las relaciones M:M
 * @param {mxGeometry} geometry_s - Geometría de la tabla origen
 * @param {mxGeometry} geometry_t - Geometría de la tabla destino
 * @param {string} nombre - Nombre de la tabla intermedia
 * @returns {mxCell} - Tabla intermedia
 */
function obtenerTablaIntermedia(geometry_s,geometry_t,nombre){
    let distancia=geometry_t.x-(geometry_s.x+200);

    let x=geometry_t.x-100-distancia/2;
    let y=geometry_s.y<geometry_t.y?geometry_t.y:geometry_s.y;

    //Creamos nueva tabla para la relación
    let tableObject=new Table(nombre);
    let table=new mxCell(tableObject,new mxGeometry(x,y,200,28),'table');

    table.setVertex(true);

    let columnObject=new Column("COLUMNA");
    let column=new mxCell(columnObject,new mxGeometry(0,0,0,26));
    column.setVertex(true);
    column.setConnectable(false);
    let firstColumn=column.clone();
    firstColumn.value.name=tableObject.name+'_ID';
    firstColumn.value.type='INTEGER';
    firstColumn.value.primaryKey=true;
    firstColumn.value.autoIncrement=true;
    //Insertamos la celda columna en la tabla
    table.insert(firstColumn);

    return table;
}

/**
 * Añade la columna pasada como clave primaria como clave foranea a la tabla indicada
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} table - Tabla a la que añadir la clave foranea
 * @param {mxCell} key - Celda correspondiente a la clave primaria
 * @param {number} relacionAsociada - Id de la relación asociada
 * @param {string} simbO - Símbolo de obligatoriedad
 * @param {string} simbM - Símbolo de multiplicidad
 * @returns {mxCell} - Nueva columna añadida
 */
function addClaveForanea(graph,table,key,relacionAsociada,simbO,simbM){
    let columnObject=new Column("COLUMNA");
    let column=new mxCell(columnObject,new mxGeometry(0,0,0,26));
    let altura=column.geometry.height;

    column.setVertex(true);
    column.setConnectable(false);

    column.value.name=key.value.name;
    column.value.type=key.value.type;
    column.value.foreignKey=true;
    column.value.relacionAsociada=relacionAsociada;
    column.value.notNull=(simbO=='solo_uno'||simbO=='uno_o_mas');//Comprobar obligatoriedad
    column.value.unique=(simbM=='solo_uno'||simbM=='cero_o_uno');//Comprobar máximo uno
    column.value.pkAsociada=key.getId();//Asociamos la fk a la clave

    column.geometry.y=table.geometry.y; //Ajuste para corregir error con la tabla intermedia

    graph.addCell(column,table);
    if(table.isCollapsed){
        //Corregir bug add columna a tabla colapsada
        column.geometry.height=altura;
    }

    return column;
}

/**
 * Configura la relación entre dos tablas
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} edge - Enlace a editar
 * @param {Relacion} relacion - Objeto de la relación
 * @param {mxCell} source - Tabla origen
 * @param {mxCell} target - Tabla destino
 * @param {boolean} invertir - Indica si se debe invertir el origen y destino de la relación
 */
function editarRelacion(graph,edge,relacion,source,target,invertir){
    if(invertir){
        [relacion.startArrow,relacion.endArrow]=[relacion.endArrow,relacion.startArrow];
    }

    relacion.clavesForaneas=[];

    edge.setValue(relacion);
    edge.setTerminal(source,true);
    edge.setTerminal(target,false);
    
    graph.addCell(edge);

    graph.setCellStyles(mxConstants.STYLE_STARTARROW,relacion.startArrow,[edge]);
    graph.setCellStyles(mxConstants.STYLE_ENDARROW,relacion.endArrow,[edge]);
}

/**
 * Devuelve las celdas correspondientes a las claves primarias de la tabla indicada
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} tabla - Tabla de la que obtenemos las claves
 * @returns {Array<mxCell>} - Claves primarias de la tabla
 */
function obtenerClavePrimaria(graph,tabla){
    const primaryKey=[]
    let childs=graph.getChildVertices(tabla);
    primaryKey.push(...childs.filter(child=>child.value.primaryKey));
    return primaryKey;
}

/**
 * Función que crea el código SQL según los elementos del grafo
 * @param {mxGraph} graph - Instancia del grafo
 * @returns {string} - Código SQL correspondiente al diagrama del usuario
 */
function createSql(graph){
    let parent=graph.getDefaultParent();
    let childs=graph.getChildVertices(parent);
    return childs.map(child=>addTablaSql(graph,child)+'\n').join('');
}

/**
 * Transforma la tabla indicada en código SQL
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} tabla - Tabla de la que obtenemos los datos
 * @returns {string} - Código SQL de la tabla
 */
function addTablaSql(graph,tabla){
    const sql=[];

    sql.push('CREATE TABLE IF NOT EXISTS '+tabla.value.name+' (');
    let columnas=graph.getChildVertices(tabla);

    const pks=[];
    const fks={};
    for(let columna of columnas){
        let value=columna.value;
        sql.push(addColumnaSql(value));
        if(value.primaryKey){
            pks.push(value.name);
        }
        if(value.foreignKey){
            addFKData(graph,value,fks);
        }
    }

    //Añadimos las claves
    if(pks.length){
        sql.push('\n\tPRIMARY KEY('+pks.join(', ')+')');
        sql.push(',');
    }
    let fksArray=Object.entries(fks).map(([id,val])=>[id,val]);
    for(let grupo of fksArray){
        let parent=graph.getModel().getCell(grupo[0]);
        const nomFks=grupo[1].map(nombre=>nombre[0]);
        const nomPks=grupo[1].map(nombre=>graph.model.getCell(nombre[1]).value.name);

        sql.push('\n\tFOREIGN KEY ('+nomFks.join(',')+') REFERENCES '+parent.value.name+'('+nomPks.join(',')+')');
        sql.push(',');
    }
    
    if(tabla.value.uniqueComp.length){
        sql.push(tabla.value.uniqueComp.map(uniques=>'\n\tUNIQUE('+getNombreUniComp(graph,uniques)+')'));
    }else{
        sql.splice(sql.length-1,1);
    }

    sql.push('\n);\n');
    return sql.join('');
}

/**
 * Añade los datos de una columna para SQL
 * @param {Column} columna - Columna de la que obtenemos los datos
 * @returns {string} - Cadena con la información de la columna para SQL
 */
function addColumnaSql(columna){
    const sql=[];
    sql.push('\n\t'+columna.name+' '+columna.type);
    if(columna.notNull){
        sql.push(' NOT NULL');
    }
    if(columna.autoIncrement){
        sql.push(' AUTOINCREMENT');
    }
    if(columna.unique){
        sql.push(' UNIQUE');
    }
    if(columna.defaultValue!=null){
        sql.push(' DEFAULT '+columna.defaultValue);
    }
    sql.push(',');
    return sql.join('');
}

/**
 * Transforma el diagrama creado por el usuario en código SQLAlchemy
 * @param {mxGraph} graph - Instancia del grafo
 * @returns {string} - Código SQLAlchemy correspondiente al diagrama creado
 */
function createSqlAlchemy(graph){
    let parent=graph.getDefaultParent();
    let childs=graph.getChildVertices(parent);
    return childs.map(child=>addTablaSqlAlchemy(graph,child)+'\n').join('');
}

/**
 * Transforma la tabla indicada en código SQLAlchemy
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} tabla - Tabla de la que obtenemos los datos
 * @returns {string} - Código SQLAlchemy correspondiente a la tabla indicada
 */
function addTablaSqlAlchemy(graph,tabla){
    const sql=[];
    sql.push('class '+tabla.value.name+'(Base):\n');
    sql.push('\t__tablename__=\''+tabla.value.name+'\'\n');
    let childs=graph.getChildVertices(tabla);

    const fks={};

    for(let child of childs){
        sql.push(addColumnaSqlAlchemy(child));
        if(child.value.foreignKey){
            addFKData(graph,child.value,fks);
        }
    }

    let fksArray=Object.entries(fks).map(([id,val])=>[id,val]);
    
    if(fksArray.length||tabla.value.uniqueComp.length){
        sql.push('\t__table_args__=(\n');
        for(let grupo of fksArray){
            sql.push('\t\tForeignKeyConstraint(\n');
            let parent=graph.getModel().getCell(grupo[0]);

            const nomFks=grupo[1].map(nombre=>`"${nombre[0].trim()}"`);
            const refs=grupo[1].map(nombre=>`"${parent.value.name}.${graph.model.getCell(nombre[1]).value.name.trim()}"`);

            sql.push('\t\t\t['+nomFks.join(', ')+'], ['+refs.join(', ')+']\n\t\t),\n');
        }

        for(let grupo of tabla.value.uniqueComp){
            sql.push('\t\tUniqueConstraint(');
            let nombres=getNombreUniComp(graph,grupo).split(',');
            sql.push(nombres.map(nom => `"${nom.trim()}"`).join(', ')+'),\n');
        }
        sql.push('\t)\n');
    }
    
    return sql.join('');
}

/**
 * Añade los datos de una columna para SQLAlchemy
 * @param {Column} columna - Columna de la que obtener la información
 * @returns {string} - Cadena con la información de la columna para SQLAlchemy
 */
function addColumnaSqlAlchemy(columna) {
    let sql = '\t' + columna.value.name + '=Column(' + columna.value.type;
    if (columna.value.primaryKey) {
        sql += ', primary_key=True';
    }
    if (columna.value.notNull) {
        sql += ', nullable=False';
    }
    if (columna.value.defaultValue) {
        sql += ', default=' + columna.value.defaultValue;
    }
    if (columna.value.unique) {
        sql += ', unique=True';
    }

    sql += ')\n';
    return sql;
}
/**
 * Añade los datos de la clave foránea a un diccionario
 * @param {mxGraph} graph - Instancia del grafo
 * @param {Column} value - Objeto columna del que obtener la información
 * @param {Object} fks - Diccionario de claves foráneas
 */
function addFKData(graph,value,fks){
    let relacion=graph.getModel().getCell(value.relacionAsociada);
    if(relacion){
        let target=relacion.getTerminal(false);
        let id=target.getId();
        if(!fks[id]){
            fks[id]=[];
        }
        fks[id].push([value.name,value.pkAsociada]);
    }
}

/**
 * Calcula el ancho del texto en píxeles
 * @param {string} text - Texto sobre el que realizar el cálculo
 * @param {string} font - Cadena con la información del tipo de fuente del texto
 * @returns {number} - Ancho del texto en píxeles
 */
function getTextWidth(text,font){
    const canvas=getTextWidth.canvas || (getTextWidth.canvas=document.createElement("canvas"));
    const context=canvas.getContext("2d");
    context.font=font;
    const metrics=context.measureText(text);
    return metrics.width;
}

/**
 * Abre la pestaña de propiedades indicada
 * @param {Event} evt - Objeto del evento
 * @param {string} prop - Id de la pestaña a abrir
 */
function openTabProperties(evt,prop){
    //Manejo de las pestañas del apartado propiedades
    let tabs=document.getElementsByClassName("tab");
    for(let tab of tabs){
        tab.className=tab.className.replace(" active","");
    }

    let tabcontent=document.getElementsByClassName("tabcontent");
    for(let content of tabcontent){
        content.style.display="none";
    }
    document.getElementById(prop).style.display="block";
    evt.currentTarget.className+=" active";
}

/**
 * Configura el panel de estilos para la celda indicada
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} cell - Celda a modificar
 */
function configurarTabEstilos(graph,cell){
    //Establecemos los elementos del div estilos
    let colorPicker=document.getElementById("colorPicker"); //Cambio de color
    let gradientPicker=document.getElementById("gradientPicker"); //Cambio degradado
    let gradientCheck=document.getElementById("gradientCheck");
    let selectGradientDirection=document.getElementById("gradientDirection")
    let selectFont=document.getElementById("selectFont");
    let tamFont=document.getElementById("tamFont");
    let colorFontPicker=document.getElementById('colorFontPicker');
    let negritaButton=document.getElementById('negrita');
    let cursivaButton=document.getElementById('cursiva');
    let shadowCheck=document.getElementById('shadowCheck');
    let selectEstiloLinea=document.getElementById('selectEstiloLinea');

    inicializarGradientCheck(gradientCheck,gradientPicker,selectGradientDirection,cell.value.gradient);
    inicializarSombra(graph.isSwimlane(cell),shadowCheck);

    //El degradado no se aplica a los enlaces
    if(graph.model.isEdge(cell)){
        document.getElementById('degradado').style.display="none";
        document.getElementById('estiloLinea').style.display="table-row";
    }else{
        document.getElementById('degradado').style.display="table-row";
        document.getElementById('estiloLinea').style.display="none";
    }

    //Obtenemos el estilo de la celda
    let style=graph.getStylesheet().getCellStyle(cell.style);
    //Establecemos estilos iniciales
    setEstilosIniciales(style,graph.model.isEdge(cell),{
        colorPicker,
        gradientPicker,
        selectGradientDirection,
        selectFont,
        tamFont,
        colorFontPicker,
        negritaButton,
        cursivaButton,
        shadowCheck,
        selectEstiloLinea
    });
    //Establecemos los listeners para los cambios de estilos
    setListenersEstilos(graph,graph.model.isEdge(cell),cell,{
        colorPicker,
        gradientPicker,
        gradientCheck,
        selectGradientDirection,
        selectFont,
        tamFont,
        colorFontPicker,
        negritaButton,
        cursivaButton,
        shadowCheck,
        selectEstiloLinea
    });
}

/**
 * Inicializa el check del degradado
 * @param {HTMLInputElement} gradientCheck - Check de degradado
 * @param {HTMLInputElement} gradientPicker - Selector de color de degradado
 * @param {HTMLSelectElement} gradientDirection - Selector de dirección del degradado
 * @param {boolean} activado - Indica si el degradado está activado
 */
function inicializarGradientCheck(gradientCheck,gradientPicker,gradientDirection,activado){
    gradientCheck.checked=activado;
    if(!activado){
        gradientPicker.style.display="none";
        gradientDirection.style.display="none";
    }else{
        gradientPicker.style.display="inline";
        gradientDirection.style.display="inline";
    }
}

/**
 * Establece el valor inicial del check de la sombra
 * Comprueba si es una tabla para mostrarlo o no
 * @param {boolean} tabla - Indica si la celda es una tabla
 * @param {HTMLInputElement} shadowCheck - Check de sombra
 */
function inicializarSombra(tabla,shadowCheck){
    if(tabla){
        shadowCheck.style.display="inline";
        document.getElementById('sombra').style.display="table-row";
    }else{
        shadowCheck.style.display="none";
        document.getElementById('sombra').style.display="none";
    }

}

/**
 * Establece los valor iniciales para los elementos de estilos
 * @param {Object} style - Estilos de la celda
 * @param {boolean} enlace - Indica si la celda es un enlace
 * @param {Object} elementos - Elementos a los que establecer los valores de estilos iniciales
 */
function setEstilosIniciales(style,enlace,elementos){
    const{colorPicker,gradientPicker,selectGradientDirection,selectFont,
        tamFont,colorFontPicker,negritaButton,cursivaButton,shadowCheck,selectEstiloLinea
    }=elementos;

    if(style!=null){
        setColorPicker(style,colorPicker,enlace);
        setGradientPicker(style,gradientPicker);
        selectGradientDirection.options.selectedIndex=getSelectIndex(selectGradientDirection.options,style[mxConstants.STYLE_GRADIENT_DIRECTION]);
        selectFont.options.selectedIndex=getSelectIndex(selectFont.options,style[mxConstants.STYLE_FONTFAMILY]);
        setTamFont(style,tamFont);
        setColorFontPicker(style,colorFontPicker,enlace);
        setFontStyle(style,negritaButton,cursivaButton);
        shadowCheck.checked=style[mxConstants.STYLE_SHADOW];
        selectEstiloLinea.options.selectedIndex=style[mxConstants.STYLE_DASHED];
    }else{
        setEstilosDefault(enlace,elementos);
    }
}

/**
 * Establece el color del selector de color de la celda
 * @param {Object} style - Estilos de la celda
 * @param {HTMLInputElement} colorPicker - Selector de color de la celda
 * @param {boolean} enlace - Indica si la celda es un enlace
 */
function setColorPicker(style,colorPicker,enlace){
    //Si es enlace la propiedad es stroke si no fill
    let fillColor=enlace?style[mxConstants.STYLE_STROKECOLOR]:style[mxConstants.STYLE_FILLCOLOR];
    colorPicker.value=fillColor||(enlace?'#6482B9':'#ffffff');
}

/**
 * Establece el color del degradado en el selector de color del degradado
 * @param {Object} style - Estilos de la celda
 * @param {HTMLInputElement} gradientPicker - Selector de color del degradado
 */
function setGradientPicker(style,gradientPicker){
    let gradientColor=style[mxConstants.STYLE_GRADIENTCOLOR];
    gradientPicker.value=gradientColor||'#FFFFFF';
}

/**
 * Establece el tamaño de la fuente en el selector de tamaño de la fuente
 * @param {Object} style - Estilos de la celda
 * @param {HTMLInputElement} tamFont - Selector de tamaño de la fuente
 */
function setTamFont(style,tamFont){
    let tam=style[mxConstants.STYLE_FONTSIZE];
    tamFont.value=tam||'11';
}

/**
 * Establece el color de la fuente en el selector de color de la fuente
 * @param {Object} style - Estilos de la celda
 * @param {HTMLInputElement} colorFontPicker - Selector de color de la fuente
 * @param {boolean} enlace - Indica si la celda es un enlace
 */
function setColorFontPicker(style,colorFontPicker,enlace){
    let fontColor=style[mxConstants.STYLE_FONTCOLOR];
    colorFontPicker.value=fontColor||(enlace?'#446299':'#000000');
}

/**
 * Establece si los botones negrita y cursiva están activados o no
 * @param {Object} style - Estilos de la celda
 * @param {HTMLButtonElement} negritaButton - Botón de negrita
 * @param {HTMLButtonElement} cursivaButton - Botón de cursiva
 */
function setFontStyle(style,negritaButton,cursivaButton){
    let fontStyle=style[mxConstants.STYLE_FONTSTYLE];
    negritaButton.className=negritaButton.className.replace(" active","");
    cursivaButton.className=cursivaButton.className.replace(" active","");
    if(fontStyle){
        toggleButtonActiveStyle(negritaButton,fontStyle&mxConstants.FONT_BOLD);
        toggleButtonActiveStyle(cursivaButton,fontStyle&mxConstants.FONT_ITALIC);
    }
}

/**
 * 
 * @param {HTMLButtonElement} button - Botón a activar o desactivar
 * @param {boolean} activo - Indica si el botón está activo o no
 */
function toggleButtonActiveStyle(button,activo){
    if(activo){
        button.className+=' active';
    }else{
        button.className=button.className.replace(" active","");
    }
}

/**
 * Establece los valores por defecto de los elementos del apartado estilos
 * @param {boolean} enlace - Indica si la celda es un enlace o no
 * @param {Object} elementos - Elementos a los que establecer los valores por defecto
 */
function setEstilosDefault(enlace,elementos){
    const{colorPicker,gradientPicker,selectGradientDirection,selectFont,
        tamFont,colorFontPicker,negritaButton,cursivaButton,shadowCheck,selectEstiloLinea
    }=elementos;

    //Valores por defecto si el estilo está vacío
    if(enlace){
        colorFontPicker.value='#446299';
        colorPicker.value='#6482B9';
        selectEstiloLinea.options.selectedIndex=0;
    }else{
        colorPicker.value="#ffffff";
        colorFontPicker.value='#000000'
    }
    gradientPicker.value="#ffffff";
    selectFont.options.selectedIndex=0;
    selectGradientDirection.options.selectedIndex=0;
    tamFont.value='11';
    shadowCheck.checked=false;
    negritaButton.className=negritaButton.className.replace(" active","");
    cursivaButton.className=cursivaButton.className.replace(" active","");
}

/**
 * Establece los listeners de los elementos del apartado estilos
 * @param {mxGraph} graph - Instancia del grafo
 * @param {Boolean} enlace - Indica si la celda es un enlace o no
 * @param {mxCell} cell - Celda a modificar
 * @param {Object} elementos - Elementos a los que establecer los listeners
 */
function setListenersEstilos(graph,enlace,cell,elementos){
    const{colorPicker,gradientPicker,gradientCheck,selectGradientDirection,selectFont,
        tamFont,colorFontPicker,negritaButton,cursivaButton,shadowCheck
    }=elementos;

    mxEvent.addListener(colorPicker,'change',function(evt){
        handleColorPickerChange(graph,enlace,colorPicker,gradientCheck);
    });
    mxEvent.addListener(gradientPicker,'change',function(evt){
        graph.setCellStyles(mxConstants.STYLE_GRADIENTCOLOR,gradientPicker.value);
    });
    mxEvent.addListener(gradientCheck,'change',function(evt){
        handleGradientCheckChange(graph,gradientCheck,gradientPicker,selectGradientDirection,cell);
    });
    mxEvent.addListener(selectFont,'change',function(evt){
        graph.setCellStyles(mxConstants.STYLE_FONTFAMILY,selectFont.value);
    });
    mxEvent.addListener(selectGradientDirection,'change',function(evt){
        graph.setCellStyles(mxConstants.STYLE_GRADIENT_DIRECTION,selectGradientDirection.value);
    });
    mxEvent.addListener(tamFont,'change',function(evt){
        graph.setCellStyles(mxConstants.STYLE_FONTSIZE,tamFont.value);
    });
    mxEvent.addListener(colorFontPicker,'change',function(evt){
        graph.setCellStyles(mxConstants.STYLE_FONTCOLOR,colorFontPicker.value);
    });
    mxEvent.addListener(negritaButton,'click',function(evt){
        handleFontStyleButtonClick(graph,cell,negritaButton,mxConstants.FONT_BOLD);
    });
    mxEvent.addListener(cursivaButton,'click',function(evt){
        handleFontStyleButtonClick(graph,cell,cursivaButton,mxConstants.FONT_ITALIC);
    });
    mxEvent.addListener(shadowCheck,'change',function(evt){
        graph.toggleCellStyle(mxConstants.STYLE_SHADOW);
    });
    mxEvent.addListener(selectEstiloLinea,'change',function(evt){
        graph.toggleCellStyle(mxConstants.STYLE_DASHED);
    });
}

/**
 * Manejo del evento change del colorPicker
 * Cambia el color de la celda
 * Si el degradado está desactivado, cambia el color de degradado
 * @param {mxGraph} graph - Instancia del grafo
 * @param {boolean} enlace - Indica si la celda es un enlace
 * @param {HTMLInputElement} colorPicker - Selector de color
 * @param {HTMLInputElement} gradientCheck - Check de degradado
 */
function handleColorPickerChange(graph,enlace,colorPicker,gradientCheck){
    if(enlace){
        graph.setCellStyles(mxConstants.STYLE_STROKECOLOR,colorPicker.value);
    }else{
        graph.setCellStyles(mxConstants.STYLE_FILLCOLOR,colorPicker.value);
        if(!gradientCheck.checked){
            graph.setCellStyles(mxConstants.STYLE_GRADIENTCOLOR,colorPicker.value);
        }
    }
}

/**
 * Manejo del evento change del gradientCheck
 * Alterna si se muestra o no el apartado degradado y modifica la apariencia de la celda
 * @param {mxGraph} graph - Instancia del grafo
 * @param {HTMLInputElement} gradientCheck - Check de degradado
 * @param {HTMLInputElement} gradientPicker - Selector de color de degradado
 * @param {HTMLSelectElement} selectGradientDirection - Selector de dirección de degradado
 * @param {mxCell} cell - Celda a modificar
 */
function handleGradientCheckChange(graph,gradientCheck,gradientPicker,selectGradientDirection,cell){
    cell.value.gradient=gradientCheck.checked;
    if(!gradientCheck.checked){
        gradientPicker.style.display="none";
        selectGradientDirection.style.display="none";
        graph.setCellStyles(mxConstants.STYLE_GRADIENTCOLOR,colorPicker.value);
    }else{
        gradientPicker.style.display="inline";
        selectGradientDirection.style.display="inline";
        graph.setCellStyles(mxConstants.STYLE_GRADIENTCOLOR,gradientPicker.value);
    }
}

/**
 * Manejo del evento click de un botón de estilos
 * Alterna el valor de la propiedad de estilo para el botón negrita o cursiva
 * @param {mxGraph} graph - Instancia del grafo
 * @param {mxCell} cell - Celda a modificar
 * @param {HTMLButtonElement} button - Botón pulsado
 * @param {number} styleFlag - Flags de estilo a modificar
 */
function handleFontStyleButtonClick(graph,cell,button,styleFlag){
    graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE,styleFlag);
    let fontStyle=graph.getStylesheet().getCellStyle(cell.style)[mxConstants.STYLE_FONTSTYLE];
    toggleButtonActiveStyle(button,fontStyle&styleFlag);
}

/**
 * Función para obtener el valor del select según el índice
 * @param {HTMLSelectElement} options - Elemento select
 * @param {string} value - Valor a buscar en las opciones
 * @returns {number} - Índice de la opción que coincide con el valor
 */
function getSelectIndex(options,value){
    for(let i=0;i<options.length;i++){
        if(options[i].value===value){
            return i;
        }
    }
    return 0;
}

/**
 * Función para descarga un fichero con el texto indicado
 * @param {string} texto - Texto a descargar
 * @param {string} nombre - Nombre del fichero
 */
function descarga(texto,nombre){
    let file=new Blob([texto],{type:'text/xml'});
    if(window.navigator.msSaveOrOpenBlob){//Soporte IE
        window.navigator.msSaveOrOpenBlob(file,nombre);
    }else{
        let a=document.createElement("a"),url=URL.createObjectURL(file);
        a.href=url;
        a.download=nombre;
        document.body.appendChild(a);

        a.click();
        setTimeout(() => {
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

/**
 * 
 * @param {string} label - Etiqueta
 * @param {string} type - Tipo de dato de la columna
 * @param {Object} style - Objeto representando el style de la celda
 * @param {number} width - Ancho de la celda
 * @param {boolean} columna - Si es una columna o no
 * @returns {string} - Etiqueta recortada
 */
function obtenerEtiquetaRecortada(label,type,style,width,columna){
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
    let nombre=label.split(':')[0];
    if(getTextWidth(label,font)>width){
        for(let i=nombre.length;i>0;i--){
            let etiqueta_temp;
            if(columna){
                etiqueta_temp=nombre.slice(0,i)+"..."+": "+type;
            }else{
                etiqueta_temp=label.slice(0,i)+"...";
            }
            if(getTextWidth(etiqueta_temp,font)<width){
                return etiqueta_temp;
            }
        }
    }

    //La etiqueta no necesita cambios
    return label;
}

/**
 * Funcion para obtener una tabla con el diccionario de datos que describe
 * los elementos del diagrama
 * @param {mxGraph} graph - Instancia del grafo
 * @returns {HTMLDivElement} - div con el diccionario de datos
 */
function obtenerDiccDatos(graph){
    let div=document.createElement('div');;
    let titulo=document.createElement('p');
    titulo.textContent='DICCIONARIO DE DATOS';
    titulo.className='titulo';
    div.appendChild(titulo);
    div.appendChild(document.createElement('hr'));

    let parent=graph.getDefaultParent();
    let childs=graph.getChildVertices(parent);
    for(let child of childs){
        let p=document.createElement('p');
        p.textContent=child.value.name;
        p.className='titulo';
        div.append(p);
        let tabla=document.createElement('table');
        let thead=document.createElement('thead');
        let trh=document.createElement('tr');
        trh.appendChild(obtenerDatoTabla('th','Columna'));
        trh.appendChild(obtenerDatoTabla('th','Tipo de datos'));
        trh.appendChild(obtenerDatoTabla('th','Titulo'));
        trh.appendChild(obtenerDatoTabla('th','Descripcion'));
        thead.appendChild(trh);
        tabla.appendChild(thead);

        
        let cols=graph.getChildVertices(child);
        let tbody=document.createElement('tbody');
        for(let col of cols){
            let tr=document.createElement('tr');
            tr.appendChild(obtenerDatoTabla('td',col.value.name));
            tr.appendChild(obtenerDatoTabla('td',col.value.type));
            tr.appendChild(obtenerDatoTabla('td',col.value.titulo));
            tr.appendChild(obtenerDatoTabla('td',col.value.desc));
            tbody.appendChild(tr);
        }
        tabla.appendChild(tbody);

        div.appendChild(tabla);
    }
    div.appendChild(document.createElement('br'));
    div.style.overflow='auto';

    return div;
}

/**
 * Crea una celda de la tabla html y la devuelve
 * @param {string} tipo - Tipo de celda de la tabla
 * @param {*} dato - Dato a insertar en la celda
 * @returns {HTMLTableDataCellElement} - Celda de la tabla
 */
function obtenerDatoTabla(tipo,dato){
    let td=document.createElement(tipo);
    td.textContent=dato;
    return td;
}

/**
 * Función para obtener la tabla html con los unique compuestos de la tabla de diagrama
 * @param {mxGraph} graph - Instacia del grafo
 * @param {mxCell} cell - Celda correspondiente a la tabla
 * @returns {HTMLDivElement} - div que contiene la tabla
 */
function getTableUniqueComp(graph,cell){
    let div=document.createElement('div');
    let titulo=document.createElement('p');
    titulo.className='titulo';
    titulo.textContent='Unique compuesto';
    div.appendChild(titulo);

    let tabla=document.createElement('table');
    let thead=document.createElement('thead');
    let trh=document.createElement('tr');
    trh.appendChild(obtenerDatoTabla('th','Id'));
    trh.appendChild(obtenerDatoTabla('th','Columnas'));
    trh.appendChild(obtenerDatoTabla('th','Eliminar'));
    thead.appendChild(trh);
    tabla.appendChild(thead);
    let tbody=document.createElement('tbody');

    if(cell.value.uniqueComp.length){
        
        for(let i=0;i<cell.value.uniqueComp.length;i++){
            let tr=document.createElement('tr');
            tr.appendChild(obtenerDatoTabla('td',i));
            let nombres=getNombreUniComp(graph,cell.value.uniqueComp[i]);
            tr.appendChild(obtenerDatoTabla('td',nombres));
            let btnEliminar=document.createElement('button');
            mxEvent.addListener(btnEliminar,'click',function(evt){
                eliminarUniqueComp(graph,cell,tr,tabla);
            });
            btnEliminar.textContent='Elim';
            btnEliminar.className='buttonToolbar';
            let td=document.createElement('td');
            td.appendChild(btnEliminar);
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
        
    }
    tabla.appendChild(tbody);
    div.appendChild(tabla);
    div.appendChild(document.createElement('br'));
    let btnAdd=document.createElement('button');
    mxEvent.addListener(btnAdd,'click',function(evt){
        addUniqueComp(graph,cell,tabla);
    });
    btnAdd.className='buttonToolbar';
    btnAdd.textContent='Add';
    div.appendChild(btnAdd);

    return div;
}

/**
 * Elimina un unique compuesto de la tabla
 * @param {mxGraph} graph - Instacia del grafo
 * @param {mxCell} cell - Celda correspondiente a la tabla
 * @param {HTMLTableRowElement} id - Id del unique compuesto a eliminar
 * @param {HTMLTableElement} tabla - Tabla HTML
 */
function eliminarUniqueComp(graph,cell,id,tabla){
    let clone=cell.value.clone();
    clone.uniqueComp.splice(id,1);
    graph.model.setValue(cell,clone);
    tabla.deleteRow(id+1);
    //Actualizamos los indices de las filas
    graph.setSelectionCell(cell);
}
    

/**
 * Función que se ejecuta al pulsar el botón de añadir unique compuesto
 * Muestra un formulario con las columnas de la tabla que se pueden añadir
 * Si se añade correctamente se muestan en la tabla
 * @param {mxGraph} graph - Instacia del grafo
 * @param {mxCell} cell - Celda correspondiente a la tabla
 * @param {HTMLTableElement} tabla - Tabla HTML
 */
function addUniqueComp(graph,cell,tabla){
    let cols=graph.getChildVertices(cell);
    if(cols.length>1){
        //Mostramos ventana
        let form=new mxForm('Uniques');
        const ids=[];
        for(let col of cols){
            let nombre=col.value.name;
            let id=col.getId();
            let input=form.addCheckbox(nombre);
            mxEvent.addListener(input,'change',function(evt){
                if(input.checked){
                    ids.push(id);
                }else{
                    ids.splice(ids.lastIndexOf(id),1);
                }
            });
        }
        let vetnana=null;
        let acepFunc=function(){
            if(ids.length>1){
                let res=getNombreUniComp(graph,ids);
                let clone=cell.value.clone();
                clone.uniqueComp.push(ids);
                graph.model.setValue(cell,clone);

                let row=tabla.tBodies[0].insertRow();
                let id=row.insertCell(0);
                id.textContent=clone.uniqueComp.length-1;
                let name=row.insertCell(1);
                name.textContent=res;
                let cellBtn=row.insertCell(2);
                let btnEliminar=document.createElement('button');
                mxEvent.addListener(btnEliminar,'click',function(evt){
                    eliminarUniqueComp(graph,cell,clone.uniqueComp.length-1,tabla);
                });
                btnEliminar.textContent='Elim';
                btnEliminar.className='buttonToolbar';
                cellBtn.appendChild(btnEliminar);

                vetnana.destroy();
            }else{
                alert('Selecciona por lo menos dos columnas');
            }
        }
        let cancelFunc=function(){
            vetnana.destroy();
        }
        form.addButtons(acepFunc,cancelFunc);
        vetnana=showModalWindow('Unique compuesta',form.getTable(),240,240);
    }else{
        alert('Necesitas por lo menos 2 columnas');
    }
}

/**
 * Obtiene el nombre de las columnas de un unique compuesto
 * @param {mxGraph} graph - Instancia del grafo
 * @param {Array<number>} ids - Array con los ids de las columnas
 * @returns {string} - Nombre de las columnas separadas por comas
 */
function getNombreUniComp(graph,ids){
    return ids.map(id=>graph.model.getCell(id).value.name).join(', ');
}


/**
 * Representa una columna de una tabla en la base de datos
 * @param {string} name - Nombre de la columna
 */
function Column(name){
    this.name=name;
}
/** @type {string} */
Column.prototype.type='TEXT';
/** @type {string} */
Column.prototype.defaultValue=null;
/** @type {boolean} */
Column.prototype.primaryKey=false;
/** @type {boolean} */
Column.prototype.foreignKey=false;
/** @type {boolean} */
Column.prototype.autoIncrement=false;
/** @type {boolean} */
Column.prototype.notNull=false;
/** @type {boolean} */
Column.prototype.unique=false;
/**
 * Clona la columna
 * @returns {Column} - Clon de la columna
 */
Column.prototype.clone=function(){
    return mxUtils.clone(this);
}
/** @type {string} */
Column.prototype.desc='DESCRIPCION';
/** @type {string} */
Column.prototype.titulo='TITULO';
/** @type {boolean} */
Column.prototype.gradient=false;
/** @type {number} */
Column.prototype.relacionAsociada=null;
/** @type {number} */
Column.prototype.pkAsociada=null;

/**
 * Representa una tabla en la base de datos
 * @param {string} name - Nombre de la tabla
 */
function Table(name){
    this.name=name;
    /**
     * Matriz con los unique compuestos de la tabla
     * @type {Array<Array<number>>}
     */
    this.uniqueComp=[];
}
/**
 * Clona la tabla
 * @returns {Table} - Clon de la tabla
 */
Table.prototype.clone=function(){
    return mxUtils.clone(this);
}
/** @type {boolean} */
Table.prototype.gradient=true;

/**
 * Representa una relacion en la base de datos
 * @param {string} name - Nombre de la relacion
 */
function Relacion(name){
    this.name=name;
    /**
     * Array con las claves foraneas de la relacion
     * @type {Array<number>}
     */
    this.clavesForaneas=[];
}
/** @type {string} */
Relacion.prototype.startArrow="solo_uno";
/** @type {string} */
Relacion.prototype.endArrow="solo_uno";

/**
 * Clona la relacion
 * @returns {Relacion} - Clon de la relacion
 */
Relacion.prototype.clone=function(){
    return mxUtils.clone(this);
}