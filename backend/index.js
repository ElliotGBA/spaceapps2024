const express = require("express");
const cors = require("cors");

const server = express();


server.use(cors());
server.use(express.json());

server.listen(3001, () => {
    console.log("Server Connected on Port 3001 :)")
})

server.get('https://ssd.jpl.nasa.gov/api/horizons.api', (req, res) => {
    console.log("Response is: ", res);
})