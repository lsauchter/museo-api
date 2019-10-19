const express = require('express')
const xss = require('xss')
const MuseumsService = require('./museums-service')

const museumsRouter = express.Router()
const jsonParser = express.json()

const sanitizeMuseums = museum => ({
    id: museum.id,
    mid: museum.mid,
    discipl: xss(museum.discipl),
    commonname: xss(museum.commonname),
    phone: xss(museum.phone),
    weburl: xss(museum.weburl),
    longitude: museum.longitude,
    latitude: museum.latitude,
    gstreet: xss(museum.gstreet),
    gcity: xss(museum.gcity),
    gstate: xss(museum.gstate),
    gzip5: xss(museum.gzip5)
})

const formatString = word => {
    word.toLowerCase()
    const letters = word.split('')
    letters[0].toUpperCase()
    const formattedWord = letters.join('')
    console.log('word', formattedWord)
    return formattedWord
}

museumsRouter
    .route('/')
    .get((req, res, next) => {
        const {latitude, longitude} = req.body.coords
        latitude.sort((a, b) => a - b)
        longitude.sort((a, b) => a -b)
        console.log(latitude, longitude)
        MuseumsService.getMuseums(req.app.get('db'), latitude[0], latitude[1], longitude[0], longitude[1])
            .then(museums => {
                museums.forEach(museum => {
                    const nameWords = museum.commonname.split(' ')
                    nameWords.forEach(word => formatString(word))
                    nameWords.join(' ')
                    console.log('name', nameWords)
                    museum.commonname = nameWords
                    
                    museum.weburl = museum.weburl.toLowerCase()

                    const street = museum.gstreet.split(' ')
                    street.forEach(word => formatString(word))
                    street.join(' ')
                    console.log('street', street)
                    museum.gstreet = street

                    const city = museum.gcity.split(' ')
                    city.forEach(word => formatString(word))
                    city.join(' ')
                    console.log('city', city)
                    museum.gcity = city

                    console.log('museum', museum)
                })
                console.log('museums', museums)
                res.json(museums.map(sanitizeMuseums))
            })
            .catch(next)
    })