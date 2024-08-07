var width = 1200;
var height = 900;
var margin = 30;
var baselineY = 200; // Define the baseline y position

var canvas = d3
  .select("#canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "#87CEEB");

d3.json("iceberg_mass.json").then(function (data) {
  console.log("Entire Data Object:", data);

  iceYears = [];

  // Create array with distinct years
  var iceYears = Array.from(new Set(data.map((d) => Math.floor(d.yearIce))));
  console.log("Distinct years: ", iceYears);

  // Group the data by year
  const groupedData = data.reduce((acc, d) => {
    const year = Math.floor(d.yearIce);
    if (!acc[year]) {
      acc[year] = { sum: 0, count: 0 };
    }
    acc[year].sum += d.mass;
    acc[year].count += 1;
    return acc;
  }, {});

  // Calculate the average mass for each year
  const averageMassPerYear = Object.keys(groupedData).map((year) => {
    return {
      year: +year,
      averageMass: groupedData[year].sum / groupedData[year].count,
    };
  });

  console.log("averagemassYear: ", averageMassPerYear);

  // append the data to the iceDataMass array
  var iceDataMass = averageMassPerYear.map((d) => +d.averageMass);

  console.log("Mass of ice data: ", iceDataMass);

  defineGradientInnerIceberg(); // Define the gradient before drawing the graph
  defineGradientOuterIceberg();
  headLine();

  // first drawn text slider at 2001
  canvas
    .append("text")
    .attr("x", 556) // Set the x position
    .attr("y", 830) // Set the y position
    .attr("fill", "black")
    .style("font-size", "30px")
    .style("font-family", "Source Code Pro")
    .text(`${2001}`);

  dataFrom();
  canvas
    .append("text")
    .attr("x", 135) // Set the x position
    .attr("y", 214) // Set the y position
    .attr("fill", "black")
    .style("font-size", "20px")
    .style("font-family", "Source Code Pro")
    .text(`Varying mass of the iceberg:`);

  waterDrop();
  waterDropText();
  iceberg();
  happyPenguin();
  bouble();
  thermometer();
  // slider uses the mass from the iceberg to determine the slider values
  slider(iceDataMass);
  drawCircle();

  drawGraph(iceDataMass, "white", 0, 1, "none");
  drawGraph(iceDataMass, "lightblue", 30, 0.5, "none");
  drawWaves(22, 6);
  // Make bulb thermometer (empty), white fill buttom
  canvas
    .append("circle")
    .attr("r", 20)
    .attr("cx", 80 + 200 / 2)
    .attr("cy", 355 + 290)
    .style("fill", "#F1F1F1")
    .style("stroke", "#F1F1F1")
    .style("stroke-width", 1 + "px");
});

function headLine() {
  canvas
    .append("text")
    .attr("x", 70) // Set the x position
    .attr("y", 100) // Set the y position
    .attr("fill", "black")
    .style("font-size", "28px")
    .style("font-weight", "bold")
    .style("font-family", "Source Code Pro")
    .text("What happens to the icebergs when the seas change temperature?");
}

function dataFrom() {
  canvas
    .append("text")
    .attr("x", 750) // Set the x position
    .attr("y", 870) // Set the y position
    .attr("fill", "black")
    .style("font-size", "8px")
    .style("font-family", "Source Code Pro")
    .text(
      `Sea temperature from the climatereanalyzer: https://climatereanalyzer.org/clim/sst daily/`
    );

  canvas
    .append("text")
    .attr("x", 750) // Set the x position
    .attr("y", 885) // Set the y position
    .attr("fill", "black")
    .style("font-size", "8px")
    .style("font-family", "Source Code Pro")
    .text(
      `Mass of the iceberg from Nasa: https://climate.nasa.gov/vital-signs/ice-sheets/?intent=121`
    );
}

// iceberg image
function iceberg() {
  canvas
    .append("image")
    .attr("xlink:href", "iceberg.png") // Path to local image
    .attr("x", 70) // x position
    .attr("y", 190) // y position
    .attr("width", 30) // width of the image
    .attr("height", 30); // height of the image
}

// waterdrop image
function waterDrop() {
  canvas
    .append("image")
    .attr("xlink:href", "water.png") // Path to local image
    .attr("x", 70) // x position
    .attr("y", 150) // y position
    .attr("width", 30) // width of the image
    .attr("height", 30); // height of the image
}

function waterDropText() {
  canvas
    .append("text")
    .attr("class", "textWater")
    .attr("x", 134) // Set the x position
    .attr("y", 172) // Set the y position
    .attr("fill", "black")
    .style("font-size", "20px")
    .style("font-family", "Source Code Pro")
    .text(`Sea temperature:`);
}

function happyPenguin() {
  canvas
    .append("image")
    .attr("xlink:href", "Pengo_happy.png") // Path to local image
    .attr("x", 910) // x position
    .attr("y", 520) // y position
    .attr("width", 100) // width of the image
    .attr("height", 100); // height of the image
}

function neutralPenguin() {
  canvas
    .append("image")
    .attr("class", "neutralPeng")
    .attr("xlink:href", "Pengo_neutral.png") // Path to local image
    .attr("x", 910) // x position
    .attr("y", 520) // y position
    .attr("width", 100) // width of the image
    .attr("height", 100); // height of the image
}

function sadPenguin() {
  canvas
    .append("image")
    .attr("class", "neutralPeng")
    .attr("xlink:href", "Pengo_sad.png") // Path to local image
    .attr("x", 910) // x position
    .attr("y", 520) // y position
    .attr("width", 100) // width of the image
    .attr("height", 100); // height of the image
}

var hidden = "hidden";
var visible = "visible";
var vis = false;

function bouble() {
  hid = hidden;
  var bouble = canvas
    .append("image")
    .attr("xlink:href", "speakingBouble.png") // Path to your local image
    .attr("class", `bouble`)
    .attr("x", 940) // x position
    .attr("y", 360) // y position
    .attr("width", 150) // width of the image
    .attr("height", 150) // height of the image
    .style("visibility", hidden);

  var textElement = canvas
    .append("text")
    .attr("x", 1050) // Set the x position
    .attr("y", 430) // Set the y position
    .attr("fill", "black")
    .style("font-size", "10px")
    .style("font-weight", "bold")
    .style("opacity", 0); // Start with opacity 0

  switch (sliderValue) {
    case 0:
      var textFirst = "2001 is the year";
      var text2First = "with the coldest";
      var text3First = "sea temperature";
      textElement
        .append("tspan")
        .attr("x", 962)
        .attr("y", 405)
        .text(textFirst)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 962)
        .attr("y", 420)
        .text(text2First)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 962)
        .attr("y", 435)
        .text(text3First)
        .style("font-family", "Source Code Pro");
      bouble.style("visibility", visible);

      textElement
        .transition() // Start a transition
        .duration(1000) // Transition duration in milliseconds
        .style("opacity", 1) // End with opacity 1
        .on("end", function () {});
      break;
      break;

    case 1:
      text = "2002 is the only";
      text2 = "year where the";
      text3 = "ice on the South ";
      text4 = "Pole is growing";
      textElement
        .append("tspan")
        .attr("x", 965)
        .attr("y", 400)
        .text(text)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 965)
        .attr("y", 415)
        .text(text2)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 965)
        .attr("y", 430)
        .text(text3)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 965)
        .attr("y", 445)
        .text(text4)
        .style("font-family", "Source Code Pro");
      bouble.style("visibility", visible);

      textElement
        .transition() // Start a transition
        .duration(1000) // Transition duration in milliseconds
        .style("opacity", 1) // End with opacity 1
        .on("end", function () {});
      break;

    case 9:
      text = "The ice on the";
      text2 = "South Pole decreases";
      text3 = "rapidly";
      textElement
        .append("tspan")
        .attr("x", 962)
        .attr("y", 405)
        .text(text)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 962)
        .attr("y", 420)
        .text(text2)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 962)
        .attr("y", 435)
        .text(text3)
        .style("font-family", "Source Code Pro");

      bouble.style("visibility", visible);

      textElement
        .transition() // Start a transition
        .duration(1000) // Transition duration in milliseconds
        .style("opacity", 1) // End with opacity 1
        .on("end", function () {});
      break;

    case 15:
      text = "The iceberg melts";
      text2 = "and the sea";
      text3 = "temperature rises";
      textElement
        .append("tspan")
        .attr("x", 962)
        .attr("y", 405)
        .text(text)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 962)
        .attr("y", 420)
        .text(text2)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 962)
        .attr("y", 435)
        .text(text3)
        .style("font-family", "Source Code Pro");

      bouble.style("visibility", visible);

      textElement
        .transition() // Start a transition
        .duration(1000) // Transition duration in milliseconds
        .style("opacity", 1) // End with opacity 1
        .on("end", function () {});
      break;
    case 23:
      var textLast = "A total of 2631";
      var text2Last = "gigatonnes of ice";
      var text3Last = "has been lost at";
      var text4Last = "the South Pole";
      var text5Last = "since 2001";
      textElement
        .append("tspan")
        .attr("x", 965)
        .attr("y", 397)
        .text(textLast)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 965)
        .attr("y", 412)
        .text(text2Last)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 965)
        .attr("y", 427)
        .text(text3Last)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 965)
        .attr("y", 442)
        .text(text4Last)
        .style("font-family", "Source Code Pro");
      textElement
        .append("tspan")
        .attr("x", 965)
        .attr("y", 457)
        .text(text5Last)
        .style("font-family", "Source Code Pro");
      bouble.style("visibility", visible);

      textElement
        .transition() // Start a transition
        .duration(1000) // Transition duration in milliseconds
        .style("opacity", 1) // End with opacity 1
        .on("end", function () {
          //bouble.style("visibility", hidden); // Hide the bubble after text fades out
          //textElement.remove();
        });
      break;
    default:
      bouble.style("visibility", hidden);
      textElement.remove();
  }
}

