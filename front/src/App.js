import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import graphGenerator from './components/Graph/graphGenerator'
import Graph from './components/Graph/Graph'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortestPath: false,
      showGraph: false,
      object: graphGenerator.generateLinks(200),
      nodes: graphGenerator.generateNodes(),
      firstNode: 0,
      lastNode: 0
    };
  }

  generateNewGraph = () => {
    this.setState(() => ({ object: graphGenerator.generateLinks(200) }));
    this.setState(() => ({ nodes: graphGenerator.generateNodes() }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    Graph.shortestPathBFS(this.state.firstNode, this.state.lastNode);
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
              <button className="graph-button mrg-right-10" type="button" onClick={this.generateNewGraph}>
                Gerar Novo Grafo
              </button>
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
                    <input type="number" className="node-input" onChange={(e) => this.setState({firstNode: e.target.value})}>
                    </input>
                    <label htmlFor="lastNode">Nó Final</label>
                    <input type="number" className="node-input" onChange={(e) => this.setState({lastNode: e.target.value})}>
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