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
        new vis.Network(container, data, {});
    };

    // Value cambia el tamaño del nodo
    const nodes = new vis.DataSet([
        { id: 0, label: "Alex Vargas", value: 10, lineas: ['l1', 'l2', 'l3']  },
        { id: 1, label: "Mauricio Corona", value: 8, lineas: ['l1', 'l3']  },
        { id: 2, label: "Inves T. Gador", value: 5, lineas: ['l3', 'l5']  },
    ]);
    
    // Value cambia el tamaño del nodo
    const edges = new vis.DataSet([
        {from: 1, to: 0, value: 5, title: "Alex y Mauricio comparten 5 investigaciones", color: {color: 'red'}},
        {from: 2, to: 0, value: 5, title: "Alex e Inves comparten 5 investigaciones"},
        {from: 2, to: 1, value: 3, title: "Inves y Mauricio comparten 3 investigaciones"}
    ]);

    // Los DataView nos permiten filtrar datasets
    const nodesView = new vis.DataView(nodes, {filter: nodeFilter});

    checkboxFiltro.addEventListener('change', (event) => {
        nodesView.refresh();
    });

    startNetwork({ nodes: nodesView, edges: edges });
}