var cy = 500;
function drawCircle() {
  // Define the gradient
  var gradient = canvas
    .append("svg:defs")
    .append("radialGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "30%")
    .attr("y2", "30%")
    .attr("spreadMethod", "pad");

  // Define the gradient colors
  gradient
    .append("svg:stop")
    .attr("offset", "10%")
    .attr("stop-color", "orange")
    .attr("stop-opacity", 0.6);

  gradient
    .append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "#FFE500")
    .attr("stop-opacity", 0.01);

  // Fill the circle with the gradient
  canvas
    .append("circle")
    .attr("cx", width / 2)
    .attr("cy", cy)
    .attr("r", 350)
    .attr("fill", "url(#gradient)");
}

// Sample data with spikes, this is the default height og the ice spikes
var spikeHeight = 60;
var spikeTop = 0;
var currentIndex = 0;
function drawGraph(iceDataMass, color, iceHeight, opacity, stroke) {
  // Adjust spike height to ensure it doesn't go below the baseline
  if (spikeHeight - iceHeight - 20 <= 6.92) {
    spikeHeight = 6.92 + 50;
  }

  // Data for the path (iceberg), only the spike height changes
  var data = [
    { x: 4, y: 5 },
    { x: 5, y: spikeHeight - iceHeight - spikeTop },
    { x: 6, y: spikeHeight - 15 - iceHeight },
    { x: 7, y: spikeHeight + 30 - iceHeight - spikeTop },
    { x: 8, y: spikeHeight - 20 - iceHeight },
    { x: 9, y: spikeHeight - iceHeight - spikeTop },
    { x: 10, y: 5 },
  ];

  // Set up scales hardcoded
  var x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.x))
    .range([300, width - 300]);

  var y = d3.scaleLinear().domain([-50, 100]).range([height, 220]);

  // Set up line generator
  var line = d3.line();

  // Set up area generator for iceberg
  var area = d3
    .area()
    .x((d) => x(d.x))
    .y1((d) => y(d.y))
    .y0(y(5)); // Base of the area

  // Append the path for the line
  canvas
    .append("path")
    .datum(data)
    .attr(
      "fill",
      color === "lightblue" ? "url(#blueGradient)" : "url(#blueGradient2)"
    )
    .attr("opacity", opacity) // Different opacities for visibility
    .attr("class", `ice ${color}`) // Class with color name to avoid conflicts
    .attr("stroke", stroke)
    .attr("stroke-width", 1.5)
    .attr("d", line)
    .attr("d", area);
}

