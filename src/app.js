const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')



// Setup handlers
app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew Mead'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Thie is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return console.log(error)
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.address){
        res.send({
            error: 'Address must be provided'
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})