const width = 900
const height = 600
const margin = {
    top:20,
    bottom:200,
    left:40,
    right:10,
    top2:80,
    bottom2:20
}

const svg = d3.select("div#chart").append("svg").attr("width",width).attr("height",height)
const elementGroup = svg.append("g").attr("class","elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const elementGroup2 = svg.append("g").attr("class","elementGroup2").attr("transform", `translate(${margin.left}, ${0})`)
const axisGroup = svg.append("g").attr("class","axisGroup")
const axisGroup2 = svg.append("g").attr("class","axisGroup2")
const xAxisGroup = axisGroup.append("g").attr("class","xAxisgroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("class","yAxisgroup").attr("transform", `translate(${margin.left}, ${ margin.top})`)
const xAxisGroup2 = axisGroup2.append("g").attr("class","xAxisgroup").attr("transform", `translate(${margin.left}, ${height - margin.top})`)
const yAxisGroup2 = axisGroup2.append("g").attr("class","yAxisgroup").attr("transform", `translate(${margin.left}, ${0})`)

const x = d3.scaleTime().range([0,width - margin.left - margin.right])
const y = d3.scaleLinear().range([height - margin.bottom - margin.top,0])
const x2 = d3.scaleTime().range([0,width - margin.left - margin.right-7 ])
const y2 = d3.scaleLinear().range([height-margin.top  , height - margin.bottom])

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)
const xAxis2 = d3.axisBottom().scale(x)
const yAxis2 = d3.axisLeft().scale(y2)

const formatDate = d3.timeParse("%d/%m/%Y")

d3.csv("ibex.csv").then(data =>{

    data.map(d=>{

        d.date = formatDate(d.date)
        d.close = +d.close
        d.open = +d.open
        d.volume = +d.volume
        
    
    console.log(d.date)
    x.domain(d3.extent(data.map(d => d.date)))
    y.domain(d3.extent(data.map(d => d.close)))
    x2.domain(d3.extent(data.map(d => d.date)))
    y2.domain(d3.extent(data.map(d => d.volume)))
    
    console.log()


    })
    

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)
    xAxisGroup2.call(xAxis2)
    yAxisGroup2.call(yAxis2)


    elementGroup.datum(data) 
    .append("path")  
    .attr("id", "linea") 
    .attr("d", d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close)))

   

    const bars = elementGroup2.selectAll("rect").data(data)
    bars.enter()
        .append("rect")
        .attr("id", "bar") 
        .attr("x", d => x2(d.date))
        .attr("y", d => y2(d.volume))
        .attr("width", 8)
        .attr("height", d => height - margin.top  - y2(d.volume))
        .attr("fill", "blue")

})