const express   = require('express');
const router    = express.Router();

// Models:
const SingleButtonPressWithTime     = require('../../models/iot/SingleButtonPressWithTime');
const EncoderDataWithTime           = require('../../models/iot/EncoderDataWithTime');

// SingleButtonPressWithTime:
router.get('/sbpwt/:id/:count/:time', (req, res) => {
    SingleButtonPressWithTime.insertMany([
        {
            senderID:       req.params.id,
            count:          req.params.count,
            timeInMillis:   req.params.time,
            dateAndTime:    Date.now()
        }
    ], (err, result) => {
        if (err) {
            res.send(err);
            console.log(result);
        }else{
            res.send(result);
            console.log(result);
        }
    });
});

// EncoderDataWithTime:
router.get('/edwt/:id/:encoderReads/:time', (req, res) => {
    EncoderDataWithTime.insertMany([
        {
            senderID:           req.params.id,
            encoderReads:       req.params.encoderReads,
            timeSinceLast:      req.params.time,
            dateAndTime:        Date.now()
        }

    ], (err, result) => {
        if (err) {
            res.send(err);
            console.error(result);
        }else{
            res.send(result);
            console.log(result);
        }
    });
})


module.exports = router;