function drawWaves(waveHeight, waveLow) {
  // path for the waves
  var data = [
    { x: 2, y: waveLow },
    { x: 4, y: waveHeight },
    { x: 6, y: waveLow },
    { x: 8, y: waveHeight },
    { x: 10, y: waveLow },
    { x: 12, y: waveHeight },
    { x: 14, y: waveLow },
    { x: 16, y: waveHeight },
    { x: 18, y: waveLow },
    { x: 20, y: waveHeight },
    { x: 22, y: waveLow },
    { x: 24, y: waveHeight },
    { x: 26, y: waveLow },
    { x: 28, y: waveHeight },
    { x: 30, y: waveLow },
  ];

  // Set up scales hardcoded
  var x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.x))
    .range([100, width - 100]);

  var y = d3
    .scaleLinear()
    .domain([-80, 140])
    .range([height + 100, 155]);

  // Set up line generator
  var line = d3.line();

  // Set up area generator
  var area = d3
    .area()
    .curve(d3.curveBasis)
    .x((d) => x(d.x))
    .y1((d) => y(d.y))
    .y0(y(6)); // Base of the area

  // Append the path for the line
  canvas
    .append("path")
    .datum(data)
    .attr("fill", "blue")
    .attr("opacity", 1) // Different opacities for visibility
    .attr("stroke", "none")
    .attr("stroke-width", 1.5)
    .attr("d", line)
    .attr("d", area);
}

