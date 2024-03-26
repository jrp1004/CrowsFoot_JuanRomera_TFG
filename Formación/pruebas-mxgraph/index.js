let model;
let graph;
let count=0;

function main(container){
    if(!mxClient.isBrowserSupported()){
        console.log("navegador no soportado");
    }

    console.log("cargando...");

    model=new mxGraphModel();
    graph=new mxGraph(container,model);

    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    var parent = graph.getDefaultParent();

    // Adds cells to the model in a single step
    model.beginUpdate();
    try
    {
        var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
        var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
        var e1 = graph.insertEdge(parent, null, '', v1, v2);
        console.log("grafo mostrado");
    }
    finally
    {
        // Updates the display
        model.endUpdate();
    }
}


//Añadir un vértice pulsando un botón
function prueba_boton(){
    const parent=graph.getDefaultParent();

    model.beginUpdate();
    try {
        graph.insertVertex(parent,null,"Vértice "+count,100,100,80,30);
        count+=1;
        console.log("vertice añadido");
    } catch (error) {
        console.log("ERROR:");
        console.log(error);
    }finally{
        model.endUpdate();
    }
}