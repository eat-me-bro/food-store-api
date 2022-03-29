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
app.get("/", function (req, res) {    
    res.setHeader('Content-Type', 'text/html')
    res.status(200).sendFile(`${public_folder}index.htm`)
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