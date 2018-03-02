'use strict';
$('.collapse').collapse();
//TODO Проверка есть ли запись в local storage

if (null == localStorage.getItem('bitcon')) {
    localStorage.setItem('bitcon', '0');
}

//TODO Конструктор Монеты и даты
let now = moment();
moment.locale('ru');


let coin = function (name, amount, bPriceUsd, bPriceUa, bPriceBTC, dateOfpurchase, location, isFrozen, frozenDays, frozenLocation) {
    this.name = name;
    this.amount = amount;
    this.bPriceUsd = parseFloat(bPriceUsd); // Сколько стоила монета в USD
    this.bPriceUA = bPriceUa; // Сколько стоила монета в грн
    this.bPriceBTC = bPriceBTC; // Сколько стоила монета в BTC
    this.dateOfpurchase = moment(new Date(dateOfpurchase)); // Когда куплена
    this.location = location; // Где лежит
    this.isFrozen = isFrozen; // Замородена ли
    this.frozenDays = frozenDays; // заморожена на сколько дней
    this.frozenLocation = frozenLocation; //Где заморожена
};

//TODO Меню редактирования монет
let dropdownMenu =
    '<div class="btn-group">' +
    '  <button id="drop" type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    '    ' +
    '  </button>' +
    '  <div class="dropdown-menu">' +
    '    <a class="dropdown-item" data-class="del">Удалить</a>' +
    '    <a class="dropdown-item" data-class="edit">Редактировать</a>' +
    '    <a class="dropdown-item" >Обмен</a>' +
    '  </div>' +
    '</div>';


// Массив, куда положу запрос из базы
let bitcoinWallet = [];

// Массив для графика суммарного дохода
let graf = [];

//TODO Запрос графика из базы

$.ajax({
    type: "get",
    url: "http://localhost:8000/notes/5a364057f36d2869668baca0",
    dataType: 'json',

    success: function (res) {
        for (let value in res) {
            if (res.hasOwnProperty(value)) {
                graf.push(res[value]);
            }
        }
        let tempstring = graf[1];
        graf = [];
        graf = JSON.parse(tempstring);
    }
});


