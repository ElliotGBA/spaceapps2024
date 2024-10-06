const express = require("express");
const cors = require("cors");
const axios = require("axios");
const server = express();


server.use(cors());
server.use(express.json());

server.listen(3001, () => {
    console.log("Server Connected on Port 3001 :)))")
})

server.get('/api', (req, res) => {
    
    const url = "https://ssd.jpl.nasa.gov/api/horizons.api";
    axios.get(url, {
        params: req.query,
    })
    .then((response) => {
        const data = response.data.result;
        console.log("data returned from nasa is ", data);
        const vectors = data.split("\n").filter((line) => containsStuff(line));
        res.send(vectors);
    })   
}
)

const containsStuff = (line) => {
    return line.toLowerCase().includes( "vx=") || line.toLowerCase().includes("x =");
}




