var filepath = "assets/data/data.csv";

function makeResponsive() {

    var svgArea = d3.select("body").select("svg");

    
    if (!svgArea.empty()) {
        svgArea.remove();
      }

    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgHeight - margin.left - margin.right;

    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var chartGroup = svg.append("g")
                        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv(filepath).then((healthData) => {

        healthData.forEach(function(data) {
            data.smokes = +data.smokes;
            data.age = +data.age;
            data.abbr = +data.abbr;
        });

        var xLinearScale = d3.scaleLinear()
        .domain([(d3.min(healthData, d => d.smokes)-2), d3.max(healthData, d => d.smokes)])
        .range([0, width]);

        var yLinearScale = d3.scaleLinear()
        .domain([(d3.min(healthData, d => d.age)-2), d3.max(healthData, d => d.age)])
        .range([height, 0]);

        var xAxis = d3.axisBottom(xLinearScale);
        var yAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
  
        chartGroup.append("g")
            .call(yAxis);

        var circlesGroup = chartGroup.selectAll("circle")
            .data(healthData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.smokes))
            .attr("cy", d => yLinearScale(d.age))
            .attr("r", "8")
            .attr("fill", "lightblue")
            .attr("stroke-width", ".5")
            .attr("stroke", "blue")
            .text(function(data){
                return d.abbr;
            });

        // chartGroup.append("text")
        //     .attr(d => d.abbr);

    }).catch(function(error) {
            console.log(error);
    });
}

makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
