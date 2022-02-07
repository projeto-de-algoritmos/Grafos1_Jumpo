class Graph {
    constructor(node) {
        this.node = node;
        this.listAdj = new Map();
        this.links = 0;
    }

    getGraph() {
        return this.Graph;
    }

    addNode(v) {
        this.listAdj.set(v, []);
    }

    addLink(vertex, node) {
        this.listAdj.get(vertex).push(node);
        this.listAdj.get(node).push(vertex);
        this.links++;
    }

    BFS(firstNode, lastNode) {
        const nodesQueue = [];
        const visited = new Map();

        visited[firstNode] = true;
        nodesQueue.push(firstNode);

        while (nodesQueue.length) {
            const vertex = nodesQueue.shift();
            console.log("VERTEX -> ", vertex);

            if (vertex == lastNode) return true;


            const vertexList = this.listAdj.get(vertex);

            for (let node in vertexList) {
                if (!visited[vertexList[node]]) {
                    visited[vertexList[node]] = true;
                    nodesQueue.push(vertexList[node]);
                }
            }
        }

        return false;
    }

    shortestPathBFS(firstNode, lastNode) {
        const nodesQueue = [firstNode];

        const visited = new Map();
        visited[firstNode] = true;

        const links = new Map();
        links[firstNode] = 0;

        const previous = new Map();
        previous[firstNode] = null;


        const shortestPath = () => {
            const pathStack = [lastNode];

            let node = previous[lastNode];

            while (node != firstNode) {
                pathStack.push(node);
                node = previous[node];
            }
            pathStack.push(firstNode);

            // return shortest path
            return pathStack.reverse().join(' > ');

        }


        while (nodesQueue.length) {
            const vertex = Number(nodesQueue.shift());

            if (vertex != lastNode) {
                const vertexList = this.listAdj.get(vertex);

                for (let node in vertexList) {
                    const vNode = vertexList[node];

                    if (!visited[vNode]) {
                        // set as visited
                        visited[vNode] = true;

                        // add on queue
                        nodesQueue.push(vNode);

                        // add link
                        links[vNode] = links[vertex] + 1;

                        // set previous path
                        previous[vNode] = vertex;
                    }
                }
            }
            else {
                return {
                    distance: links[lastNode],
                    path: shortestPath()
                };
            }
        }

        return false;
    }

    DFS(node) {
        const visited = new Map();
        this.searchDFS(node, visited);
        return visited;
    }

    searchDFS(node, visited) {
        visited[node] = true;

        const nearby = this.listAdj.get(node);

        for (let i in nearby) {
            if (!visited[nearby[i]])
                this.searchDFS(nearby[i], visited);
        }
    }
}


export default new Graph(1000);