var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var index = require('./server/routes/app');

// ... ADD CODE TO IMPORT ROUTING FILES HERE ...

var app = express();

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan Logger

// Add support for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
});

// Tell express to use the specified directory as the
// root directory for website files
app.use(express.static(path.join(__dirname, 'dist')));

// Tell express to map the default route ('/') to the index route
app.use('/api', index);

// ... ADD CODE TO MAP OTHER ROUTES HERE ...

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Tell the server to start listening on the defined port
server.listen(port, () => console.log(`API running on localhost:${port}`));

// Estabalish connection to the mongo database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB')
        console.log(err)
    })

