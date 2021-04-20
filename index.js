const express       = require('express')
const mongoose      = require('mongoose')
const bodyParser    = require('body-parser')

const app = express()

// Config:
const generalConfig = require('./config/generalConfig.json')

// BodyParser Setup:
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Connection:

mongoose.connect(generalConfig.mongoDB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => {
        console.log('Connected to MongoDB')
    })
    .catch( err => {
        console.error(err)
    })

// CORS:
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// API Documentation:



// Routes:
// Price-Tag
app.use('/price-tag', require('./routes/price-tag/priceTagMain'))

// Base Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/routes/index/index.html')
});


// Server Setup:
const PORT = 3001;

app.listen(PORT, (res, req) => {

    console.log(`Index.js is running on PORT: ${PORT}`);
})