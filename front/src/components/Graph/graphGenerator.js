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

export default {
    randomIntFromInterval,
    alreadyExists
}