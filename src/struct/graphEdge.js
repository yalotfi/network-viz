class graphEdge {
  constructor(sketch, n0, n1, maxDist, color) {
    this.s = sketch  // Take p5 object
    this.edgeDefinition = [n0.idx, n1.idx]  // Store the connected indexes
    this.edgeDistance = n0.distanceFrom(n1);  // Store effective strength of the connection
    this.node0 = n0;  // First node object
    this.node1 = n1;  // Second node object
    this.edgeWeight = 3;  // Constant - thickness of the Edge
    this.maxDist = maxDist  // Maximum distance used to determine alpha value of the Edge
    this.color = color  // p5 color object

    // Update each node's connection tracker
    this.node0.connections.push(this.node1.idx);
    this.node1.connections.push(this.node0.idx);
  }

  show() {
    let alphaScaled = this.normalizeAlpha(100, 100);
      this.s.stroke(this.color);
      this.s.strokeWeight(this.edgeWeight);
      this.s.line(this.node0.coordinates.x, this.node0.coordinates.y,
                  this.node1.coordinates.x, this.node1.coordinates.y);
  }

  normalizeAlpha(a, b) {
    // Normalize alpha by the min and max distances
    let minX = 0;
    let maxX = 300;
    // let maxX = this.maxDist;
    return (b - a) * (this.edgeDistance - minX) / (maxX - minX) + a;
  }
}

module.exports = graphEdge;