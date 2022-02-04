import Graph from './Graph';

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const alreadyExists = (links, node1, node2) => {

    const found = links.find((link) => {
        if (link.target === node1 && link.source === node2)
            return true;
        else if (link.target === node2 && link.source === node1)
            return true;
        return false
    });

    return found ? true : false
}

const generateNodes = () => {
    for (let i = 0; i <= 1000; i++) {
        Graph.addVertex(i);
    }
}

const generateLinks = (qtdLinks) => {
    const min = 0
    const links = []
    let qtd = qtdLinks

    generateNodes(1000);

    while (qtd--) {
        const node1 = randomIntFromInterval(min, 1000);
        let node2 = randomIntFromInterval(min, 1000);

        if (node1 === node2) node2 = randomIntFromInterval(min, 1000);

        if (!alreadyExists(links, node1, node2) || links.length === 0) {
            links.push({ target: node1, source: node2 })
            Graph.addEdge(node1, node2)
        }
    }

    return links
}

export default {
    generateNodes,
    generateLinks,
}