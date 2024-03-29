function main(){
    if(!mxClient.isBrowserSupported()){
        mxUtils.error('Navegador no soportado',200,false);
    }else{
        //Creamos el documento XML
        //Los nodos XML encerrarán los nodos mxCell para el modelo de celdas en la salida
        let doc=mxUtils.createXmlDocument();

        //Primer elemento 'persona' del documento con atributos nombre y apellidos
        let person1=doc.createElement('Person');
        person1.setAttribute('firstName','Daffy');
        person1.setAttribute('lastName','Duck');

        //Segundo elemento 'persona'
        let person2=doc.createElement('Person');
        person2.setAttribute('firstName','Bugs');
        person2.setAttribute('lastName','Bunny');

        //Primer elemento 'conoce' con atributo desde
        let relation=doc.createElement('Knows');
        relation.setAttribute('since','1985');

        let graph=new mxGraph(document.getElementById("graph-container"));
        //Las celdas no se podrán cambiar de tamaño
        graph.setCellsResizable(false);

        //El tamaño del container del grafo cambiará si el tamaño del grafo cambia
        graph.setResizeContainer(true);
        //Tamaño mínimo del container del grafo
        graph.minimumContainerSize=new mxRectangle(0,0,500,380);
        //Margen del container del grafo
        graph.setBorder(60);

        //Dejamos de editar cuando se pulsa enter
        new mxKeyHandler(graph);

        //Sobreescribimos el método para deshabilitar la edición de las etiquetas
        graph.isCellEditable=function(cell){
            //ERROR this.getModel is not a function
            return !this.getModel().isEdge(cell);
        };

        //Sobreescribimos el método que proporciona la etiqueta de una celda para mostrar

        //ERROR: this.convertValueToString is not a function
        graph.convertValueToString=(cell)=>{
            //Comprobamos si es nodo o arista
            if(mxUtils.isNode(cell.value)){
                //Comprobamos si el nodo es de tipo persona
                if(cell.value.nodeName.toLowerCase()=='person'){
                    let firstName=cell.getAttribute('firstName','');
                    let lastName=cell.getAttribute('lastName','');

                    if(lastName!=null&&lastName.length>0){
                        return lastName+', '+firstName;
                    }

                    return firstName;
                }else{
                    if(cell.value.nodeName.toLowerCase()=='knows'){
                        return cell.value.nodeName+' (Since '+cell.getAttribute('since','')+')';
                    }
                }
            }
            return '';
        }

        //Sobreescribimos el método para almacenar la etiqueta de una celda en el modelo
        let cellLabelChanged=graph.cellLabelChanged;
        graph.cellLabelChanged=(cell,newValue,autoSize)=>{
            if(mxUtils.isNode(cell.value)&&cell.value.nodeName.toLowerCase()=='person'){
                let pos=newValue.indexOf(' ');

                let firstName=(pos>0)?newValue.subString(0,pos):newValue;
                let lastName=(pos>0)?newValue.subString(pos+1,newValue.length):'';

                let elt=cell.value.cloneNode(true);

                elt.setAttribute('firstName',firstName);
                elt.setAttribute('lastName',lastName);

                newValue=elt;
                autoSize=true;
            }

            cellLabelChanged.apply(this,arguments);
        };

        //Sobreescribimos el método para crear el valor a editar
        let getEditingValue=graph.getEditingValue;
        graph.getEditingValue=(cell)=>{
            if(mxUtils.isNode(cell.value)&&cell.value.nodeName.toLowerCase()=='person'){
                let firstName=cell.getAttribute('firstName','');
                let lastName=cell.getAttribute('lastName','');

                return firstName+' '+lastName;
            }
        };


        //Establecemos tooltip especial para las aristas
        //Tooltip: cuadro que se muestra con más información al dejar el ratón encima
        graph.setTooltips(true);

        let getTooltipForCell=graph.getTooltipForCell;
        graph.getTooltipForCell=function(cell){
            //Comprobamos que la celda sea una arista
            if(graph.getModel().isEdge(cell)){
                //Obtenemos los nodos origen y objetivo de la arista
                let src=this.getLabel(this.getModel().getTerminal(cell,true));
                let trg=this.getLabel(this.getModel().getTerminal(cell,false));

                //Devolvemos 'origen conoce objetivo'
                return src+' '+cell.value.nodeName+' '+trg;
            }
            return getTooltipForCell.apply(this,arguments);
        }

        new mxRubberband(graph);

        //Botón que muestra el documento XML
        document.body.appendChild(mxUtils.button('View XML',()=>{
            let encoder=new mxCodec();
            let node=encoder.encode(graph.getModel());
            mxUtils.popup(mxUtils.getPrettyXml(node),true);
        }));

        let parent=graph.getDefaultParent();

        graph.getModel().beginUpdate();
        try {
            let v1=graph.insertVertex(parent,null,person1,40,40,80,30);
            let v2=graph.insertVertex(parent,null,person2,200,150,80,30);
            let e1=graph.insertEdge(parent,null,relation,v1,v2);
        } catch (error) {
            console.log("ERROR:");
            console.log(error);
        }finally{
            graph.getModel().endUpdate();
        }

        //Implementamos el panel de propiedades
        graph.getSelectionModel().addListener(mxEvent.CHANGE, (sender,event)=>{
            selectionChanged(graph);
        });

        selectionChanged(graph);
    }
}

//Función para actualizar el panel de propiedades
function selectionChanged(graph){
    let div=document.getElementById('properties');

    graph.container.focus();

    div.innerHTML='';

    //Obtenemos la celda seleccionada
    let cell=graph.getSelectionCell();
    if(cell==null){
        mxUtils.writeln(div,'Nada seleccionado');
    }else{
        //Creamos un formulario con los datos del nodo
        let center=document.createElement('center');
        mxUtils.writeln(center,cell.value.nodeName+' ('+cell.id+')');
        div.appendChild(center);
        mxUtils.br(div);

        //Añadimos el formulario utilizando los atributos del nodo
        let form=new mxForm();
        let attrs=cell.value.attributes;
        for(let i=0;i<attrs.length;i++){
            createTextField(graph,form,cell,attrs[i]);
        }
        div.appendChild(form.getTable());
        mxUtils.br(div);
    }
}

function createTextField(graph,form,cell,attribute){
    let input=form.addText(attribute.nodeName+':',attribute.nodeValue);

    const applyHandler=()=>{
        let newValue=input.value || '';
        let oldValue=cell.getAttribute(attribute.nodeName,'');

        if(newValue!=oldValue){
            graph.getModel().beginUpdate();
            try {
                let edit=new mxCellAttributeChange(cell,attribute.nodeName,newValue);
                graph.getModel().execute(edit);
                graph.updateCellSize(cell);
            } catch (error) {
                console.log("ERROR update");
                console.log(error);
            }finally{
                graph.getModel().endUpdate();
            }
        }
    };

    mxEvent.addListener(input,'keypress',(event)=>{
        if(event.keyCode==/*enter*/13&&!mxEvent.isShiftDown(event)){
            input.blur();
        }
    });

    if(mxClient.IS_IE){
        mxEvent.addListener(input,'focusout',applyHandler);
    }else{
        mxEvent.addListener(input,'blur',applyHandler);
    }
}