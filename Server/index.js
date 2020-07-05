const http = require('http');
const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const router = require('./src/router.js');
const config = require('config');
const webServerPort = config.get('webServer.port');
const cors = require('cors');

// Database Configuration 
require('./config/database');

// Create Express webapp
const app = express();
app.get('/hello', function(req, res){
  console.log(__dirname )
  res.send("Hello World!");
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true // extended allows nested JSON objects 
}));
app.use("/api",router);

const server = http.createServer(app)

server.listen(webServerPort, function () {
  console.log('Server running on *:' + webServerPort + ' Process ' + process.pid );
});