'use strict';

async function getAjax(api, time = 0) {
    let ajAr = [];
    $.ajax({
        type: "GET",
        url: api,
        dataType: 'json',

        success: function (res) {

            for (let value in res) {
                if (res.hasOwnProperty(value)) {
                    ajAr.push(res[value]);

                }
            }
          }
    });

}


async function getPrice() {
    const api = 'https://api.coinmarketcap.com/v1/ticker/homeblockcoin/';
    return getAjax(api, 0);
}

async function getMessage() {
    let mes = getPrice();
    return mes.then(function(){ return ajAr});
}


console.log("Вызов  " + getMessage());
