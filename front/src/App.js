import React, { Component, useState } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import Graph from './components/Graph/graphGenerator'

const object = Graph.generateLinks(5);
const nodes = Graph.generateNodes();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraph: false
    };
  }

  render() {
    return (
      <>
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
        {this.state.showGraph ?
          <div className="action">
            <InteractiveForceGraph
              simulationOptions={{ height: 300, width: 300 }}
            >
              {nodes.map(node => (
                <ForceGraphNode
                  key={node.id}
                  node={node}
                  fill="red"
                />
              ))}
              {object.map(r => (
                <ForceGraphLink link={{ source: r.source, target: r.target }} />
              ))}
            </InteractiveForceGraph>
          </div> : null
        }
      </>
    );
  }
}

export default App;
