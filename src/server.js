const path = require("path")
const moment = require('moment')

const { Client } = require("@googlemaps/google-maps-services-js");
const googleApiClient = new Client();

const http = require('http')
const express = require('express')
const app = express()

// Access Origin
app.use(function (req, res, next) {

    // const allowedOrigins = ['http://localhost:4200', 'http://192.168.178.40:4200'];
    // const origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200", "http://192.168.178.40:4200")
    res.setHeader("Access-Control-Allow-Origin", '*')
    res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    next()
})
app.disable('x-powered-by')

// Public Static File Folder
let public_folder = path.join(__dirname, '..', '/public/')
app.use(express.static(public_folder))
app.use(express.json())

const server = http.createServer(app)

// Enviroment Data
const dotenv = require('dotenv')
dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 5500
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

let dummyFoodStores = [
    {
        id: 1,
        foodStore: "Casino",
        long: "123.123",
        lat: "456.456",
        favorite: true,
        lastVisite: "2022-30-03"
    },
    {
        id: 2,
        foodStore: "Dori, Dori",
        long: "123.123",
        lat: "456.456",
        favorite: true,
        lastVisite: "2022-29-03"
    },
    {
        id: 3,
        foodStore: "Chipo",
        long: "123.123",
        lat: "456.456",
        favorite: false,
        lastVisite: "2022-28-03"
    },
]

const fetchType = async (typ, lat, lng) => {
    return await googleApiClient
    .placesNearby({
        params: {
            location: [lat, lng],
            key: GOOGLE_API_KEY,
            radius: 2000,
            type: typ
        }
    })
    .then((r) => {
        let results = r.data.results;
        results.sort(() => Math.random() - 0.5)
        results = results.slice(0, 3)
        return results.map((result, index) => {
            return {
                id: index, foodStore: result.name,
                long: result.geometry.location.lng, lat: result.geometry.location.lat,
                favorite: false, lastVisite: "",
                placeId: result.place_id,
                mapsUrl: `https://www.google.com/maps/place/?q=place_id:${result.place_id}`
            }
        })
    })
    .catch((e) => {
        console.log(e.response);
        return []
    });
}

const fetchFoodStores = async (lat, lng) => {
    let cafes = await fetchType('cafe', lat, lng);
    let restaurants = await fetchType('restaurant', lat, lng);
    let results = cafes.concat(restaurants);
    results.sort(() => Math.random() - 0.5)
    results = results.slice(0, 3)
    return results
}

/**
 * ------------------------------
 * API Routes
 * ------------------------------
 */

// Dasboard HTML Page
app.get("/", async (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).sendFile(`${public_folder}index.htm`)
})

// Return all food store locations
app.post("/foodstores", async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    let long = req.body.long
    let lat = req.body.lat

    console.log("RESULT BACK TO..:", req.headers.host);
    console.log("LONG : ", long);
    console.log("LAT  : ", lat);
    let foodStores = await fetchFoodStores(lat, long);
    console.log(foodStores);

    res.status(200).json(foodStores);
})

/**
 * ------------------------------
 * Server Settings
 * ------------------------------
 */

server.listen(SERVER_PORT, () => {
    console.log("-------------------------------")
    console.log("  FS API started")
    console.log("----------------+--------------")
    console.log(`| SERVER PORT...: ${SERVER_PORT}`)
    console.log("----------------+--------------\n")
})