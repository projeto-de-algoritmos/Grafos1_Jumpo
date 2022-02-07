import Graph from './Graph';

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const alreadyExists = (links, node1, node2) => {

    const found = links.find((link) => {
        if (link.target === node1 && link.source === node2)
            return true;
        else if (link.target === node2 && link.source === node1)
            return true;
        return false;
    });

    return found ? true : false;
}

const generateNodes = () => {
    const nodes = [];
    for (let i = 0; i <= 10; i++) {
        Graph.addNode(i);
        nodes.push({ id: i});
    }
    return nodes;
}

const generateLinks = (qtdLinks) => {
    const min = 0;
    const links = [];
    let qtd = qtdLinks;

    generateNodes();

    while (qtd--) {
        const node1 = randomIntFromInterval(min, 10);
        let node2 = randomIntFromInterval(min, 10);

        if (node1 === node2) node2 = randomIntFromInterval(min, 10);

        if (!alreadyExists(links, node1, node2) || links.length === 0) {
            links.push({ target: node1, source: node2 });
            Graph.addLink(node1, node2);
        }
    }

    return links
}

export default {
    generateNodes,
    generateLinks,
}