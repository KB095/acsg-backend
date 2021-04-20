const mongoose = require('mongoose')

const PriceTagTokenSchema = new mongoose.Schema({
    token: String
})

const PriceTagToken = new mongoose.model(
    'PriceTagToken',
    PriceTagTokenSchema
)

module.exports = PriceTagToken