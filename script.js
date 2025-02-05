document.getElementById('union').addEventListener('click', function() {
    performOperation('union');
});

document.getElementById('intersection').addEventListener('click', function() {
    performOperation('intersection');
});

document.getElementById('difference').addEventListener('click', function() {
    performOperation('difference');
});

document.getElementById('complement').addEventListener('click', function() {
    performOperation('complement');
});

function performOperation(operation) {
    const setA = parseSet(document.getElementById('setA').value);
    const setB = parseSet(document.getElementById('setB').value);
    const setC = parseSet(document.getElementById('setC').value);

    let result;
    switch (operation) {
        case 'union':
            result = union(setA, setB);
            break;
        case 'intersection':
            result = intersection(setA, setB);
            break;
        case 'difference':
            result = difference(setA, setB);
            break;
        case 'complement':
            result = complement(setA, setB); // Exemplo simples, você pode melhorar!
            break;
    }

    displayResult(result);
    drawVenn(setA, setB, result, operation);
}

function parseSet(input) {
    return input.split(',').map(e => e.trim()).filter(Boolean);
}

function union(setA, setB) {
    return [...new Set([...setA, ...setB])];
}

function intersection(setA, setB) {
    return setA.filter(value => setB.includes(value));
}

function difference(setA, setB) {
    return setA.filter(value => !setB.includes(value));
}

function complement(setA, setB) {
    return setA.filter(value => !setB.includes(value));
}

function displayResult(result) {
    document.getElementById('setResult').textContent = `Resultado: {${result.join(', ')}}`;
}

function drawVenn(setA, setB, result, operation) {
    // Função para desenhar o diagrama de Venn usando D3.js ou similar
    // Exemplo básico de como ilustrar visualmente a operação
    const svg = d3.select("#vennDiagram").append("svg").attr("width", 500).attr("height", 300);
    svg.selectAll('*').remove(); // Limpar o diagrama anterior

    // Exemplo de como fazer círculos básicos representando os conjuntos A e B
    const circleA = svg.append("circle").attr("cx", 150).attr("cy", 150).attr("r", 100).style("fill", "blue").style("opacity", 0.5);
    const circleB = svg.append("circle").attr("cx", 250).attr("cy", 150).attr("r", 100).style("fill", "green").style("opacity", 0.5);

    svg.append("text").attr("x", 150).attr("y", 150).text("A").attr("text-anchor", "middle").attr("dominant-baseline", "middle").style("fill", "white");
    svg.append("text").attr("x", 250).attr("y", 150).text("B").attr("text-anchor", "middle").attr("dominant-baseline", "middle").style("fill", "white");

    // Adicionar o resultado do diagrama
    svg.append("text").attr("x", 200).attr("y", 220).text("Resultado: " + JSON.stringify(result)).attr("text-anchor", "middle").style("fill", "black");
}
