const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

/* const url = 'https://api.darksky.net/forecast/8b94a05b1fd87554d10573317a063a52/54.7817993,32.0401001?units=si&lang=ru'

request({url: url, json: true}, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather service!')
    } else if (response.body.error) {
        console.log(response.body.error)
    } else {
        const currenlty = response.body.currently
        console.log(`${response.body.daily.data[0].summary} It is currenlty ${currenlty.temperature} degrees out. There is a ${currenlty.precipProbability}% chance of rain.`)
    }
}) */

/* const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicDBydCIsImEiOiJjazRzZmdldWwzb3FxM2xsYndmemE0cWR5In0.Rg9asZkKPwlEBq1orR3m4Q'

request({url: geocodeURL, json: true}, (error, response) => {

    if (error) {
        console.log('Unable to connect to location service!')
    } else if (response.body.features.length === 0) {
        console.log('Wrong location')
    } else {
        const center = response.body.features[0].center
        const latitude = center[0]
        const longitude = center[1]

        console.log(latitude, longitude)
    }
}) */

if (!address){
    console.log('Please provide an address')
} else {

    geocode(address, (error, {latitude, longitude, location}) => {
        if (error) {
            return console.log(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return console.log(error)
            }
            console.log(location)
            console.log(forecastData)
        })
    })
}

