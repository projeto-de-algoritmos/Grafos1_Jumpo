const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const alreadyExists = (links, node1, node2) => {
    console.log(node1, node2)

    const found = links.find((link) => {
        if(link.target == node1 && link.source == node2)
            return true;
        else if (link.target == node2 && link.source == node1)
            return true;
        return false
    });

    return found ? true : false
}

const generateNodes = (qtdNodes) => {
    const nodes = []

    for (let i = 0; i < qtdNodes; i ++){
        nodes.push(i)
    }

    return nodes
}

const generateLinks  = (qtdLinks, qtdNodes) => {
    const min = 0
    const links = []

    while(qtdLinks--){
        const node1 = randomIntFromInterval(min, qtdNodes);
        let node2 = randomIntFromInterval(min, qtdNodes);
    
        if (node1 === node2) node2 = randomIntFromInterval(min, qtdNodes);

        if(!alreadyExists(links, node1, node2) || links.length == 0) links.push({target:node1, source:node2})
    }

    return links
}

export default {
    generateNodes,
    generateLinks,
}