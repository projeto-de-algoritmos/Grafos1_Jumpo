class Graph {
    constructor(node) {
        this.node = node;
        this.listAdj = new Map();
    }

    getGraph(){
        return this.Graph;
    }
    addNode(v) {
        this.listAdj.set(v, []);
    }

    addLink(vertex, node) {
        this.listAdj.get(vertex).push(node);
        this.listAdj.get(node).push(vertex);
    }

    BFS(firstNode) {
        const nodesQueue = [];
        const visited = new Map();

        visited[firstNode] = true;
        nodesQueue.push(firstNode);

        while (!nodesQueue.isEmpty()) {
            const vertex = nodesQueue.shift();
            const nodesVertex = this.listAdj.get(vertex);

            for (let node in nodesVertex) {
                if (!visited[nodesVertex[node]]) {
                    visited[nodesVertex[node]] = true;
                    nodesQueue.push(nodesVertex[node]);
                }
            }
        }
    }
}


export default new Graph(1000)