//TODO: Запрос курса монет с CoinMarketCap
let ajaxArray = [];
let modifAjaxArray = [];
let bitModifAjaxArray=[];
$.ajax({
    type: "GET",
    url: "https://api.coinmarketcap.com/v1/ticker/?limit=1260",
    dataType: 'json',

    success: function (res) {

        for (let value in res) {
            if (res.hasOwnProperty(value)) {
                ajaxArray.push(res[value]);
            }
        }

        //TODO Конструктор объекта с параметрами курса монеты

        let coinParaFromCoinMarketCap = function (name, usd, change24h) {
            this.name = name;
            this.usd = usd;
            this.change24h = change24h
        };

        let coinParamArr = [];

        //TODO Получение нужных курсов монет
        for (let i = 0; i < ajaxArray.length; i++) {

            switch (ajaxArray[i].symbol) {
                case 'BTC':

                    modifAjaxArray[0] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[0]=ajaxArray[i].price_btc;
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    break;

                case 'XRP':

                    modifAjaxArray[1] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[1]=ajaxArray[i].price_btc;
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    break;

                case 'ETH':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[2] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[2]=ajaxArray[i].price_btc;
                    break;
                case 'ADA':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[3] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[3]=ajaxArray[i].price_btc;
                    break;
                case 'MIOTA':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[4] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[4]=ajaxArray[i].price_btc;
                    break;
                case 'XEM':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[5] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[5]=ajaxArray[i].price_btc;
                    break;
                case 'XVG':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[6] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[6]=ajaxArray[i].price_btc;
                    break;
                case 'BTS':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[7] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[7]=ajaxArray[i].price_btc;
                    break;
                case 'GNT':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[8] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[8]=ajaxArray[i].price_btc;
                    break;
                case 'DGB':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[9] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[9]=ajaxArray[i].price_btc;
                    break;
                case 'RDD':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[10] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[10]=ajaxArray[i].price_btc;
                    break;
                case 'BTM':

                    if (ajaxArray[i].name === 'Bytom') {
                        coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                        modifAjaxArray[11] = ajaxArray[i].price_usd;
                        bitModifAjaxArray[11]=ajaxArray[i].price_btc;
                    }
                    break;
                case 'CVC':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[12] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[12]=ajaxArray[i].price_btc;
                    break;
                case 'POWR':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[13] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[13]=ajaxArray[i].price_btc;
                    break;
                case 'SUB':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[14] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[14]=ajaxArray[i].price_btc;
                    break;
                case 'BNT':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[15] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[15]=ajaxArray[i].price_btc;
                    break;
                case 'SNM':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[16] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[16]=ajaxArray[i].price_btc;
                    break;

                case 'MTH':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[17] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[17]=ajaxArray[i].price_btc;
                    break;
                case 'HBC':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[18] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[18]=ajaxArray[i].price_btc;
                    break;
                case 'LTC':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[19] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[19]=ajaxArray[i].price_btc;
                    break;
                case 'VIBE':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[20] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[20]=ajaxArray[i].price_btc;
                    break;
                case 'STX':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[21] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[21]=ajaxArray[i].price_btc;
                    break;
                case 'DATA':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[22] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[22]=ajaxArray[i].price_btc;
                    break;
                case 'LINK':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[23] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[23]=ajaxArray[i].price_btc;
                    break;
                case 'DCN':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[24] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[24]=ajaxArray[i].price_btc;
                    break;
                case 'DIME':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[25] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[25]=ajaxArray[i].price_btc;
                    break;
                case 'PAC':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[26] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[26]=ajaxArray[i].price_btc;
                    break;
                case 'PHO':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[27] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[27]=ajaxArray[i].price_btc;
                    break;
                case 'CORG':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[28] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[28]=ajaxArray[i].price_btc;
                    break;
                case 'POP':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[29] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[29]=ajaxArray[i].price_btc;
                    break;
                case 'ZEIT':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[30] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[30]=ajaxArray[i].price_btc;
                    break;
                case 'TTC':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[31] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[31]=ajaxArray[i].price_btc;
                    break;
                case 'MINT':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[32] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[32]=ajaxArray[i].price_btc;
                    break;
                case 'LINDA':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[33] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[33]=ajaxArray[i].price_btc;
                    break;
                case 'ETN':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[34] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[34]=ajaxArray[i].price_btc;
                    break;
                case 'SMART':

                    if (ajaxArray[i].name === 'SmartCash') {
                        coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                        modifAjaxArray[35] = ajaxArray[i].price_usd;
                        bitModifAjaxArray[35]=ajaxArray[i].price_btc;
                    }
                    break;
                case 'NXT':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[36] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[36]=ajaxArray[i].price_btc;
                    break;
                case 'FUN':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[37] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[37]=ajaxArray[i].price_btc;
                    break;
                case 'TRX':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[38] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[38]=ajaxArray[i].price_btc;
                    break;
                case 'BCC':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[39] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[39]=ajaxArray[i].price_btc;
                    break;
                case 'UCASH':
                    coinParamArr.push(new coinParaFromCoinMarketCap(ajaxArray[i].symbol, ajaxArray[i].price_usd, ajaxArray[i].percent_change_24h));
                    modifAjaxArray[40] = ajaxArray[i].price_usd;
                    bitModifAjaxArray[40]=ajaxArray[i].price_btc;
                    break;

            }
        }

        //TODO: Проверка для какой монеты выводить текущий курс в строке
        function actualPriceOfcurentCoin(name,b) {

            switch (name) {
                case "BCC" :
                    if (b==='u') {
                        console.log('Вошли');
                        return modifAjaxArray[39];
                    } else {
                        return bitModifAjaxArray[39];
                    }
                case "HBC" :
                    if (b==='u') {
                        return modifAjaxArray[18];
                    } else {
                        return bitModifAjaxArray[18];
                    }
                case "BTC" :
                    if (b==='u') {
                        return modifAjaxArray[0];
                    } else {
                        return bitModifAjaxArray[0];
                    }
                case "XRP" :
                    if (b==='u') {
                        return modifAjaxArray[1];
                    } else {
                        return bitModifAjaxArray[1];
                    }
                case "ETH" :
                    if (b==='u') {
                        return modifAjaxArray[2];
                    } else {
                        return bitModifAjaxArray[2];
                    }
                case "MIOTA" :
                    if (b==='u') {
                        return modifAjaxArray[4];
                    } else {
                        return bitModifAjaxArray[4];
                    }
                case "ADA" :
                    if (b==='u') {
                        return modifAjaxArray[3];
                    } else {
                        return bitModifAjaxArray[3];
                    }
                case "XEM" :
                    if (b==='u') {
                        return modifAjaxArray[5];
                    } else {
                        return bitModifAjaxArray[5];
                    }
                case "XVG" :
                    if (b==='u') {
                        return modifAjaxArray[6];
                    } else {
                        return bitModifAjaxArray[6];
                    }
                case "BTS" :
                    if (b==='u') {
                        return modifAjaxArray[7];
                    } else {
                        return bitModifAjaxArray[7];
                    }
                case "GNT" :
                    if (b==='u') {
                        return modifAjaxArray[8];
                    } else {
                        return bitModifAjaxArray[8];
                    }
                case "DGB" :
                    if (b==='u') {
                        return modifAjaxArray[9];
                    } else {
                        return bitModifAjaxArray[9];
                    }
                case "RDD" :
                    if (b==='u') {
                        return modifAjaxArray[10];
                    } else {
                        return bitModifAjaxArray[10];
                    }
                case "BTM" :
                    if (b==='u') {
                        return modifAjaxArray[11];
                    } else {
                        return bitModifAjaxArray[11];
                    }
                case "CVC" :
                    if (b==='u') {
                        return modifAjaxArray[12];
                    } else {
                        return bitModifAjaxArray[12];
                    }
                case "POWR" :
                    if (b==='u') {
                        return modifAjaxArray[13];
                    } else {
                        return bitModifAjaxArray[13];
                    }
                case "SUB" :
                    if (b==='u') {
                        return modifAjaxArray[14];
                    } else {
                        return bitModifAjaxArray[14];
                    }
                case "BNT" :
                    if (b==='u') {
                        return modifAjaxArray[15];
                    } else {
                        return bitModifAjaxArray[15];
                    }
                case "SNM" :
                    if (b==='u') {
                        return modifAjaxArray[16];
                    } else {
                        return bitModifAjaxArray[16];
                    }
                case "MTH" :
                    if (b==='u') {
                        return modifAjaxArray[17];
                    } else {
                        return bitModifAjaxArray[17];
                    }
                case "LTC" :
                    if (b==='u') {
                        return modifAjaxArray[19];
                    } else {
                        return bitModifAjaxArray[19];
                    }
                case "VIBE" :
                    if (b==='u') {
                        return modifAjaxArray[20];
                    } else {
                        return bitModifAjaxArray[20];
                    }
                case "STX" :
                    if (b==='u') {
                        return modifAjaxArray[21];
                    } else {
                        return bitModifAjaxArray[21];
                    }
                case "DATA" :
                    if (b==='u') {
                        return modifAjaxArray[22];
                    } else {
                        return bitModifAjaxArray[22];
                    }
                case "LINK" :
                    if (b==='u') {
                        return modifAjaxArray[23];
                    } else {
                        return bitModifAjaxArray[23];
                    }
                case "DCN" :
                    if (b==='u') {
                        return modifAjaxArray[24];
                    } else {
                        return bitModifAjaxArray[24];
                    }
                case "DIME" :
                    if (b==='u') {
                        return modifAjaxArray[25];
                    } else {
                        return bitModifAjaxArray[25];
                    }
                case "PAC" :
                    if (b==='u') {
                        return modifAjaxArray[26];
                    } else {
                        return bitModifAjaxArray[26];
                    }
                case "PHO" :
                    if (b==='u') {
                        return modifAjaxArray[27];
                    } else {
                        return bitModifAjaxArray[27];
                    }
                case "CORG" :
                    if (b==='u') {
                        return modifAjaxArray[28];
                    } else {
                        return bitModifAjaxArray[28];
                    }
                case "POP" :
                    if (b==='u') {
                        return modifAjaxArray[29];
                    } else {
                        return bitModifAjaxArray[29];
                    }
                case "ZEIT" :
                    if (b==='u') {
                        return modifAjaxArray[30];
                    } else {
                        return bitModifAjaxArray[30];
                    }
                case "TTC" :
                    if (b==='u') {
                        return modifAjaxArray[31];
                    } else {
                        return bitModifAjaxArray[31];
                    }
                case "MINT" :
                    if (b==='u') {
                        return modifAjaxArray[32];
                    } else {
                        return bitModifAjaxArray[32];
                    }
                case "LINDA" :
                    if (b==='u') {
                        return modifAjaxArray[33];
                    } else {
                        return bitModifAjaxArray[33];
                    }
                case "ETN" :
                    if (b==='u') {
                        return modifAjaxArray[34];
                    } else {
                        return bitModifAjaxArray[34];
                    }
                case "SMART" :
                    if (b==='u') {
                        return modifAjaxArray[35];
                    } else {
                        return bitModifAjaxArray[35];
                    }
                case "NXT" :
                    if (b==='u') {
                        return modifAjaxArray[36];
                    } else {
                        return bitModifAjaxArray[36];
                    }
                case "FUN" :
                    if (b==='u') {
                        return modifAjaxArray[37];
                    } else {
                        return bitModifAjaxArray[37];
                    }
                case "TRX" :
                    if (b==='u') {
                        return modifAjaxArray[38];
                    } else {
                        return bitModifAjaxArray[38];
                    }
                case "UCASH" :
                    if (b==='u') {
                        return modifAjaxArray[40];
                    } else {
                        return bitModifAjaxArray[40];
                    }

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


        /*//TODO Получение данных Монет из БД - пока не использую
                let ar = [];
                $.ajax({
                    type: "get",
                    url: "http://localhost:8000/notes/5a259c138b11802bc869922c",
                    dataType: 'json',

                    success: function (res) {
                        console.log("!!!");
                        for (let value in res) {
                            if (res.hasOwnProperty(value)) {
                                ar.push(res[value]);
                            }
                        }
                    },
                    error: function(){alert('Problem');}

                });

            }
        });*/
//TODO Синхронизация БД (отправка данных)
        $('#sincBut').click(
            function () {
                console.log('Синхрон')
                $.ajax({
                    type: "PUT",
                    url: "http://localhost:8000/notes/5a98fb87734d1d3e5b2de4b1",

                    data: {
                        title: JSON.stringify(bitcoinWallet)
                    },

                    success: function (msg) {
                        console.log("Синхрон произошел: " + msg);
                    }
                });
            }
        );







        $(document).ready(function () {




//TODO Получение данных из локального и дальнейшая постройка
// Здесь я преобразую заново массив объектов, полученных от GET запроса
            let t = JSON.parse(localStorage.getItem('bitcon'));

            for (let i = 0; i < t.length; i++) {
                bitcoinWallet[i] = new coin(t[i].name, t[i].amount, t[i].bPriceUsd, t[i].bPriceUA, t[i].bPriceBTC, t[i].dateOfpurchase, t[i].location, t[i].isFrozen, t[i].frozenDays, t[i].frozenLocation);
            }


//TODO Удаление монеты
            let index;

            $('#soderjimoe').on('click', '[data-class=del]', function (event) {
                index = $(event.target).parent().parent().parent().data('index');
                console.log(`Это получаемый индекс = ${index}`);
                console.log(bitcoinWallet);
                $('#delModal').modal('show');
                $('#delCoinConfirmation').text('');

                $('#delCoinConfirmation').append(`Имя: ${bitcoinWallet[index].name} кол-во: ${bitcoinWallet[index].amount}`);

            });

            $('#delConfirm').click(function () {

                console.log("Индекс при удалении - " + index);
                $(`[data-index=${index}]`).fadeOut(1000);
                bitcoinWallet.splice(index, 1);
                console.log(`Биткоин массив после удаления`);
                console.log(bitcoinWallet);
                localStorage.setItem('bitcon', `${JSON.stringify(bitcoinWallet)}`);
                showAllCoin();
            });

//TODO Показать все монеты
            showAllCoin();

            function showAllCoin() {

                $("#soderjimoe").empty();

//Если монета заморожена в лендинге, то я меняю стиль строки
                function getRowStileWhenCoinIsFrozen(isFrozen, i) {
                    let rowClass = `<div class='myRow'  data-index='${i}'>`;
                    if (isFrozen) {
                        return `<div class='rowF' data-index='${i}'>`
                    }
                    else {
                        return rowClass;
                    }
                }

//TODO Получаю стиль бэйджа и что показывается при наведении если монета заморожена
                function getBageStyleWhenCoinIsFrozen(isFrozen, i) {
                    let idBage = "";
                    if (isFrozen) {
                        return 'id="Bna' + i + '"';
                    }
                    else {
                        return idBage;
                    }
                }

                $(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });

//TODO Генерация строк с данными монет
                $('#soderjimoe').append('<div class="myRow">' +
                    '<span class="badge badge-default">Монета</span>' +
                    '<span class="badge badge-default">Кол-во</span>' +
                    '<span class="badge badge-default">Цена USD</span >' +
                    '<span class="badge badge-default">Цена в BTC</span>' +
                    '<span class="badge badge-default">Дата покупки</span>' +
                    //   '<span class="badge badge-default">Где</span>' +
                    '<span class="badge badge-default">Всего в USD</span>' +
                    '<span class="badge badge-default">Тек. курс</span>' +
                    '<span class="badge badge-default">Тек. стоим</span>' +
                    '<span class="badge badge-default">Доход</span>' +
                    '<span class="badge badge-default">% роста</span>' +
                    '<span class="badge badge-default">24ч</span>' +
                    '<span>Меню</span>');

                let summary = 0.0;
                for (let i = 0; i < bitcoinWallet.length; i++) {

                    if (((bitcoinWallet[i].amount * actualPriceOfcurentCoin(bitcoinWallet[i].name),'u') - (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd)).toFixed(2) < 0) {
                        $('#dohod' + i + '').attr('class', 'badge badge-warning');

                    }

                    if (bitcoinWallet[i].isFrozen) {
                        summary = parseFloat(summary) + parseFloat(0 - (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd));
                    } else {
                        summary = parseFloat(summary) + parseFloat(((bitcoinWallet[i].amount * actualPriceOfcurentCoin(bitcoinWallet[i].name,'u') -
                            (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd)).toFixed(2)));
                    }


                    $('#soderjimoe').append(getRowStileWhenCoinIsFrozen(bitcoinWallet[i].isFrozen) +
                        '<span class="badge badge-success"' + getBageStyleWhenCoinIsFrozen(bitcoinWallet[i].isFrozen, i) + '>' + bitcoinWallet[i].name + '</span>' +
                        '<span class="badge badge-default">' + bitcoinWallet[i].amount + '</span>' +
                        '<span class="badge badge-default">' + bitcoinWallet[i].bPriceUsd + '</span>' +

                        '<span class="badge badge-default">' + bitcoinWallet[i].bPriceBTC + '</span>' +
                        '<span class="badge badge-default">' + bitcoinWallet[i].dateOfpurchase.format('DD MM YYYY') + '</span>' +
                        // '<span class="badge badge-default">' + bitcoinWallet[i].location + '</span>' +
                        '<span class="badge badge-default">' + (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd).toFixed(2) + '</span>' +
                        '<span class="badge badge-default">' + actualPriceOfcurentCoin(bitcoinWallet[i].name,'u') + '</span>' +
                        '<span class="badge badge-default">' + (actualPriceOfcurentCoin(bitcoinWallet[i].name,'u') * bitcoinWallet[i].amount).toFixed(2) + '</span>' +
                        '<span class="badge badge-default" id="dohod' + i + '">' + ((bitcoinWallet[i].amount * actualPriceOfcurentCoin(bitcoinWallet[i].name,'u')) - (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd)).toFixed(2) + '</span>' +
                        `<span class="badge badge-default"> ${(((actualPriceOfcurentCoin(bitcoinWallet[i].name,'u') / bitcoinWallet[i].bPriceUsd) - 1) * 100).toFixed(2)}</span>` +
                        `<span class="${getBageWarning(getCoinTempParam(bitcoinWallet[i].name, '24'))}">${getCoinTempParam(bitcoinWallet[i].name, '24')}</span>` +

                        dropdownMenu +

                        '</div>');
                    $('#Bna' + i + '').attr('class', 'badge badge-warning');
                    $('#Bna' + i + '').css('width', '70px');
                    $('#Bna' + i + '').attr('data-toggle', 'tooltip');
                    $('#Bna' + i + '').attr('data-placement', 'bottom');
                    $('#Bna' + i + '').attr('title', 'Заморожено до: ' + bitcoinWallet[i].dateOfpurchase.add(bitcoinWallet[i].frozenDays, 'days').format('DD MM YYYY') + ' на ' + bitcoinWallet[i].frozenLocation + '');

                    //Делаем отрицательный доход с бэйдж ворнингом

                    if (((bitcoinWallet[i].amount * actualPriceOfcurentCoin(bitcoinWallet[i].name,'u')) - (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd)).toFixed(2) <= 0) {
                        $('#dohod' + i + '').attr('class', 'badge badge-warning');
                    }

                }

                //TODO Индикатор цветом сильного роста
                function getBageWarning(change24) {
                    if (change24 >= 100 && change24 < 200) {
                        return "badge badge-success";
                    } else if (change24 >= 200) {
                        return "badge badge-primary";
                    }
                    return "badge badge-default";
                }


                let correction = 381.1;

                //TODO Вывод Summary
                let tempArrayForSummary = [];
                summary = (parseFloat(correction) + summary).toFixed(2);
                $('#summary').attr('class', 'badge badge-success');
                $('#summary').text("Итог: " + summary);
                tempArrayForSummary[0] = now.format('D.M');
                tempArrayForSummary[1] = summary;


                //если есть текущая дата в массиве для графиков, то я ее перезаписываю, если нету - пушу
//TODO Добавление данных в график
                if (tempArrayForSummary[0] === graf[graf.length - 1][0]) {
                    graf[graf.length - 1][0] = tempArrayForSummary[0];
                    graf[graf.length - 1][1] = tempArrayForSummary[1];
                    $.ajax({
                        type: "PUT",
                        url: "http://localhost:8000/notes/5a364057f36d2869668baca0",

                        data: {
                            title: JSON.stringify(graf)
                        },

                        success: function (msg) {
                            console.log("Ушли данные: graf" + msg);
                        }
                    });
                } else {
                    console.log("Нет такой даты в массиве");
                    graf.push(tempArrayForSummary);
                    console.log("Содерж 2-х последних ячеек в массиве graf " + graf[graf.length - 1] + " , " + graf[graf.length - 2]);
                    $.ajax({
                        type: "PUT",
                        url: "http://localhost:8000/notes/5a364057f36d2869668baca0",

                        data: {
                            title: JSON.stringify(graf)
                        },

                        success: function (msg) {
                            console.log("Ушли данные: graf" + msg);
                        }
                    });
                }

            }

//TODO Форма добавления монет
// Проверка этого чекбокса открывает дополнительные формы

            $('input.ShowOrHide').click(function () {

                let checked = $("input.ShowOrHide:checked");

                if (checked.length === 0) {
                    $("#frozenBlock").hide();
                } else {
                    $("#frozenBlock").show();
                }
            });


// Создаю временный объект Монетки
            let tempCoin = new coin;

// По клику на кнопку Сохранить на форме, я вызываю функцию валидации формы

            $('#submitAddForm').click(function () {
                addCoin();
                console.log("Была нажата кнопка Сохранить");
                console.log("Содержание массива при этом: " + bitcoinWallet.length);
            });

// По клику на кнопку Отмены на Форме я вызываю функцию показать все Монетки
            $('#cancelForm').click(function () {

                showAllCoin();
                $("#formsErrors").css('display', 'none');

            });


// Функция валидации формы

            function addCoin() {
                let errorcheck = false;
                let f = document.forms.addCoin.elements;
                let errString = "";
                let formCheckCount = 0;

                function errcheck(errCode) {
                    switch (errCode) {
                        case 'Не указано кол-во' :
                            return errString += errCode;
                        case 'Не выбрана монета' :
                            return errString += errCode;
                    }
                }


                //Проверка формы Календарь
                if (f.calend.value.length < 1) {
                    f.calend.value = "";
                    f.calend.placeholder = "Дата не выбрана";
                    //   $("#formsErrors").css('display', 'block');
                    //     $("#formsErrors").text(errcheck("Не указано кол-во"));
                    errorcheck = false;
                    console.log("Проверка на стадии Calendar :" + errorcheck);
                } else {

                    let tempCalendarString = f.calend.value;                        //Преобразование формата даты для объекта
                    tempCalendarString = tempCalendarString.replace('/', '-');      //Доработать чтобы замена былав в одной строчке
                    tempCalendarString = tempCalendarString.replace('/', '-');

                    tempCoin.dateOfpurchase = moment(new Date(tempCalendarString));
                    formCheckCount++;
                    errorcheck = true;
                    console.log("was written to tempCalendarString: " + tempCoin.dateOfpurchase);
                }


                //Проверка формы количество
                if (f.amount.value.length < 1) {
                    f.amount.value = "";
                    f.amount.placeholder = "Повторите ввод";
                    errorcheck = false;
                    console.log("Проверка ан стадии кол-во: " + errorcheck);
                } else {
                    tempCoin.amount = parseFloat(f.amount.value);
                    errorcheck = true;
                    console.log("was written to tempCoin: " + tempCoin.amount);
                    formCheckCount++;
                }

                //Проверка формы выбора монеты

                if (f.coin.value === 0) {
                    $("#formsErrors").css('display', 'block');
                    $("#formsErrors").text(errcheck("Не выбрана монета"));
                    errorcheck = false;
                    console.log("Проверка на стадии выбора монеты :" + errorcheck);
                } else {

                    $("#formsErrors").css('display', 'none');
                    tempCoin.name = f.coin[document.forms.addCoin.coin.selectedIndex].value;
                    console.log("Записана монета " + tempCoin.name);
                    errorcheck = true;
                    formCheckCount++;
                }

                //Проверка формы Курс  USD
                if (f.priceUSD.value.length < 1) {
                    f.priceUSD.value = "";
                    f.priceUSD.placeholder = "Повторите ввод";
                    //   $("#formsErrors").css('display', 'block');
                    //     $("#formsErrors").text(errcheck("Не указано кол-во"));
                    errorcheck = false;
                    console.log("Проверка на стадии выбора USD :" + errorcheck);

                } else {
                    tempCoin.bPriceUsd = parseFloat(f.priceUSD.value);
                    errorcheck = true;
                    console.log("was written to priceUSD: " + tempCoin.bPriceUsd);
                    formCheckCount++;
                }

                //Проверка формы Курс к BTC
                if (f.priceBTC.value.length < 1) {
                    f.priceBTC.value = "";
                    f.priceBTC.placeholder = "Повторите ввод";
                    //   $("#formsErrors").css('display', 'block');
                    //     $("#formsErrors").text(errcheck("Не указано кол-во"));
                    errorcheck = false;
                    console.log("Проверка на стадии BTC :" + errorcheck);
                } else {
                    tempCoin.bPriceBTC = parseFloat(f.priceBTC.value);
                    errorcheck = true;
                    console.log("was written to tempCoin: " + tempCoin.priceBTC);
                    formCheckCount++;
                }

                //Проверка формы Кошелек
                if (f.wallet.value.length < 1) {
                    f.wallet.value = "";
                    f.wallet.placeholder = "Повторите ввод";
                    errorcheck = false;
                    console.log("Проверка на стадии Wallet :" + errorcheck);
                } else {
                    tempCoin.location = f.wallet.value;
                    errorcheck = true;
                    console.log("was written to tempCoin: " + tempCoin.wallet);
                    formCheckCount++;
                }


                //Проверка чекбокса заморозки

                if (f.isFrozen.checked) {
                    tempCoin.isFrozen = true;
                    console.log("tempCpoin.isFrozen: " + tempCoin.isFrozen);

                    let form = document.forms.addCoinFrozen.elements;


                    if (form.frozenDays.value.length < 1) {
                        form.frozenDays.value = "";
                        form.frozenDays.placeholder = "Хотябы 1 день";
                        //   $("#formsErrors").css('display', 'block');
                        //     $("#formsErrors").text(errcheck("Не указано кол-во"));
                        errorcheck = false;
                    } else {
                        tempCoin.frozenDays = parseInt(form.frozenDays.value);

                        console.log("was written to tempCoin.frozenDays: " + tempCoin.frozenDays);
                    }

                    if (form.frozenLocation.value.length < 1) {
                        form.frozenLocation.value = "";
                        form.frozenLocation.placeholder = "Не указано, повторите";
                        //   $("#formsErrors").css('display', 'block');
                        //     $("#formsErrors").text(errcheck("Не указано кол-во"));
                        errorcheck = false;
                    } else {
                        tempCoin.frozenLocation = form.frozenDays.value;
                        errorcheck = true;
                        console.log("was written to tempCoin.frozenDays: " + tempCoin.frozenDays);
                    }

                } else {
                    tempCoin.isFrozen = false;
                    tempCoin.frozenDays = 0;
                    tempCoin.frozenLocation = '';

                }


                console.log("Проверка перед пушем булевой наличие ошибки :" + errorcheck + formCheckCount);
                if (errorcheck && formCheckCount === 6) {
                    $('#addCoin')[0].reset();
                    $('#addCoinf')[0].reset();
                    $("#formsErrors").css('display', 'block');
                    $("#formsErrors").text("Ваша монета добавлена");
                    tempCoin.bPriceUA = (tempCoin.bPriceUsd * 26.7).toFixed(2);

                    let Coin1 = new coin(
                        tempCoin.name,
                        tempCoin.amount,
                        tempCoin.bPriceUsd,
                        tempCoin.bPriceUA,
                        tempCoin.bPriceBTC,
                        tempCoin.dateOfpurchase,
                        tempCoin.location,
                        tempCoin.isFrozen,
                        tempCoin.frozenDays,
                        tempCoin.frozenLocation
                    );


                    bitcoinWallet.push(Coin1);

                    localStorage.setItem('bitcon', `${JSON.stringify(bitcoinWallet)}`);
                    $.ajax({
                        type: "PUT",
                        url: "http://localhost:8000/notes/5a259c138b11802bc869922c",

                        data: {
                            title: JSON.stringify(bitcoinWallet)
                        },

                        success: function (msg) {
                            console.log("Ушли данные: " + msg);
                        }
                    });


                }


            }

        });


// Создаётся объект promise
        let promise = new Promise((resolve, reject) => {
            let array = [];
            setTimeout(() => {
                // переведёт промис в состояние fulfilled с результатом "result"
                resolve(
                    //TODO График гугла

                    $.ajax({
                        type: "get",
                        url: "http://localhost:8000/notes/5a364057f36d2869668baca0",
                        dataType: 'json',


                        success: function (res) {
                            for (let value in res) {
                                if (res.hasOwnProperty(value)) {
                                    array.push(res[value]);
                                }
                            }

                            let tarray = JSON.parse(array[1]);


                            google.charts.load('current', {'packages': ['corechart']});
                            google.charts.setOnLoadCallback(drawChart);

                            function drawChart() {
                                let data = google.visualization.arrayToDataTable(tarray);

                                let options = {
                                    title: 'Суммарный доход/потери',
                                    curveType: 'function',
                                    legend: {position: 'bottom'}
                                };

                                let chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

                                chart.draw(data, options);
                            }
                        }
                    }))
            }, 1500);

        })
    }
});


//End




