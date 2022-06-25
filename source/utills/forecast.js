const request = require("request")


const forecast = (latitude, longitude, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=3d771aaf9e1d0955b8b9c1d7ed9c3bb6&query=" + encodeURIComponent(latitude)+ "," + encodeURIComponent(longitude)+ ""

    request({url: url, json: true}, (error, {body} = {})=>{

        if(error){
            callback("Unable to connect with geocoding services", undefined)
        }
        else if(body.error){
            callback("No search match", undefined)
        }else{
            callback(error,{
                // country: response.body.location.country,
                // region: response.body.location.region,
                weatherUpdate: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                timeDate: body.location.localtime

            })
        }
    })
}

module.exports= forecast
