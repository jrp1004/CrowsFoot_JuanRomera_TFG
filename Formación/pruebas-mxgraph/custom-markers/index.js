function main(container){
    if(!mxClient.isBrowserSupported()){
        mxUtils.error("Navagador no soportado",200,false);
    }else{
        mxGraphHandler.prototype.guidesEnabled=true;
        mxEdgeHandler.prototype.snapToTerminals=true;


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
                canvas.fill();
                
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

                canvas.fill();
                canvas.begin();

                //HORIZONTAL
                canvas.moveTo(pt_linea.x-unitX-unitY*widthFactor,pt_linea.y-unitY+unitX*widthFactor);
                canvas.lineTo(pt_linea.x+unitY*widthFactor-unitX,pt_linea.y-unitY-unitX*widthFactor);
                            
                canvas.stroke();
            };
        });

        let graph=new mxGraph(container);

        var style = graph.getStylesheet().getDefaultVertexStyle();
        style['fillColor'] = '#FFFFFF';
        style['strokeColor'] = '#000000';
        style['fontColor'] = '#000000';
        style['fontStyle'] = '1';
        style['minWidth']='80';
        style['minHeight']='30';
        
        style = graph.getStylesheet().getDefaultEdgeStyle();
        style['strokeColor'] = '#000000';
        style['fontColor'] = '#000000';
        style['fontStyle'] = '0';
        style['fontStyle'] = '0';
        style['startSize'] = '8';
        style['endSize'] = '8';

        let parent=graph.getDefaultParent();

        //Obtenemos el valor de la etiqueta del objeto Relacion
        graph.convertValueToString=function(cell){
            //Comprobamos si es nodo o arista
            if(this.model.isEdge(cell)){
                return cell.value.name;
            }
            //Si no es arista comportamiento normal
            return mxGraph.prototype.convertValueToString.apply(this,arguments);
        };

        //Mantenemos anchura y altura mínima para las celdas
        let graphGetPreferredSizeForCell=graph.getPreferredSizeForCell;
        graph.getPreferredSizeForCell=function(cell,textWidth){
            let result=graphGetPreferredSizeForCell.apply(this,arguments);
            let style=this.getCellStyle(cell);

            if(style['minWidth']>0){
                result.width=Math.max(style['minWidth'],result.width);
            }

            if(style['minHeight']>0){
                result.height=Math.max(style['minHeight'],result.height);
            }

            return result;
        }

        graph.setAutoSizeCells(true);

        //Actualizamos el valor de la etiqueta del objeto Relacion asignado a la arista
        graph.model.valueForCellChanged=function(cell,value){
            if(this.isEdge(cell)){
                if(value.name==null){
                    let old=cell.value.name;
                    cell.value.name=value;
                    return old;
                }
            }
            return mxGraphModel.prototype.valueForCellChanged.apply(this,arguments);
        };

        graph.getView().updateStyle=true;
        let previous=graph.model.getStyle;

        graph.model.getStyle=function(cell){
            if(cell!=null){
                let style=previous.apply(this,arguments);
                if(this.isEdge(cell)){
                    style+="startArrow="+cell.value.startArrow+";endArrow="+cell.value.endArrow+";";
                }

                return style;
                
            }
            return null;
        };

        graph.getModel().beginUpdate();
        try {
            let v1=graph.insertVertex(parent,null,'v1',20,20,80,30);
            let v2=graph.insertVertex(parent,null,'v2',440,20,80,30);
            let e1=graph.insertEdge(parent,null,new Relacion("Etiqueta 1"),v1,v2,
                'dashed=1;startArrow=cero_o_uno;endArrow=cero_o_mas;startFill=0;endFill=0;labelBackgroundColor=#FFFFFF;');

            let v3=graph.insertVertex(parent,null,'v3',20,120,80,30);
            let v4=graph.insertVertex(parent,null,'v4',440,120,80,30);
            let e2=graph.insertEdge(parent,null,new Relacion("Etiqueta 2"),v3,v4,
                'startSize=24;endSize=24;labelBackgroundColor=#FFFFFF;');
        } catch (error) {
            console.log("ERROR add elementos al grafo:");
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
        if(graph.model.isEdge(cell)){
            let center=document.createElement('center');
            mxUtils.writeln(center,cell.value.name+' ( id: '+cell.id+')');
            div.appendChild(center);
            mxUtils.br(div);

            //Añadimos el formulario utilizando los atributos del nodo
            let form=new mxForm();
            
            createTextField(graph,form,cell,"startArrow",cell.value.startArrow);
            createTextField(graph,form,cell,"endArrow",cell.value.endArrow);

            div.appendChild(form.getTable());
            mxUtils.br(div);
        }else{
            mxUtils.writeln(div,"Selecciona una arista");
        }
    }
}

function createTextField(graph,form,cell,attribute,valor_actual){
    //Añadimos combo con las opciones
    let combo=form.addCombo(attribute,false,4);
    //Marcamos como seleccionado el que coincida con valor_actual
    form.addOption(combo,"solo uno","solo_uno","solo_uno"==valor_actual);
    form.addOption(combo,"cero o uno","cero_o_uno","cero_o_uno"==valor_actual);
    form.addOption(combo,"cero o mas","cero_o_mas","cero_o_mas"==valor_actual);
    form.addOption(combo,"uno o mas","uno_o_mas","uno_o_mas"==valor_actual);

    //Handler para actualizar el valor
    const applyHandler=()=>{
        let newValue=combo.value || '';
        let oldValue=valor_actual;

        if(newValue!=oldValue){
            graph.getModel().beginUpdate();
            try {
                let clone=cell.value.clone();
                
                if(attribute=="startArrow"){
                    clone.startArrow=newValue;
                }else{
                    clone.endArrow=newValue;
                }

                graph.model.setValue(cell,clone);

            } catch (error) {
                console.log("ERROR update");
                console.log(error);
            }finally{
                graph.getModel().endUpdate();
            }
        }
    };

    //Añadimos los listeners para cuando se pulse enter o se pierda el foco
    //Los listeners aplicarán la función anterior aplicando los cambios que se hayan podido producir
    mxEvent.addListener(combo,'keypress',(event)=>{
        if(event.keyCode==/*enter*/13&&!mxEvent.isShiftDown(event)){
            combo.blur();
        }
    });

    if(mxClient.IS_IE){
        mxEvent.addListener(combo,'focusout',applyHandler);
    }else{
        mxEvent.addListener(combo,'blur',applyHandler);
    }
}


function Relacion(name){
    this.name=name;
}
Relacion.prototype.startArrow="solo_uno";
Relacion.prototype.endArrow="solo_uno";
Relacion.prototype.clone=function(){
    return mxUtils.clone(this);
}