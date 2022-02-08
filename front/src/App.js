import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import Graph from './components/Graph/graphGenerator'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraph: false,
      object: Graph.generateLinks(200),
      nodes: Graph.generateNodes()
    };
  }
  generateNewGraph = () => {
    this.setState(() => ({ object: Graph.generateLinks(200)}));
    this.setState(() => ({ nodes: Graph.generateNodes()}));
  }
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
              <button className="graph-button mrg-right-10" type="button" onClick={() => this.setState({ showGraph: true })}>
                Achar Menor Caminho
              </button>
              <button className="graph-button mrg-right-10" type="button" onClick={() => this.setState({ showGraph: true })}>
                Busca por Profundidade
              </button>
            </div>
          </div> : null
        }
      </>
    );
  }
}
export default App;