var opacity = 0.5;
var previousSliderValue = 0;
var sliderValue = 0;

function slider(iceDataMass) {
  //updates the spikeheight starting from the first index to the next via the sliderValue which changes on sliding
  function icebergSpikes() {
    // Calculate the cumulative sum of iceDataMass up to sliderValue
    var sum = d3.sum(iceDataMass.slice(0, sliderValue + 1));
    console.log("sum", sum);
    return sum / 900; // Adjust this divisor as needed
  }

  // input changes the iceberg
  d3.select("#slider")
    // .style("position", "absolute") // Ensure positioning is enabled
    .style("-webkit-appearance", "none")
    .style("left", "100px") // Adjust left position
    .style("top", "970px") // Adjust top position if needed
    .style("width", "1000px")
    .style("height", "1px")
    .style("background", "black") // Set the background color
    .style("color", "black") // Set the color to black
    .style("outline", "none") // Remove outline
    .style("opacity", "1") // Set opacity
    .property("min", 0) // Set the minimum slider value
    .property("max", 23) // Set the maximum slider value
    .property("value", 0) // Set the initial slider value
    .on("input", function () {
      spikeHeight = 60;
      mainSpikeHeigh = spikeHeight;
      var currentValue = +this.value;

      // Calculate the year based on the slider value
      var year = 2001 + currentValue; // Adjusted to start from 2001

      // Calculate the opacity directly based on the slider value
      var sliderMaxValue = d3.select("#slider").property("max"); // Assuming the slider has a 'max' attribute
      var sliderMinValue = d3.select("#slider").property("min"); // Assuming the slider has a 'min' attribute
      var opacityRange = [0.5, 1]; // Desired opacity range

      // Map the slider value to the opacity range
      var opacity = d3
        .scaleLinear()
        .domain([sliderMinValue, sliderMaxValue])
        .range(opacityRange)(-currentValue);
      console.log("current value ", currentValue);

      // Clear previous text
      canvas.selectAll("text").remove(); // removes text for next time to be drawn for each input
      dataFrom();
      waterDropText();
      // Update the text message with the current year
      canvas
        .append("text")
        .attr("x", 556) // Set the x position
        .attr("y", 830) // Set the y position
        .attr("fill", "black")
        .style("font-size", "30px")
        .style("font-family", "Source Code Pro")
        .text(`${year}`);

      headLine();
      update(currentValue);
      spikeHeight += icebergSpikes(); // Update spike height
      var text1 = `Varying mass of the iceberg: ${parseFloat(
        iceDataMass[sliderValue]
      ).toFixed(2)} Gt`;
      var text2 = "Varying mass of the iceberg:";

      if (sliderValue == 0) {
      }
      canvas
        .append("text")
        .attr("x", 135) // Set the x position
        .attr("y", 214) // Set the y position
        .attr("fill", "black")
        .style("font-size", "20px")
        .style("font-family", "Source Code Pro")
        .text(sliderValue === 0 ? text2 : text1);

      clearGraph();
      if (
        sliderValue == 6 ||
        sliderValue == 7 ||
        sliderValue == 8 ||
        sliderValue == 9 ||
        sliderValue == 10 ||
        sliderValue == 11 ||
        sliderValue == 12 ||
        sliderValue == 13
      ) {
        neutralPenguin();
      }

      if (
        sliderValue == 14 ||
        sliderValue == 15 ||
        sliderValue == 16 ||
        sliderValue == 17 ||
        sliderValue == 18 ||
        sliderValue == 19 ||
        sliderValue == 20 ||
        sliderValue == 21 ||
        sliderValue == 22 ||
        sliderValue == 23
      ) {
        sadPenguin();
      }

      bouble(hidden);
      thermometer();
      drawGraph(iceDataMass, "white", 0, 1, "none");
      drawGraph(iceDataMass, "lightblue", 30, opacity, "none");
      drawWaves(22, 6);

      // Make bulb thermometer (empty), white fill
      canvas
        .append("circle")
        .attr("r", 20)
        .attr("cx", 80 + 200 / 2)
        .attr("cy", 355 + 290)
        .style("fill", "#F1F1F1")
        .style("stroke", "#F1F1F1")
        .style("stroke-width", 1 + "px");

      // Update the previous slider value
      previousSliderValue = currentValue;
      index = currentValue;
    });
}

