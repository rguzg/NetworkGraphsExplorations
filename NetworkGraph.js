// Está en window.load porque aunque el script tiene un defer, el script se ejecuta antes de que
// div#graph exista en el DOM ¯\_(ツ)_/¯
window.onload = () => {
  let margin = { top: 10, right: 30, bottom: 30, left: 40 };
  let width = 400 - margin.left - margin.right;
  let height = 400 - margin.top - margin.bottom;

  // Aquí se está definiendo a mano el json, pero al utilizarlo ya de verdad se puede utilizar d3.json()
  // para obtener un json de una ubicación remota
  let json = {
    nodes: [
      { id: 0, name: "Alex Vargas" },
      { id: 1, name: "Mauricio Corona" },
    ],
    links: [{ source: 0, target: 2 }],
  };

  // Aquí se está creando un nuevo elemento svg, se le está asignando características, y después se está agregando al svg un elemento g
  let graph = d3
    .select("#graph") // <- Selecciona un elemento del DOM. Akin a document.querySelector; se le pueden pasar referencias a nodos
    .append("svg") // <- Algo muy util de la función selection.append, es que el argumento de la función puede ser una función que retorna un HTMLElement
    .attr("width", 400)
    .attr("height", 400)
    .append("g") // <- Elemento que agrupa cosas dentro de un svg
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

/* Aquí se está definiendo el procedimiento general para la creación de los links del grafo. Se seleccionan todas las lineas existentes 
en el grafo y se realiza un mapeo de la selección y los datos en json.links. Para los elementos en json.links (que cuando se genere por
primera vez el grafo van a ser todos los elementos) a los que no les corresponde un elemento, se crear una nueva linea la cual se appendea
al grafo*/
  let link = graph
    .selectAll("line")
    .data(json.links) // <- Realiza un mapeo entre la selección y los datos pasados como argumento
    .enter() // <- Crea elementos placeholders para los datos de la selección que no existan dentro de la selección actual
    .append("line") // <- Los elementos placeholders son reemplazados por elementos line
    .style("stroke", "#aaa");

/* Aquí se realiza un proceso muy similar al realizado en link, solo que los datos son json.nodes y en lugar de usar lineas, se usan
circulos */
  let node = graph
    .selectAll("circle")
    .data(json.nodes)
    .enter()
    .append("circle")
    .attr("r", 20)
    .style("fill", "#69b3a2");
};
