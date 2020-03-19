const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/8b94a05b1fd87554d10573317a063a52/${latitude},${longitude}?units=si&lang=ru`
    
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const currenlty = body.currently
            callback(undefined, `${body.daily.data[0].summary} It is currenlty ${currenlty.temperature} degrees out. There is a ${currenlty.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast