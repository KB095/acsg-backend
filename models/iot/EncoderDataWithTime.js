const mongoose = require('mongoose')

const EncoderDataWithTimeSchema = new mongoose.Schema({
    senderID: String,
    encoderReads: Number,
    timeSinceLast: Number,
    dateAndTime: Date
})

const EncoderDataWithTime = mongoose.model(
    'EncoderDataWithTime',
    EncoderDataWithTimeSchema
)

module.exports = EncoderDataWithTime