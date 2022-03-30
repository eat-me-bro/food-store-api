const path = require("path")
const moment = require('moment')

const http = require('http')
const express = require('express')
const app = express()

// Access Origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
    next()
})

// Public Static File Folder
let public_folder = path.join(__dirname, '..', '/public/')
app.use(express.static(public_folder))

const server = http.createServer(app)

// Enviroment Data
const dotenv = require('dotenv')
dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 5500

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
app.get("/foodstores", async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    
    let dummyFoodStores = {
        foodStores: [ 
            { id: 1,
                foodStore: "Casino",
                location: {
                    lon: 123.123,
                    lat: 456.456
                },
                favorite: true,
                lastVisite: "2022-30-03"     
            },
            { id: 2,
                foodStore: "Dori, Dori",
                location: {
                    lon: 123.123,
                    lat: 456.456
                },
                favorite: true,
                lastVisite: "2022-29-03"     
            },
            { id: 3,
                foodStore: "Chipo",
                location: {
                    lon: 123.123,
                    lat: 456.456
                },
                favorite: false,
                lastVisite: "2022-28-03"     
        },
        ]
    }

    res.status(200).send(JSON.stringify(dummyFoodStores))
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