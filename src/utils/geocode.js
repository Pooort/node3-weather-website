const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicDBydCIsImEiOiJjazRzZmdldWwzb3FxM2xsYndmemE0cWR5In0.Rg9asZkKPwlEBq1orR3m4Q`
    
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find location.', undefined)
        } else {
            const center = body.features[0].center
            callback(undefined, {
                latitude: center[0],
                longitude: center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode