const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')



if(process.argv.length == 2){
    return console.log("Please provide proper address to know weather information!")
}
geocode(process.argv[2], (error, {latitude, longitude, location}) => {
    if(error) {
        return console.log(error)
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if(error){
            return console.log(error)
        }

        console.log(location)
        console.log(forecastData)
    })
})
