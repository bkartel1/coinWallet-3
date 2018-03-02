'use strict';
let ObjectID = require('mongodb').ObjectID;
const nodemailer = require('nodemailer');
const unirest = require('unirest');
module.exports = function (app, db) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Version, Authorization, Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT");
        next();
    });

    app.get('/', function (req, res, next) {

    });

    app.post('/', function (req, res, next) {
        // Handle the post for this route
    });

    app.put('/', function (req, res, next) {
        // Handle the put for this route
    });


    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.get('/test', async (req, res) => {
        let arrayFromCoinmarket = null;
        const getRates = async () => {
            return new Promise((resolve, reject) => {
                unirest.get('https://api.coinmarketcap.com/v1/ticker/?limit=600')
                    .headers({'Accept': 'application/json'})
                    .end(function (response) {
                        if (response) {
                            resolve(response);
                        } else {
                            reject();
                        }
                    });
            })
        };

        try {
            const rates = await getRates();
            arrayFromCoinmarket = rates;
//console.log(arrayFromCoinmarket);
        } catch (e) {
            console.log(e);
        }

       // console.log(arrayFromCoinmarket.pop());



        /* let coinParaFromCoinMarketCap = function (name, usd, change24h) {
             this.name = name;
             this.usd = usd;
             this.change24h = change24h
         };

         let coinParamArr = [];

         for (let i=0; i<rates.length;i++) {
             coinParamArr.push(new coinParaFromCoinMarketCap(rates[i].symbol,rates[i].price_usd,rates[i].24h_volume_usd))
         }
 */

        nodemailer.createTestAccount((err, account) => {

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.ukr.net',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'vsischenko@ukr.net', // generated ethereal user
                    pass: 'irena13'  // generated ethereal password
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Fred Foo 👻" <vsischenko@ukr.net>', // sender address
                to: 'vsischenko@ukr.net, vsischenko@gmail.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);

            });
        });


        res.send(arrayFromCoinmarket.pop())
    });


    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {
            //    text: req.body.body,
            title: req.body.title
        };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });


    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });


    app.post('/notes', (req, res) => {
        const note = {

            // text: req.body.body,
            title: req.body.title
        };

        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};


/*
let ajaxArray = [];
let modifAjaxArray = [];
$.ajax({
    type: "GET",
    url: "https://api.coinmarketcap.com/v1/ticker/?limit=600",
    //GET /api/v1/ticker/allBookTickers
    dataType: 'json',

    success: function (res) {
        console.log("Зашли в ветку получения курсов");
        for (let value in res) {
            console.log(ajaxArray.length);
            if (res.hasOwnProperty(value)) {
                ajaxArray.push(res[value]);

            }
        }
        console.log(ajaxArray);

        let coinParaFromCoinMarketCap = function (name, usd, change24h) {
            this.name = name;
            this.usd = usd;
            this.change24h = change24h
        };
        let coinParamArr = [];

        for (let i = 0; i < ajaxArray.length; i++) {

            switch (ajaxArray[i].symbol) {
                case 'BTC':

                    modifAjaxArray[0] = ajaxArray[i].price_usd;
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    break;

                case 'XRP':

                    modifAjaxArray[1] = ajaxArray[i].price_usd;
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    break;

                case 'ETH':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[2] = ajaxArray[i].price_usd;
                    break;
                case 'ADA':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[3] = ajaxArray[i].price_usd;
                    break;
                case 'MIOTA':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[4] = ajaxArray[i].price_usd;
                    break;
                case 'XEM':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[5] = ajaxArray[i].price_usd;
                    break;
                case 'XVG':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[6] = ajaxArray[i].price_usd;
                    break;
                case 'BTS':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[7] = ajaxArray[i].price_usd;
                    break;
                case 'GNT':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[8] = ajaxArray[i].price_usd;
                    break;
                case 'DGB':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[9] = ajaxArray[i].price_usd;
                    break;
                case 'RDD':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[10] = ajaxArray[i].price_usd;
                    break;
                case 'BTM':

                    if (ajaxArray[i].name === 'Bytom') {
                        coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                        modifAjaxArray[11] = ajaxArray[i].price_usd;
                    }
                    break;
                case 'CVC':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[12] = ajaxArray[i].price_usd;
                    break;
                case 'POWR':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[13] = ajaxArray[i].price_usd;
                    break;
                case 'SUB':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[14] = ajaxArray[i].price_usd;
                    break;
                case 'BNT':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[15] = ajaxArray[i].price_usd;
                    break;
                case 'SNM':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[16] = ajaxArray[i].price_usd;
                    break;

                case 'MTH':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[17] = ajaxArray[i].price_usd;
                    break;
                case 'HBC':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[18] = ajaxArray[i].price_usd;
                    break;
                case 'LTC':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[19] = ajaxArray[i].price_usd;
                    break;
                case 'VIBE':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[20] = ajaxArray[i].price_usd;
                    break;
                case 'STX':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[21] = ajaxArray[i].price_usd;
                    break;
                case 'DATA':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[22] = ajaxArray[i].price_usd;
                    break;
                case 'LINK':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[23] = ajaxArray[i].price_usd;
                    break;
                case 'DCN':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[24] = ajaxArray[i].price_usd;
                    break;
                case 'DIME':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[25] = ajaxArray[i].price_usd;
                    break;
                case 'PAC':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[26] = ajaxArray[i].price_usd;
                    break;
                case 'PHO':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[27] = ajaxArray[i].price_usd;
                    break;
                case 'CORG':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[28] = ajaxArray[i].price_usd;
                    break;
                case 'POP':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[29] = ajaxArray[i].price_usd;
                    break;
                case 'ZEIT':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[30] = ajaxArray[i].price_usd;
                    break;
                case 'TTC':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[31] = ajaxArray[i].price_usd;
                    break;
                case 'MINT':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[32] = ajaxArray[i].price_usd;
                    break;
                case 'LINDA':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[33] = ajaxArray[i].price_usd;
                    break;
                case 'ETN':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[34] = ajaxArray[i].price_usd;
                    break;
                case 'SMART':

                    if (ajaxArray[i].name === 'SmartCash') {
                        coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                        modifAjaxArray[35] = ajaxArray[i].price_usd;
                    }
                    break;
                case 'NXT':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[36] = ajaxArray[i].price_usd;
                    break;
                case 'EOS':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[37] = ajaxArray[i].price_usd;
                    break;
                case 'ESP':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[38] = ajaxArray[i].price_usd;
                    break;

                case 'FLASH':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[39] = ajaxArray[i].price_usd;
                    break;

                case 'PRL':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[40] = ajaxArray[i].price_usd;
                    break;
            }
        }

        //Запрос данных о текущим бытие монеты

        function getCoinTempParam(name, ret) {

            switch (ret) {
                case '24':
                    for (let i = 0; i < coinParamArr.length; i++) {
                        if (coinParamArr[i].name === name) {
                            return coinParamArr[i].change24h;
                        }
                    }
            }
        }

        function actualPriceOfcurentCoin(name) {

            switch (name) {
                case "BCC" :
                    return 0;
                case "HBC" :
                    return 8.53;
                case "BTC" :
                    return modifAjaxArray[0];
                case "XRP" :
                    return modifAjaxArray[1];
                case "ETH" :
                    return modifAjaxArray[2];
                case "MIOTA" :
                    return modifAjaxArray[4];
                case "ADA" :
                    return modifAjaxArray[3];
                case "XEM" :
                    return modifAjaxArray[5];
                case "XVG" :
                    return modifAjaxArray[6];
                case "BTS" :
                    return modifAjaxArray[7];
                case "GNT" :
                    return modifAjaxArray[8];
                case "DGB" :
                    return modifAjaxArray[9];
                case "RDD" :
                    return modifAjaxArray[10];
                case "BTM" :
                    return modifAjaxArray[11];
                case "CVC" :
                    return modifAjaxArray[12];
                case "POWR" :
                    return modifAjaxArray[13];
                case "SUB" :
                    return modifAjaxArray[14];
                case "BNT" :
                    return modifAjaxArray[15];
                case "SNM" :
                    return modifAjaxArray[16];
                case "MTH" :
                    return modifAjaxArray[17];
                case "LTC" :
                    return modifAjaxArray[19];
                case "VIBE" :
                    return modifAjaxArray[20];
                case "STX" :
                    return modifAjaxArray[21];
                case "DATA" :
                    return modifAjaxArray[22];
                case "LINK" :
                    return modifAjaxArray[23];
                case "DCN" :
                    return modifAjaxArray[24];
                case "DIME" :
                    return modifAjaxArray[25];
                case "PAC" :
                    return modifAjaxArray[26];
                case "PHO" :
                    return modifAjaxArray[27];
                case "CORG" :
                    return modifAjaxArray[28];
                case "POP" :
                    return modifAjaxArray[29];
                case "ZEIT" :
                    return modifAjaxArray[30];
                case "TTC" :
                    return modifAjaxArray[31];
                case "MINT" :
                    return modifAjaxArray[32];
                case "LINDA" :
                    return modifAjaxArray[33];
                case "ETN" :
                    return modifAjaxArray[34];
                case "SMART" :
                    return modifAjaxArray[35];
                case "NXT" :
                    return modifAjaxArray[36];
                case "EOS" :
                    return modifAjaxArray[37];
                case "ESP" :
                    return modifAjaxArray[38];
                case "FLASH" :
                    return modifAjaxArray[39];
                case "PRL" :
                    return modifAjaxArray[40];
            }
        }
    }
});*/
