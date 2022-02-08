import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import graphGenerator from './components/Graph/graphGenerator'
import GraphModel from './components/Graph/Graph'


class App extends Component {
  constructor(props) {
    super(props);
    
    const currentGraph = new GraphModel(100);
    const nodes = this.generateNodes(currentGraph);
    const object = this.generateLinks(currentGraph, 200);

    this.state = {
      currentGraph: currentGraph,
      shortestPath: false,
      showGraph: false,
      object: object,
      nodes: nodes,
      firstNode: 0,
      lastNode: 0
    };
  }

  generateNodes = (graph) => {
    const nodes = [];
    for (let i = 0; i <= 100; i++) {
      graph.listAdj.set(i, []);
      nodes.push({ id: i });
    }

    return nodes;
  }


  generateLinks = (graph, qtdLinks) => {
    const min = 0;
    const links = [];
    let qtd = qtdLinks;


    while (qtd--) {
      const node1 = graphGenerator.randomIntFromInterval(min, 100);
      let node2 = graphGenerator.randomIntFromInterval(min, 100);

      if (node1 === node2) node2 = graphGenerator.randomIntFromInterval(min, 100);

      if (links.length === 0 || !graphGenerator.alreadyExists(links, node1, node2)) {
        links.push( { target: node1, source: node2 } );
        graph.addLink(node1, node2);
      }
    }

    return links
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.state.currentGraph.shortestPathBFS(this.state.firstNode, this.state.lastNode);
  };

  render() {
    return (
      <>
        {!this.state.showGraph ?
          <div>
            <div className="cover">
              <h1 className="cover-title">Grafos 1</h1>
              <span className="cover-text">
                Micaella Gouveia de Lima 17/0111288
              </span>
              <span className="cover-text">
                Sofia Costa Patrocínio 17/0114333
              </span>
            </div>
            <div className="action">
              <button className="graph-button" type="button" onClick={() => this.setState({ showGraph: true })}>
                Gerar Grafo
              </button>
            </div>
          </div> : null
        }
        {this.state.showGraph ?
          <div className="graph">
            <div className='action'>
              <InteractiveForceGraph
                simulationOptions={{ height: 500, width: 500 }}
              // onSelectNode={(node) => console.log(node)}
              >
                {this.state.nodes.map(node => (
                  <ForceGraphNode
                    key={node.id}
                    node={node}
                    fill="red"
                  />
                ))}
                {this.state.object.map(r => (
                  <ForceGraphLink link={{ source: r.source, target: r.target }} />
                ))}
              </InteractiveForceGraph>
            </div>
            <div className="action">
              {/* <button className="graph-button mrg-right-10" type="button" onClick={this.generateNewGraph}>
                Gerar Novo Grafo
              </button> */}
              <button className="graph-button mrg-right-10" type="button" onClick={() => this.setState({ shortestPath: true })}>
                Achar Menor Caminho
              </button>
              <button className="graph-button mrg-right-10" type="button" onClick={() => this.setState({ showGraph: true })}>
                Busca por Profundidade
              </button>
            </div>
            {this.state.shortestPath ?
              <div>
                <form onSubmit={this.onSubmit}>
                  <div className="node">
                    <label htmlFor="firstNode">Nó Inicial</label>
                    <input type="number" className="node-input" onChange={(e) => this.setState({ firstNode: e.target.value })}>
                    </input>
                    <label htmlFor="lastNode">Nó Final</label>
                    <input type="number" className="node-input" onChange={(e) => this.setState({ lastNode: e.target.value })}>
                    </input>
                  </div>
                  <div className="action">
                    <button className="graph-button mrg-top-20" type="submit">
                      Buscar
                    </button>
                  </div>
                </form>
              </div>
              : null
            }
          </div> : null
        }
      </>
    );
  }
}
export default App;