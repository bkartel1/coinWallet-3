'use strict';
//import * as $ from "jquery/src/ajax";

// Массив, куда положу запрос из базы
var bitcoinWallet=[];

// Массив временный для ajax запроса
var ar=[];

//Первым делом запрос в базу
$.ajax({
    type: "get",
    url: "http://localhost:8000/notes/5a259c138b11802bc869922c",
    dataType : 'json',

    success: function(res){
        for (var value in res) {
            if (res.hasOwnProperty(value)) {
                ar.push(res[value]);
            }
        }
    }
});




var now = moment();
moment.locale('ru');
console.log(now.format('dddd, MMMM DD YYYY, h:mm:ss'));
var m = moment(new Date(2011, 2, 12));
m.locale('ru');

console.log(m.format('MM DD YYYY'));

var coin = function (name, amount, bPriceUsd, bPriceUa, bPriceBTC, dateOfpurchase, location, isFrozen, frozenDays, frozenLocation) {
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

var string = '2017-11-1';
var time = moment(new Date(string));
console.log(time.format('DD MM YYYY'));



/*var BitCon1 = new coin('BCC', 0.09917856, 278.38, 7349.232, 0.03688883, '2017-11-7', 'BCC site', false, 0, '');
var BitCoin2 = new coin('BTC', 0.004626, 7330, 193564.8, 0.0, '2017-11-4', 'HBC site', true, 300, "HBC site");
var ETH1 = new coin('ETH', 0.0462268, 405.1, 10816.23, 0, '2017-11-7', 'iPhone', false, 0, '');

var bitcoinWallet = [new coin('BTC', 0.06263332, 7330, 193564.8, 0.0, '2017-11-4', 'iPhone', false, 0, "")];

bitcoinWallet.push(BitCon1);
bitcoinWallet.push(ETH1);

bitcoinWallet.push(BitCoin2);*/

var HBC1 = new coin('HBC', 25, 3.0, 80.1, 0.000309, '2017-11-23', 'HBC site', true, 300, 'HBC site');


setTimeout(function() {
    bitcoinWallet=JSON.parse(ar[1]);
    console.log(bitcoinWallet[1]);
    console.log("Последний объект перед пушем" + bitcoinWallet[bitcoinWallet.length-1].dateOfpurchase);
    bitcoinWallet.push(HBC1);
    console.log("Последний объект после пуша" + bitcoinWallet[bitcoinWallet.length-1].dateOfpurchase);

$(document).ready(function () {

    showAllCoin();

    function showAllCoin() {
        $("#soderjimoe").empty();

        function getRowStileWhenCoinIsFrozen(isFrozen) {
            var rowClass = "<div class='myRow'>";
            if (isFrozen) {
                return "<div class='rowF'>"
            }
            else {
                return rowClass;
            }

        }

        function getBageStyleWhenCoinIsFrozen(isFrozen, i) {
            var idBage = "";
            if (isFrozen) {
                return 'id="Bna' + i + '"';
            }
            else {
                return idBage;
            }

        }

        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        })


        $('#soderjimoe').append('<div class="myRow">' +
            '<span class="badge badge-default">Монета</span>' +
            '<span class="badge badge-default">Кол-во</span>' +
            '<span class="badge badge-default">Цена USD</span >' +
            '<span class="badge badge-default">Цена UA</span>' +
            '<span class="badge badge-default">Цена в BTC</span>' +
            '<span class="badge badge-default">Дата покупки</span>' +
            '<span class="badge badge-default">Где лежит</span>' +
            '<span class="badge badge-default">Всего в USD</span>');


        for (var i = 0; i < bitcoinWallet.length; i++) {


            $('#soderjimoe').append(getRowStileWhenCoinIsFrozen(bitcoinWallet[i].isFrozen) +
                '<span class="badge badge-success"' + getBageStyleWhenCoinIsFrozen(bitcoinWallet[i].isFrozen, i) + '>' + bitcoinWallet[i].name + '</span>' +
                '<span class="badge badge-default">' + bitcoinWallet[i].amount + '</span>' +
                '<span class="badge badge-default">' + bitcoinWallet[i].bPriceUsd + '</span>' +
                '<span class="badge badge-default">' + bitcoinWallet[i].bPriceUA + '</span>' +
                '<span class="badge badge-default">' + bitcoinWallet[i].bPriceBTC + '</span>' +
                '<span class="badge badge-default">' + bitcoinWallet[i].dateOfpurchase.format('DD MM YYYY') + '</span>' +
                '<span class="badge badge-default">' + bitcoinWallet[i].location + '</span>' +
                '<span class="badge badge-default">' + (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd).toFixed(2) + '</span>' +
                '</div>');
            $('#Bna' + i + '').attr('class', 'badge badge-warning');
            $('#Bna' + i + '').css('width', '70px');
            $('#Bna' + i + '').attr('data-toggle', 'tooltip');
            $('#Bna' + i + '').attr('data-placement', 'bottom');
            $('#Bna' + i + '').attr('title', 'Заморожено до: ' + bitcoinWallet[i].dateOfpurchase.add(bitcoinWallet[i].frozenDays, 'days').format('DD MM YYYY') + ' на ' + bitcoinWallet[i].frozenLocation + '');


        }


    }


// Проверка этого чекбокса открывает дополнительные формы

    $('input.ShowOrHide').click(function () {

        var checked = $("input.ShowOrHide:checked");

        if (checked.length == 0) {
            $("#frozenBlock").hide();
        } else {
            $("#frozenBlock").show();
        }
    });


// Создаю временный объект Монетки
    var tempCoin = new coin;

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
        var errorcheck = false;
        var f = document.forms.addCoin.elements;
        var errString = "";
        var formCheckCount = 0;

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

            var tempCalendarString = f.calend.value;                        //Преобразование формата даты для объекта
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

        if (f.coin.value == 0) {
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
            //   $("#formsErrors").css('display', 'block');
            //     $("#formsErrors").text(errcheck("Не указано кол-во"));
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

            var form = document.forms.addCoinFrozen.elements;


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

            var Coin1 = new coin(
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


            console.log(tempCoin);
            bitcoinWallet.push(Coin1);


            $.ajax({
                type: "PUT",
                url: "http://localhost:8000/notes/5a259c138b11802bc869922c",

                              data: {
                    title: JSON.stringify(bitcoinWallet)
                },

                success: function(msg){
                    alert( "Ушли данные: " + msg );
                }
            });



        }


    }

});

}, 100);