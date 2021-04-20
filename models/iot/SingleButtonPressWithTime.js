const mongoose = require('mongoose');

const SingleButtonPressWithTimeSchema = new mongoose.Schema({
    senderID: String,
    count: Number,
    timeInMillis: Number,
    dateAndTime: Date
});

const SingleButtonPressWithTime = mongoose.model(
    'SingleButtonPressWithTime',
    SingleButtonPressWithTimeSchema
)

module.exports = SingleButtonPressWithTime;