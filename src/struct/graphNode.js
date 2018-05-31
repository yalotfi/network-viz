class graphNode {
  constructor(sketch, x, y, idx, canvasDims, color) {
    // Attributes common to all Node objects
    this.s = sketch  // Take a p5 object
    this.r = 6;  // Node radius
    this.maxSpeed = 0.05;  // Node speed
    this.canvasDims = canvasDims  // Canvas 2D dimensions
		this.color = color  // p5 color object

    // Attributes unique to each Node instance
    this.startCoords = this.s.createVector(x, y);  // Start coordinates of node
    this.coordinates = this.s.createVector(x, y);  // Position of Node in 2D space
    this.idx = idx;  // Index of this Node
    this.connections = [];  // Store indexes of connected nodes
    this.velocity = this.s.createVector(  // Set velocity of a Node as a vector
      this.s.random(-this.maxSpeed, this.maxSpeed),
      this.s.random(-this.maxSpeed, this.maxSpeed)
    );
  }

  show() {
    // Draw the node.
    this.s.noStroke();
    this.s.fill(this.color);
    this.s.ellipse(this.coordinates.x, this.coordinates.y, this.r * 2);
  }

  move() {
    // Adds motion to the Node
    this.coordinates.add(this.velocity);
    if (this.atEdgeX() || this.atEdgeY() || this.strayTooFar()) {
      this.bounce();
    }
  }

  bounce() {
    this.velocity.mult(-1);
  }

  atEdgeX() {
    const xpos = this.coordinates.x;
    return xpos <= this.r || xpos >= this.canvasDims.width - this.r;
  }

  atEdgeY() {
    const ypos = this.coordinates.y;
    return ypos <= this.r || ypos >= this.canvasDims.height - this.r;
  }

  strayTooFar() {
    return this.coordinates.dist(this.startCoords) > 5;
  }

  distanceFrom(otherNode) {
    // Return the Euclidean distance between two node objects
    return this.s.dist(this.coordinates.x, this.coordinates.y,
                       otherNode.coordinates.x, otherNode.coordinates.y);
  }
}

module.exports = graphNode;