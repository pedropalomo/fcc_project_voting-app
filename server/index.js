// Main app. entry point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require("https");
const fs = require('fs');
const path = require('path');
const poll = require("./services/polls");

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static(path.join(__dirname, '.')));

// Init poll DB:
poll.startDB();

router(app);


// Server Setup
//const port = process.env.PORT || 3090;
const port = 8081;
const server = http.createServer(app);
server.listen(port);


// Setup https server: 
// https.createServer({
//       key: fs.readFileSync('key.pem'),
//       cert: fs.readFileSync('cert.pem')
//     }, app).listen(port);
    

console.log('Server listening on: ', port);
