const mongoose = require('mongoose')

const PriceTagProductSchema = new mongoose.Schema({
    ID:                     String,
    number:                 String,
    name:                   String,
    nameAbbr:               String,
    price:                  String,
    brand:                  String,
    specification:          String,
    grade:                  String,
    unit:                   String,
    placeOfOrigin:          String,
    supplier:               String,
    barcode:                String,
    QRCode:                 String,
    placeHolder1:           String,
    placeHolder2:           String,
    placeHolder3:           String,
    placeHolder4:           String,
    placeHolder5:           String,
    placeHolder6:           String,
    placeHolder7:           String,
    placeHolder8:           String,
    placeHolder9:           String,
    placeHolder10:          String,
    placeHolder11:          String,
    placeHolder12:          String,
    placeHolder13:          String,
    placeHolder14:          String,
    placeHolder15:          String,
    placeHolder16:          String,
    placeHolder17:          String,
    placeHolder18:          String,
    placeHolder19:          String,
    placeHolder20:          String,
    placeHolder21:          String,
    placeHolder22:          String,
    placeHolder23:          String,
    placeHolder24:          String,
    placeHolder25:          String,
    placeHolder26:          String,
    placeHolder27:          String,
    placeHolder28:          String,
    placeHolder29:          String,
    placeHolder30:          String,
    placeHolder31:          String,
    placeHolder32:          String,
    placeHolder33:          String,
    placeHolder34:          String,
    placeHolder35:          String,
    placeHolder36:          String,
    placeHolder37:          String,
    placeHolder38:          String

})

const PriceTagProduct = new mongoose.model(
    'PriceTagProduct',
    PriceTagProductSchema
)

module.exports = PriceTagProduct