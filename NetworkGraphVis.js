// Checar como se actualizarian los datos en ambos tipos de gráficas, y quizas cuanto se tardarian
// en cargar muchos datos

window.onload = () => {
    // Como los filtros en los arreglos en JS, el flitro solo muestra los elementos para los que se retorne true
    // también puede haber filtros para los edges

    // En el caso de esta función filtro, se decidira si aplicar
    // el filtro dependiendo del valor del checkbox
    const nodeFilter = (node) => {
        if(checkboxFiltro.checked) {
            return node.lineas.includes('l1') ? true : false;
        }

        return true;
    }

    const checkboxFiltro = document.querySelector('#filtro');

    const startNetwork = (data) => {
        const container = document.querySelector('#graph2');
        const options = {
            nodes: {
                shape: "dot",
                scaling: {
                    // Value es el valor asignado a cada nodo
                    // Total es igual a la suma de todos los values
                    customScalingFunction: (min, max, total, value) => {
                        console.log(min, max, total, value);
                        return value / max;
                    },
                    min: 0,
                    max: 20
                }
            },
            // physics: {enabled: False} // <- Desabilita las físicas del grafo
        }

        return new vis.Network(container, data, options);
    };

    // Value cambia el tamaño del nodo
    const nodes = new vis.DataSet([
        { id: 0, label: "Alex Vargas", value: 10, lineas: ['l1', 'l2', 'l3'], title: "Alex tiene 10 investigaciones" },
        { id: 1, label: "Mauricio Corona", value: 8, lineas: ['l1', 'l3'], title: "Mau tiene 8 investigaciones"  },
        { id: 2, label: "Inves T. Gador", value: 5, lineas: ['l3', 'l5'], title: "Inves tiene 5 investigaciones"  },
    ]);
    
    // Value cambia el tamaño del nodo
    const edges = new vis.DataSet([
        {from: 1, to: 0, value: 5, title: "Alex y Mauricio comparten 5 investigaciones", color: {color: 'red'}},
        {from: 2, to: 0, value: 5, title: "Alex e Inves comparten 5 investigaciones"},
        // Los tipos de smooth se encuentran en: https://visjs.github.io/vis-network/docs/network/edges.html
        {from: 2, to: 1, value: 3, title: "Inves y Mauricio comparten 3 investigaciones", smooth: 'continuous', arrows: {
            from: {enabled: true, type: 'circle'},
            to: {disabled: false}
        }}
    ]);

    // Los DataView nos permiten filtrar datasets
    const nodesView = new vis.DataView(nodes, {filter: nodeFilter});

    checkboxFiltro.addEventListener('change', (event) => {
        nodesView.refresh();
    });

    let network = startNetwork({ nodes: nodesView, edges: edges });

    // Como algo aquí está modificando el valor de this, no se puede usar una función flecha
    // Esto puede ser utilizado para hacer popup boxes cuando se da click en un nodo
    network.on('click', function(node) {
        // Cuando ocurre un evento click, se le pasa una copia del nodo al que se le hizo click
        console.log(node);

        // Retorna el id de un nodo en una posición en especifico del DOM
        let id = this.getNodeAt(node.pointer.DOM);

        let box = document.createElement('p');
        box.innerText = nodes;
        box.style.position = 'absolute';
        box.style.top = `${node.pointer.DOM.y}px`;
        box.style.left = `${node.pointer.DOM.x}px`;

        document.querySelector('#graph2').appendChild(box)
    })
}