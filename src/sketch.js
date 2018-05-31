let p5 = require('p5');
let randomGraph = require('./struct/index');

let sketch = new p5(function(s) {
  // Define constant variables
  const graphSize = 30;
  const kConnections = 4;
  const colors = {
    "rgbNode": s.color(0, 0, 0, 255),
    "rgbEdge": s.color(0, 0, 0, 100)
  };

  // Make graph callable to both setup() and draw()
  let graph = {};

  s.setup = function() {
    let canvasDims = {
      "width": document.documentElement.clientWidth,
      "height": document.documentElement.clientHeight
    };
    let canvas = s.createCanvas(canvasDims.width, canvasDims.height);
    canvas.parent('sketch-holder')
    graph = new randomGraph(
      s,
      graphSize,
      kConnections,
      canvasDims,
      colors
    );
  };

  s.draw = function() {
    s.background(255);
    graph.render();
  };

  s.windowResized = function() {
    seedEnvironment();
  };
});

module.exports = sketch;