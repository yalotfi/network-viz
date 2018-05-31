let graphEdge = require('./graphEdge');
let graphNode = require('./graphNode');

class randomGraph {
  constructor(sketch, size, kEdges, canvasDims, colors) {
    this.s = sketch;  // Take a p5 object
    this.graphSize = size;  // Store graph size as attribute
    this.k = kEdges  // Number of edges each node has
    this.canvasDims = canvasDims  // Defines width and height of canvas
    this.colorScheme = colors  // Define the color pallete of the graph
    this.maxDist = 0;  // Stores the maximum distance between seeded nodes

    // Seed nodes - 1D array of Node objects
    this.nodeSet = this.seedNodes(this.dims);
    // Store distances between nodes - 2D array of floats
    this.distanceMatrix = this.getDistances();
    // Store indexes of the k-nearest nodes - 2D array of ints
    this.edgeMatrix = this.getNearestNodes();
    // Seed edges - 1D array of Edge objects
    this.edgeSet = this.seedEdges();  // Seed edges
  }

  render() {
    this.nodeSet.forEach(node => {
      node.show();
      node.move();
    });
    this.edgeSet.forEach(edge => {
      edge.show();
    });
  }

  seedNodes() {
    const s = this.s;
    const nodes = [];
    for (let i = 0; i < this.graphSize; i++) {
      let randomX = s.floor(s.random(0, this.canvasDims.width));
      let randomY = s.floor(s.random(0, this.canvasDims.height));
      let node = new graphNode(
        s,
        randomX,
        randomY,
        i,
        this.canvasDims,
        this.colorScheme.rgbNode
      );
      nodes.push(node);
    }
    return nodes;
  }

  seedEdges() {
    const edges = [];
    for (let i = 0; i < this.graphSize; i++) {
      let node0 = this.nodeSet[i];  // Pull the i-th Node object
      for (let j = 0; j < this.k; j++) {
        // Pull the j-th Node relative to the i-th based on the Edge Matrix
        let node1 = this.nodeSet[this.edgeMatrix[i][j]];

        // Create an edge if one does not currently exist
        if (!this.edgeExists(node0, node1)) {
          let edge = new graphEdge(
            this.s,
            node0,
            node1,
            this.maxDist,
            this.colorScheme.rgbEdge
          );
          edges.push(edge);
        }
      }
    }
    return edges
  }

  edgeExists(n0, n1) {
    // Identify if an edge already connects two nodes.
    const one2two = n0.connections.includes(n1.idx);
    const two2one = n1.connections.includes(n0.idx);
    return one2two && two2one ? true : false;
  }

  getNearestNodes() {
    /*
    Return a 2D array wherein each row, column index pair represents an edge in
    the graph. As such, this matrix is of shape (graphSize, k). Note, the values
    map to the Node's index in the NodeSet.
    */
    const allNearestNodes = [];
    for (let i = 0; i < this.graphSize; i++) {
      // Consider distance of the i-th node to every other node
      let distances = this.distanceMatrix[i]

      // Pull the k-nearest distances
      let kNearestDistances = (Array.from(distances)
                                    // Sort in-place so copy to preserve indexes
                                    .sort((a, b) => a - b)
                                    // Don't treat numbers as strings
                                    .slice(1, this.k + 1));
                                    // Closest node will always be itself
      let kNearestNodes = [];
      for (let j = 0; j < this.k; j++) {
        // Pull the index of the nearest node
        let idxNode = distances.indexOf(kNearestDistances[j]);
        // Insert at position j of the inner array
        kNearestNodes.push(idxNode);
      }
      allNearestNodes.push(kNearestNodes);  // Add row to the matrix
    }
    return allNearestNodes;
  }

  getDistances() {
    /*
    Create a 2D array containing distances between every node. It is a
    symmetrical, square matrix of shape (graphSize, graphSize). The diagonal
    indexes should be 0, representing the distance between a node and itself.
    */
    const distances = [];
    for (let i = 0; i < this.graphSize; i++) {
      let thisNode = this.nodeSet[i];
      let distancesToThisNode = [];
      for (let j = 0; j < this.graphSize; j++) {
        let otherNode = this.nodeSet[j];
        let d = thisNode.distanceFrom(otherNode);
        distancesToThisNode.push(d);
        if (d > this.maxDist) {
          this.maxDist = d;
        }
      }
      distances.push(distancesToThisNode);
    }
    return distances;
  }
}

module.exports = randomGraph;
