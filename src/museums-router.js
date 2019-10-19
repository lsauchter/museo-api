const express = require('express')
const xss = require('xss')
const MuseumsService = require('./museums-service')

const museumsRouter = express.Router()
const jsonParser = express.json()

const sanitizeMuseums = museum => ({
    id: museum.id,
    mid: Number(museum.mid),
    discipl: xss(museum.discipl),
    commonname: xss(museum.commonname),
    phone: xss(museum.phone),
    weburl: xss(museum.weburl),
    longitude: Number(museum.longitude),
    latitude: Number(museum.latitude),
    gstreet: xss(museum.gstreet),
    gcity: xss(museum.gcity),
    gstate: xss(museum.gstate),
    gzip5: xss(museum.gzip5)
})

const formatString = word => {
    if (word === 'PO') {
        return word
    }
    else {
        const lowerWord = word.toLowerCase()
        const letters = lowerWord.split('')
        const upper = letters.shift().toUpperCase()
        letters.unshift(upper)
        const formattedWord = letters.join('')
        return formattedWord
    }
}

museumsRouter
    .route('/')
    .get(jsonParser, (req, res, next) => {
        const {latitude, longitude} = req.body.coords
        latitude.sort((a, b) => a - b)
        longitude.sort((a, b) => a -b)
        MuseumsService.getMuseums(req.app.get('db'), latitude[0], latitude[1], longitude[0], longitude[1])
            .then(museums => {
                museums.forEach(museum => {
                    const nameWords = museum.commonname.split(' ')
                    const formattedName = nameWords.map(word => formatString(word))
                    const name = formattedName.join(' ')
                    museum.commonname = name
                    
                    if (museum.phone !== ' ') {
                        const numbers = museum.phone.split('')
                        const areaCode = numbers[0] + numbers[1] + numbers[2]
                        const first3 = numbers[3] + numbers[4] + numbers[5]
                        const last4 = numbers[6] + numbers[7] + numbers[8] + numbers[9]
                        const phoneNumber = `(${areaCode})${first3}-${last4}`
                        museum.phone = phoneNumber
                    }

                    museum.weburl = museum.weburl.toLowerCase()

                    const streetWords = museum.gstreet.split(' ')
                    const formattedStreet = streetWords.map(word => formatString(word))
                    const street = formattedStreet.join(' ')
                    museum.gstreet = street

                    const cityWords = museum.gcity.split(' ')
                    const formattedCity = cityWords.map(word => formatString(word))
                    const city = formattedCity.join(' ')
                    museum.gcity = city
                })
                res.json(museums.map(sanitizeMuseums))
            })
            .catch(next)
    })

module.exports = museumsRouter