function update(val) {
  console.log("Slider value:", val);
  sliderValue = val; // Directly set the global slider value to the current slider value
  console.log("the global value for slider ", sliderValue);
}
function clearGraph() {
  //Remove old graph elements
  canvas.selectAll("path").remove();
  canvas.selectAll(".spike").remove();
  canvas.selectAll(".axis").remove();
  canvas.selectAll(".bouble").remove();
  canvas.selectAll(".neutralPeng").remove();
}

//color for mountain
function defineGradientInnerIceberg() {
  // Define the gradient
  var gradient = canvas
    .append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "blueGradient")
    .attr("x1", "100%")
    .attr("y1", "30%")
    .attr("x2", "10%")
    .attr("y2", "10%") //adjust the icepeaks
    .attr("spreadMethod", "pad");

  // Define the gradient colors
  // Define the gradient colors
  gradient
    .append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "#00C2FF")
    .attr("stop-opacity", 1);

  gradient
    .append("svg:stop")
    .attr("offset", "30%")
    .attr("stop-color", "#D5F5FF")
    .attr("stop-opacity", 1);
}

//color for mountain
function defineGradientOuterIceberg() {
  // Define the gradient
  var gradient = canvas
    .append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", "blueGradient2")
    .attr("x1", "20%")
    .attr("y1", "100%")
    .attr("x2", "10%")
    .attr("y2", "20%") //adjust the icepeaks
    .attr("spreadMethod", "pad");

  // Define the gradient colors
  gradient
    .append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", "#00C2FF")
    .attr("stop-opacity", 1);

  gradient
    .append("svg:stop")
    .attr("offset", "70%")
    .attr("stop-color", "#D5F5FF")
    .attr("stop-opacity", 1);
}

// Initial setup for the thermometer
var index = 0;
// Function to update the thermometer with new data
var tempSea = 0;

