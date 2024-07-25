var width = 1000;
var height = 1000;
var margin = 30;

var canvas = d3
  .select("#canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "lightgrey");

d3.json("tempature.json").then(function (data) {
  console.log("Entire Data Object:", data);

  // Extract the relevant data
  var waterData = [];
  var yearData = [];
  Object.keys(data).forEach(function (key) {
    var value = data[key];
    yearData = d3.map(data, (d) => d.name);

    if (Array.isArray(value.data)) {
      waterData = value.data.filter((d) => typeof d == "number");
    }
  });

  console.log("Filtered Waterdata Array:", waterData);
  console.log("years", yearData);
  // Get the last data point
  var lastDataPoint = waterData[waterData.length - 1];
  console.log("Last Data Point:", lastDataPoint);

  // Sort array lowest -> highest
  //waterData.sort(d3.ascending);

  // Compute min and max for scaling
  var minWater = d3.min(waterData);
  var maxWater = d3.max(waterData);
  var waterScale = d3
    .scaleLinear()
    .domain([0, waterData.length - 1])
    .range([margin, width - margin]);

  //minWater will be a radius of 1 and maxWater will be 20 by the range
  var radScale = d3.scaleLinear().domain([minWater, maxWater]).range([1, 20]);

  draw(waterData, waterScale, radScale);
});

function draw(waterData, waterScale, radScale) {
  canvas
    .selectAll("circle")
    .data(waterData)
    .join("circle")
    .attr("cx", function (d, i) {
      return waterScale(i); // Use index i for x position
    })
    .attr("cy", height / 2)
    .attr("r", function (d) {
      return radScale(d); // Use radScale for radius
    })
    .attr("fill", "blue")
    .attr("stroke", "white");
}
