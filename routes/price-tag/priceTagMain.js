const express   = require('express');
const axios     = require('axios');
const router    = express.Router();

const config    = require('../../config/priceTagConfig.json');

const PriceTagToken     = require('../../models/price-tag/PriceTagToken') 
const PriceTagProduct   = require('../../models/price-tag/PriceTagProduct'); 
const { response } = require('express');
const bodyParser = require('body-parser');

// Authentication:

   router.get('/requestToken', (req, res) => {
        axios.post( 'http://omega.yunli-wuli.com:9191/V1/Login', {        
            username: config.login.userName,
            password: config.login.password
        }).then(response => {
            PriceTagToken.findOneAndUpdate(
                {},
                {token: response.data.body.token},
                {useFindAndModify: false, upsert: true},
            (err, result) => {
                if(err){
                    res.send(err)
                    console.log(result)
                }else{
                    res.send(result)
                    console.log(result)
                }
            })
        }).catch(err => {
            console.error(err)
        })        
    })

    router.get('/readToken', (req, res) => {
        PriceTagToken.findOne({}, (err, result) => {
            if(err){
                console.error(err)
                res.send(err)
            }else{
                console.log(result.token)
                res.send(result)
            }
        })
    })

                                                                                     //InfobyMAC
    router.get('/getInfoByMacAddress/:mac', (req, res) => {
        var token = ''        
        PriceTagToken.findOne({}, (err, result) => {
            if(err){
                res.send(err) 
            }else{
                token = result.token
            }
        })
        .then(() => {
            axios.get(
                'http://omega.yunli-wuli.com:9191/V2/label/query',
                {
                    headers: {
                        Authorization: token
                    },
                    params: {
                        mac: req.params.mac
                    }
                }
            )
            .then(response => {
                res.setHeader('Content-Type', 'application/json')
                res.send(JSON.stringify(response.data, null,3))
            })
            .catch( error => {
            console.error(error)
            })
        })
    })

                                                                                //ControlRGBLights (MAC)
    router.get('/controlRgbMac/:mac', (req, res) => {
        var token = ''
        var StoreUuid = 65;
//        var mac = "ac233fd0b354";
        var color = 1;
        var total = 10;
        var period = 500;
        var interval = 1000;
        var brightness = 100;       

        PriceTagToken.findOne({}, (err, result) => {
            if(err){
                res.send(err) 
            }else{
                token = result.token
            }
        })
        .then(() => {

            axios({
                method: 'put',
                url: `http://omega.yunli-wuli.com:9191/V2/label/led?storeUuid=${StoreUuid}&mac=${req.params.mac}&color=${color}&total=${total}&period=${period}&interval=${interval}&brigthness=${brightness}`,
                headers: {Authorization: 'Bearer' + token }
            })
            .then(response => {
                res.setHeader('Content-Type', 'application/json')
                res.send(JSON.stringify(response.data, null,3))
            })
            .catch( error => {
            console.error(error)
            })
    })

    })
                                                                                //ControlRgbLightsInBatch-Blink (ID)
    router.get('/controlRgbId/', (req, res) => {
        var token = ''
        var StoreUuid = 65;
        var color = 2;
        var total = 60;
        var period = 100;
        var interval = 1500;
        var brightness = 70;
        var goods =    [{"id": "1010"},{"id": "1011"},{"id": "1111"}]; 

        PriceTagToken.findOne({}, (err, result) => {
            if(err){
                res.send(err) 
            }else{
                token = result.token
                console.log(token)
            }
        })
        .then(() => {
             axios({
                method: 'post',
                 url: 'http://omega.yunli-wuli.com:9191/V2/goods/led',
                 headers: {Authorization: 'Bearer' +  token },
                 data: {
      
                    "goods":goods,
                    "storeUuid": StoreUuid,
                    "color": color,
                    "total": total,
                    "period": period,
                    "interval": interval,
                    "brigthness": brightness   
                 }
            })
            .then(response => {
                res.setHeader('Content-Type', 'application/json')
                res.send(response.data)
                //res.send(JSON.stringify(response.data, null,3))
            })
            .catch( error => {
            console.error(error)
            
            })
        })
    })
                                                                                    //AddProduct
    router.get('/addProduct/', (req, res) => {
        var token = ''
        var StoreUuid = 65;     

        PriceTagToken.findOne({}, (err, result) => {
            if(err){
                res.send(err) 
            }else{
                token = result.token
            }
        })
        .then(() => {
             axios({
                method: 'post',
                 url: 'http://omega.yunli-wuli.com:9191/V2/good',
                 headers: {Authorization: 'Bearer' + token },
                 data: {
      
                    "goods": [                                       ///Barcode(barcodetext) és a Label1(ID) felvan cserélve a cheng-éknél!! ///
                    {
                        "id": result.ID,
                        "barcode": result.barcode,
                        "qrcode": result.qrcode,
                        "label3": result.number,
                        "label4": result.name,
                        "label5": result.nameAbbr,
                        "label6": result.price,
                        "label7": result.brand,
                        "label8": result.specification,
                        "label9": result.grade,
                        "label10": result.unit,
                        "label11": result.placeOfOrigin,
                        "label12": result.supplier,
                        "label13": result.placeHolder1,
                        "label14": result.placeHolder2,	
                        "label15": result.placeHolder3,
                        "label16": result.placeHolder4,
                        "label17": result.placeHolder5,
                        "label18": result.placeHolder6,
                        "label19": result.placeHolder7,
                        "label20": result.placeHolder8,
                        "label21": result.placeHolder9,
                        "label22": result.placeHolder10,
                        "label23": result.placeHolder11,
                        "label24": result.placeHolder12,
                        "label25": result.placeHolder13,
                        "label26": result.placeHolder14,
                        "label27": result.placeHolder15,
                        "label28": result.placeHolder16,
                        "label29": result.placeHolder17,
                        "label30": result.placeHolder18,
                        "label31": result.placeHolder19,
                        "label32": result.placeHolder20,
                        "label33": result.placeHolder21,
                        "label34": result.placeHolder22,
                        "label35": result.placeHolder23,
                        "label36": result.placeHolder24,
                        "label37": result.placeHolder25,
                        "label38": result.placeHolder26,
                        "label39": result.placeHolder27,
                        "label40": result.placeHolder28,	
                        "label41": result.placeHolder29,	
                        "label42": result.placeHolder30,	
                        "label43": result.placeHolder31,	
                        "label44": result.placeHolder32,	
                        "label45": result.placeHolder33,
                        "label46": result.placeHolder34,
                        "label47": result.placeHolder35,
                        "label48": result.placeHolder36,
                        "label49": result.placeHolder37,
                        "label50": result.placeHolder38,
                    }
                    ],
                    "storeUuid": StoreUuid 
                } 
                 
            })
            .then(response => {
                res.setHeader('Content-Type', 'application/json')
                res.send(JSON.stringify(response.data, null,3))
            })
            .catch( error => {
            console.error(error)
            })
        })
    })
                                                                        //ModifyProductInformation
    router.get('/modifyProduct/', (req, res) => {
        var token = ''
        var StoreUuid = 65;
        

        PriceTagToken.findOne({}, (err, result) => {
            if(err){
                res.send(err) 
            }else{
                token = result.token
            }
        })
        .then(() => {
            PriceTagProduct.findOne({ID: ''}, (err, result) => {
                if(err){
                    res.send(err)
                    console.log(err)
                }else{
                    axios({
                        method: 'put',
                        url: 'http://omega.yunli-wuli.com:9191/V2/good',
                        headers: {Authorization: 'Bearer' + token },
                        data: {
              
                            "goods": [
                            {
        
                                "id": result.ID,
                                "barcode": result.barcode,
                                "qrcode": result.qrcode,
                                "label3": result.number,
                                "label4": result.name,
                                "label5": result.nameAbbr,
                                "label6": result.price,
                                "label7": result.brand,
                                "label8": result.specification,
                                "label9": result.grade,
                                "label10": result.unit,
                                "label11": result.placeOfOrigin,
                                "label12": result.supplier,
                                "label13": result.placeHolder1,
                                "label14": result.placeHolder2,	
                                "label15": result.placeHolder3,
                                "label16": result.placeHolder4,
                                "label17": result.placeHolder5,
                                "label18": result.placeHolder6,
                                "label19": result.placeHolder7,
                                "label20": result.placeHolder8,
                                "label21": result.placeHolder9,
                                "label22": result.placeHolder10,
                                "label23": result.placeHolder11,
                                "label24": result.placeHolder12,
                                "label25": result.placeHolder13,
                                "label26": result.placeHolder14,
                                "label27": result.placeHolder15,
                                "label28": result.placeHolder16,
                                "label29": result.placeHolder17,
                                "label30": result.placeHolder18,
                                "label31": result.placeHolder19,
                                "label32": result.placeHolder20,
                                "label33": result.placeHolder21,
                                "label34": result.placeHolder22,
                                "label35": result.placeHolder23,
                                "label36": result.placeHolder24,
                                "label37": result.placeHolder25,
                                "label38": result.placeHolder26,
                                "label39": result.placeHolder27,
                                "label40": result.placeHolder28,	
                                "label41": result.placeHolder29,	
                                "label42": result.placeHolder30,	
                                "label43": result.placeHolder31,	
                                "label44": result.placeHolder32,	
                                "label45": result.placeHolder33,
                                "label46": result.placeHolder34,
                                "label47": result.placeHolder35,
                                "label48": result.placeHolder36,
                                "label49": result.placeHolder37,
                                "label50": result.placeHolder38,
                    
                            }
                            ],
                            "storeUuid": StoreUuid 
                        } 
                    })
                    .then(response => {
                        res.setHeader('Content-Type', 'application/json')
                        res.send(JSON.stringify(response.data, null,3))
                    })
                    .catch( error => {
                    console.error(error)
                    })
                }
            })
        })
    })

 
                                                                //UpdateSingleEslContent
    router.put('/updateSingle/', (req, res) => {
        var token = ''
         console.log(token)

        PriceTagToken.findOne({}, (err, result) => {
            if(err){
                res.send(err) 
            }else{
                token = result.token
            }
        })
        .then(() => {
             axios({
                method: 'post',
                 url: 'http://omega.yunli-wuli.com:9191/V2/good/brush',
                 headers: {Authorization: 'Bearer' + token},
                 data: {
      
                    "information": 
                    {
                        "label1": req.body.label1,
                    },
                    "storeUuid": req.body.storeUuid 
                } 
                 
            })
            .then(response => {
                res.setHeader('Content-Type', 'application/json')
                res.send(JSON.stringify(response.data, null,3))
            })
            .catch( error => {
            console.error(error)
            })
        })
    })

                                                                    //AddESLs
    router.get('/addEsls/', (req, res) => {
        var token = ''
        var StoreUuid = 65;
        var labels = [{"mac": "ac233fd0b354","activekey": "3141592653589793"},{"mac": "ac2331254865", "activekey": "3141592653589793"}];     

        PriceTagToken.findOne({}, (err, result) => {
            if(err){
                res.send(err) 
            }else{
                token = result.token
            }
        })
        .then(() => {
             axios({
                method: 'post',
                 url: 'http://omega.yunli-wuli.com:9191/V2/pub/label/add',
                 headers: {Authorization: 'Bearer' + token },
                 data: {
      
                    "labels": labels,
                    "storeUuid": StoreUuid 
                } 
                 
            })
            .then(response => {
                res.setHeader('Content-Type', 'application/json')
                res.send(JSON.stringify(response.data, null,3))
            })
            .catch( error => {
            console.error(error)
            })
        })
    })


                                                                                     //GetTemplateInfo  
    router.get('/getTemplateInfo/', (req, res) => {
        var token = ''                                                                //Responseban megkapjuk Template ID-t amit logikusan demoId-nak neveznek a kínaiak..//
        var storeUuid = 65; 
        var name = "BoxTag"; //Template name
        var page = 1;   //nemtudom miért van erre a kettőre szükség 
        var size = 11;  // ,illetve mit befolyásolnak
        var Inch = 2.13;
        var color = 2;
       

        PriceTagToken.findOne({}, (err, result) => {
            if(err){
                res.send(err) 
            }else{
                token = result.token
            }
        })
        .then(() => {
            axios.get(
                'http://omega.yunli-wuli.com:9191/V2/template',
                {
                    headers: {
                        Authorization: token
                    },
                    params: {
                        storeUuid: storeUuid,
                        name: name,
                        page: page,
                        size: size,
                        Inch: Inch,
                        color: color

                    }
                }
            )
            .then(response => {
                res.setHeader('Content-Type', 'application/json')
                res.send(JSON.stringify(response.data, null,3))
            })
            .catch( error => {
            console.error(error)
            })
        })
    })
                                                                    //BindESL
    router.get('/bindEsl/', (req, res) => {
        var token = ''
        var StoreUuid = 65;
        var demoId = "55bc35acda534c488f36659d1e4356ff";
        var mac = "ac233fd0b306";
        var barcode = "1011";


        PriceTagToken.findOne({}, (err, result) => {
            if(err){
                res.send(err) 
            }else{
                token = result.token
            }
        })
        .then(() => {
             axios({
                method: 'post',
                 url: 'http://omega.yunli-wuli.com:9191/V2/binding/',
                 headers: {Authorization: 'Bearer' + token },
                 data: {

                "procBindings":[
                 { "barcode": barcode,
                   "demoId": demoId,
                   "mac": mac}
                        ],
                    "storeUuid":StoreUuid
                } 
                 
            })
            .then(response => {
                res.setHeader('Content-Type', 'application/json')
                res.send(JSON.stringify(response.data, null,3))
            })
            .catch( error => {
            console.error(error)
            })
        })
    })
                                                                        //ModifyProductInformation2(Meeting)
    router.put('/modifyProduct2/', bodyParser.json(), (req, res) => {
        
        var token = ''
       
        
        

        PriceTagToken.findOne({}, (err, result) => {
            if(err){
                res.send(err) 
            }else{
                token = result.token
            }
        })
        .then(() => {
           // console.log(req.body)
                    axios({
                        method: 'put',
                        url: 'http://omega.yunli-wuli.com:9191/V2/good',
                        headers: {Authorization: 'Bearer' + token},
                        data: {
              
                            "goods": [
                            {
        
                                "id": req.body.iD,
                                "barcode": req.body.barcode,
                                "qrcode": req.body.qrcode,
                                "label3": req.body.number,
                                "label40": req.body.placeHolder28,	
                                "label41": req.body.placeHolder29,	
                                "label42": req.body.placeHolder30,		
                                "label44": req.body.placeHolder32,	
                                "label47": req.body.placeHolder35,
                                "label48": req.body.placeHolder36,
                                "label49": req.body.placeHolder37,
                                "label50": req.body.placeHolder38,
                    
                            }
                            ],
                            "storeUuid": req.body.storeUuid 
                        } 
                    })
                    .then(response => {
                        res.statusCode = 200
                        
                        //res.send(response)
                       res.setHeader('Content-Type', 'application/json')
                       res.send(JSON.stringify(response.data, null,3))
                    })
                    .catch( error => {
                    console.error(error)
                    })
                  
            }) 
        
            
   })
                                                                                //getLabelInfoByMac
   router.get('/getLabelInfoByMac/:mac', (req, res) => {
    var token = ''

    PriceTagToken.findOne({}, (err, result) => {
        if(err){
            res.send(err) 
        }else{
            token = result.token
        }
    })
    .then(() => {
         axios({
            method: 'post',
             url: 'http://omega.yunli-wuli.com:9191/V2/pub/binding/query',
             headers: {
                Authorization: token
            },
             params: {
                mac: req.params.mac
            }
        
             
        })
        .then(response => {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(response.data, null,3))
        })
        .catch( err => {
        console.error(error)
        })
    })


})

 //   router.get()

module.exports = router


/*
 axios({
                method: 'put',
                url: `http://omega.yunli-wuli.com:9191/V2/label/led?storeUuid=${StoreUuid}&mac=${mac}&color=${color}&total=${total}&period=${period}&interval=${interval}&brigthness=${brightness}`,
                headers: {Authorization: 'Bearer' + token }
            })
            .then(response => {
                res.setHeader('Content-Type', 'application/json')
                res.send(JSON.stringify(response.data, null,3))
            })
            .catch( error => {
            console.error(error)
            })


id
barcode
qrcode
label3
label4
label5	
label6	
label7	
label8	
label9	
label10	
label11	
label12	
label13	
label14	
label15	
label16	
label17	
label18	
label19	
label20	
label21	
label22	
label23	
label24	
label25	
label26	
label27	
label28	
label29	
label30	
label31	
label32	
label33	
label34	
label35	
label36	
label37	
label38	
label39	
label40	
label41	
label42	
label43	
label44	
label45	
label46	
label47	
label48	
label49	
label50
*/
