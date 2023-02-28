const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a41016d02f7d34c491da3fafeacdde08&query='+latitude+','+longitude;
    
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' Weather, It is currently ' + body.current.temperature + ' degree celsius out. There is ' + body.current.precip + '% chance of rain.')   
        }
    })
}

module.exports = forecast