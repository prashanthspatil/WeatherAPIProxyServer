const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')

//Env vars
const API_BASE_URL = process.env.WEATHER_API_BASE_URL
const API_KEY_NAME = process.env.WEATHER_API_KEY_NAME
const API_KEY_VALUE = process.env.WEATHER_API_KEY_VALUE

let cache = apicache.middleware

// Cache config
WEATHER_API_CACHE_INTERVAL= "1 minutes"

// Give cache respose for defined interval
router.get('/', cache(WEATHER_API_CACHE_INTERVAL), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query,
        })

        const weather_api_response = await needle('get', `${API_BASE_URL}?${params}`)
        const data = weather_api_response.body
        
        // Log the request on dev env
        if(process.env.NODE_ENV !== 'production') {
            console.log(`Request: ${API_BASE_URL}?${params}`)
            // console.log(data.city.name)
        }
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router