function thermometer() {
  // Loading and processing data temperature json
  d3.json("temperature_sorted.json").then(function (dataTherm) {
    console.log("Entire Data Object:", dataTherm);

    // Compute min and max for scaling
    var dataMaxTemp = d3.max(dataTherm, (d) => d.average);
    var dataMinTemp = d3.min(dataTherm, (d) => d.average);

    // Setting up variables for the thermometer
    var thermometerWidth = 80;
    var thermometerHeight = 180;

    var bottomY = thermometerHeight - 5; // 175
    var topY = 155;
    var bulbRadius = 20;
    var tubeWidth = 21.5;
    var tubeBorderWidth = 1;
    var mercuryColour = "#D40000";
    var tubeBorderColour = "#F1F1F1";
    var tubeFillColour = "#F1F1F1";

    var bulb_cy = bottomY - bulbRadius + 200; // 455
    var bulb_cx = thermometerWidth / 2;
    var top_cy = topY + tubeWidth / 2;

    // Circle element for rounded tube tip
    canvas
      .append("circle")
      .attr("r", tubeWidth / 2)
      .attr("cx", thermometerWidth + 200 / 2)
      .attr("cy", top_cy + 290)
      .style("fill", tubeFillColour)
      .style("stroke", tubeBorderColour)
      .style("stroke-width", tubeBorderWidth + "px");

    // Rectangular element for the tube
    canvas
      .append("rect")
      .attr("x", thermometerWidth + 200 / 2 - tubeWidth / 2)
      .attr("y", top_cy + 290)
      .attr("height", bulb_cy - top_cy)
      .attr("width", tubeWidth)
      .style("shape-rendering", "crispEdges")
      .style("fill", tubeFillColour)
      .style("stroke", tubeBorderColour)
      .style("stroke-width", tubeBorderWidth + "px");

    // White fill for the rounded tube top circle element to hide the border at the top of the tube rect element
    canvas
      .append("circle")
      .attr("r", tubeWidth / 2 - tubeBorderWidth / 2)
      .attr("cx", thermometerWidth + 200 / 2)
      .attr("cy", top_cy + 290)
      .style("fill", tubeFillColour)
      .style("stroke", "none");

    // Rectangular element for tube fill colour
    canvas
      .append("rect")
      .attr("x", thermometerWidth + 200 / 2 - (tubeWidth - tubeBorderWidth) / 2)
      .attr("y", top_cy + 290)
      .attr("height", bulb_cy - top_cy)
      .attr("width", tubeWidth - tubeBorderWidth)
      .style("shape-rendering", "crispEdges")
      .style("fill", tubeFillColour)
      .style("stroke", "none");

    // Scale setup
    var scale = d3
      .scaleLinear()
      .range([bulb_cy - bulbRadius / 2 - 8.5, top_cy])
      .domain([19, 22]); // Updated to show range from 19 to 22

    // Major and minor ticks
    var majorTicks = [19, 20, 21, 22];
    var minorTicks = d3.range(19, 22.1, 0.5); // Minor ticks at 0.5 degree increments

    // Add the major and minor ticks to the axis
    var axis = d3
      .axisRight(scale)
      .tickValues(minorTicks)
      .tickSize(6)
      .tickFormat((d) => (majorTicks.includes(d) ? d : ""));

    var svgAxis = canvas
      .append("g")
      .attr("id", "tempScale")
      .attr(
        "transform",
        "translate(" +
          (thermometerWidth + 200 / 2 + tubeWidth / 2 + 10) +
          ",290)"
      )
      .call(axis);

    // Format text labels
    svgAxis
      .selectAll(".tick text")
      .style("fill", "black") // This sets the color of the tick labels
      .style("font-size", "10px") // This sets the font size of the tick labels
      .style("font-family", "Source Code Pro") // This sets the font family of the tick labels
      .style("font-weight", "400"); // This sets the font weight of the tick labels

    // Set main axis line to no stroke or fill
    svgAxis.select("path").style("stroke", "none").style("fill", "none");

    // Set the style of the ticks
    svgAxis
      .selectAll(".tick line")
      .style("stroke", "black") // This sets the color of the tick lines
      .style("shape-rendering", "crispEdges")
      .style("stroke-width", (d) => (majorTicks.includes(d) ? "2px" : "1px")); // Different stroke widths for major and minor ticks

    function updateThermometer(data) {
      var currentTemp = data.average;
      tempSea = currentTemp;
      // Update the thermometer here
      console.log(
        "Current Year:",
        data.year,
        "Average Temperature:",
        currentTemp
      );

      // Clear previous mercury column
      canvas.selectAll(".mercury").remove();

      var tubeFill_bottom = bulb_cy;
      var tubeFill_top = scale(currentTemp);

      canvas
        .append("rect")
        .attr("class", "mercury")
        .attr("x", thermometerWidth + 200 / 2 - (tubeWidth - 10) / 2)
        .attr("y", tubeFill_top + 290)
        .attr("width", tubeWidth - 10)
        .attr("height", tubeFill_bottom - tubeFill_top)
        .style("shape-rendering", "crispEdges")
        .style("fill", mercuryColour);

      canvas
        .append("circle")
        .attr("class", "mercury")
        .attr("r", bulbRadius - 6)
        .attr("cx", bulb_cx + 140)
        .attr("cy", bulb_cy + 290)
        .style("fill", mercuryColour)
        .style("stroke", mercuryColour)
        .style("stroke-width", "2px");
    }

    var currentData = dataTherm[index];

    // Initial call to display the first year's data
    updateThermometer(currentData);

    // Set up the click event
    d3.select("body").on("input", function () {
      index = index % dataTherm.length;
      currentData = dataTherm[index];
      updateThermometer(currentData);
    });

    canvas
      .append("text")
      .attr("class", "textWater")
      .attr("x", 338) // Set the x position
      .attr("y", 172) // Set the y position
      .attr("fill", "black")
      .style("font-size", "20px")
      .style("font-family", "Source Code Pro")
      .text(`${parseFloat(tempSea).toFixed(2)}°C`);
  });
}
