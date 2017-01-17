var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.use(express.static(path.join(__dirname, '.')));
    console.log(__dirname);

app.get('/', function(req, res) {
    
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);
console.log('server');