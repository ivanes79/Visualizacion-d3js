const width = 900
const height= 600

const margin = {
    top:20,
    bottom:80,
    left:40,
    right:10
}



const svg = d3.select("div#chart").append("svg").attr("width",width).attr("height",height)
const elementGroup = svg.append("g").attr("class","elementGroup").attr("transform",`translate(${margin.left},${margin.top})`)
const linearGroup = elementGroup.append("g").attr("class","linearGroup") 
const axisGroup = svg.append("g").attr("class","axisGroup")
const tipGroup = elementGroup.append("g").attr("class","tipGroup hide").attr("transform",`translate(${margin.left},${ height - margin.top })`)
const tip = tipGroup.append("text").attr("transform",`translate(${0},${ margin.top -  margin.bottom + 25 })`)
const xAxisGroup = axisGroup.append("g").attr("class","xAxisGroup").attr("transform",`translate(${margin.left},${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("class","yAxisGroup").attr("transform",`translate(${margin.left},${margin.top})`)


const x = d3.scaleBand().range([0,width -margin.left - margin.right]).padding(0.05)
const y = d3.scaleLinear().range([height - margin.bottom - margin.top,0])


const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)


const dataLine =  [
    {x:1999,y:24},
    {x:2019,y:45},
]

d3.csv("data.csv").then(data => {

    data.map(d => {
        d.year = +d.year
        d.age = +d.age
        d.name =d.name.split(" ").join("-")
        
    })

    x.domain(data.map(d => d.year)) 
    y.domain([17,46])
   

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)
    

    const bars = elementGroup.selectAll("rect").data(data)
    bars.enter()
        .append("rect")
        .attr("id", d => d.name )
        .attr("x", d => x(d.year))
        .attr("y", d => y(d.age))
        .attr("width", x.bandwidth())
        .attr("height", d => height -margin.top - margin.bottom - y(d.age))
        .on("mouseover",show)
        .on("mouseout",hide)

    linearGroup.datum(dataLine) 
        .datum(dataLine)
        .append("path")  
        .attr("id", "linea") 
        .attr("d", d3.line().x(d => x(d.x)).y(d => y(d.y)))

}) 

function show(d,i,a){

    tipGroup.classed("show",true)
    tip.text(d.name + " " + d.age + " years" )
    
}

function hide(d,i,a){
    tipGroup.classed("show",false)
    
}


