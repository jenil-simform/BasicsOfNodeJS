const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express();

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//res.render() tries to find index.hbs file in views folder but instead of it
//we have put index.hbs file in templates/views folder, so we have configured
//it using app.set() method.

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jenil Bhalala'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jenil Bhalala'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Jenil Bhalala'
    })
})

 
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location, 
                address : req.query.address
            })
        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jenil Bhalala',
        errorMessage: 'Help article not found.'
    })
})


//every request that doesn't match with any above routes comes here
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jenil Bhalala',
        errorMessage: 'Page not found.'
    })
})


//server listening
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})