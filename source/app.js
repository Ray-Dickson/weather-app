const path = require('path')
const express = require('express')
const hbs = require("hbs")
const geoCode = require("./utills/geocode.js")
const forecast = require("./utills/forecast")



const app = express()
const port = process.env.PORT || 3000


//Defining path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../template/views")
const partialsPath = path.join("__dirname", "../template/partials")

//Setting up handlebars engine and views location
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setting up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dickson Azanikyi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dickson Azanikyi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Very useful information about the app',
        name: 'Dickson Azanikyi'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        console.log("Error: Invalid address")
        return res.send({
            error: "Enter a valid address"
        })
    }

    geoCode(req.query.address, (error,  {latitude, longitude, location} = {})=>{
        if(error){
           return  res.send({error})
        }
        
            forecast(latitude, longitude, (error, forecastData)=>{
                
                if (error){
                   return  res.send({error})
                }
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
            })

    })
    
    /*res.send({
        weatherForecast: "It is raining",
        location: "Ghana",
        address: req.query.address
    })*/
})



app.get("/help/*", (req, res)=>{
    res.render("404", {
        title: 404,
        name: "Dickson Azanikyi",
        errorMessage: "Help article cannot be found"
    })
})


app.get("*", (req, res)=>{
    res.render("404",{
        title: 404,
        name: "Dickson Azanikyi",
        errorMessage: "Page not found"
    })
})








// if(!req.query.address){
//     return res.send("weather", {
//      error:"Provide a valid address"
//     })
//  }
//  res.send({
//      forecast: 'It is snowing',
//      location: 'Philadelphia'
//  })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})