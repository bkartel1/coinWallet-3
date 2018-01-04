'use strict';
console.log("Загружен портфель на 3К");

$('.collapse').collapse();


let dropdownMenu =
    '<div class="btn-group">' +
    '  <button id="drop" type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    '    ' +
    '  </button>' +
    '  <div class="dropdown-menu">' +
    '    <a class="dropdown-item" href="#">Удалить</a>' +
    '    <a class="dropdown-item" href="#">Редактировать</a>' +
    '    <a class="dropdown-item" href="#">Обмен</a>' +
    '  </div>' +
    '</div>';


// Массив, куда положу запрос из базы
let bitcoinWallet = [];

// Массив для графика суммарного дохода
let graf = [];


$.ajax({
    type: "get",
    url: "http://localhost:8000/notes/5a363f42f36d2869668bac54",
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


//TODO: Запрос курса монет с CoinMArcetCap
let ajaxArray = [];
let modifAjaxArray = [];
$.ajax({
    type: "GET",
    url: "https://api.coinmarketcap.com/v1/ticker/?limit=0",
    dataType: 'json',

    success: function (res) {

        for (let value in res) {
            if (res.hasOwnProperty(value)) {
                ajaxArray.push(res[value]);

            }
        }
        console.log(ajaxArray);

        for (let i = 0; i < ajaxArray.length; i++) {

            switch (ajaxArray[i].symbol) {
                case 'BTC':
                    modifAjaxArray[0] = ajaxArray[i].price_usd;
                    break;

                case 'XRP':
                    modifAjaxArray[1] = ajaxArray[i].price_usd;
                    break;

                case 'ETH':
                    modifAjaxArray[2] = ajaxArray[i].price_usd;
                    break;
                case 'ADA':
                    modifAjaxArray[3] = ajaxArray[i].price_usd;
                    break;
                case 'MIOTA':
                    modifAjaxArray[4] = ajaxArray[i].price_usd;
                    break;
                case 'XEM':
                    modifAjaxArray[5] = ajaxArray[i].price_usd;
                    break;
                case 'XVG':
                    modifAjaxArray[6] = ajaxArray[i].price_usd;
                    break;
                case 'BTS':
                    modifAjaxArray[7] = ajaxArray[i].price_usd;
                    break;
                case 'GNT':
                    modifAjaxArray[8] = ajaxArray[i].price_usd;
                    break;
                case 'DGB':
                    modifAjaxArray[9] = ajaxArray[i].price_usd;
                    break;
                case 'RDD':
                    modifAjaxArray[10] = ajaxArray[i].price_usd;
                    break;
                case 'BTM':
                    if (ajaxArray[i].name==='Bytom') {
                        modifAjaxArray[11] = ajaxArray[i].price_usd;
                    }
                    break;
                case 'CVC':
                    modifAjaxArray[12] = ajaxArray[i].price_usd;
                    break;
                case 'POWR':
                    modifAjaxArray[13] = ajaxArray[i].price_usd;
                    break;
                case 'SUB':
                    modifAjaxArray[14] = ajaxArray[i].price_usd;
                    break;
                case 'BNT':
                    modifAjaxArray[15] = ajaxArray[i].price_usd;
                    break;
                case 'SNM':
                    modifAjaxArray[16] = ajaxArray[i].price_usd;
                    break;

                case 'MTH':
                    modifAjaxArray[17] = ajaxArray[i].price_usd;
                    break;
                case 'HBC':
                    modifAjaxArray[18] = ajaxArray[i].price_usd;
                    break;
            }
        }
for (let i=0; i<modifAjaxArray.length;i++){console.log(modifAjaxArray[i]);}


//Запрос в базу
        let ar = [];
        $.ajax({
            type: "get",
            url: "http://localhost:8000/notes/5a48b574f36d284acc10a210",
            dataType: 'json',

            success: function (res) {
                for (let value in res) {
                    if (res.hasOwnProperty(value)) {
                        ar.push(res[value]);
                    }
                }


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


                console.log("Время дата -" + now.format('D.M'));


// Здесь я преобразую заново массив объектов, полученных от GET запроса
                let t = JSON.parse(ar[1]);

                for (let i = 0; i < t.length; i++) {
                    bitcoinWallet[i] = new coin(t[i].name, t[i].amount, t[i].bPriceUsd, t[i].bPriceUA, t[i].bPriceBTC, t[i].dateOfpurchase, t[i].location, t[i].isFrozen, t[i].frozenDays, t[i].frozenLocation);
                }


                $(document).ready(function () {

                    showAllCoin();

//TODO Показать все монеты
                    function showAllCoin() {
                        $("#soderjimoe").empty();

                        function getRowStileWhenCoinIsFrozen(isFrozen) {
                            let rowClass = "<div class='myRow'>";
                            if (isFrozen) {
                                return "<div class='rowF'>"
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
                            '<span class="badge badge-default">Цена UA</span>' +
                            '<span class="badge badge-default">Цена в BTC</span>' +
                            '<span class="badge badge-default">Дата покупки</span>' +
                            '<span class="badge badge-default">Где лежит</span>' +
                            '<span class="badge badge-default">Всего в USD</span>' +
                            '<span class="badge badge-default">Тек. курс</span>' +
                            '<span class="badge badge-default">Тек. стоим</span>' +
                            '<span class="badge badge-default">Доход</span>' +
                            '<span>Меню</span>');

                        let summary = 0.0;
                        let tempInputUsd =0.0;
                        for (let i = 0; i < bitcoinWallet.length; i++) {

                            if (((bitcoinWallet[i].amount * actualPriceOfcurentCoin(bitcoinWallet[i].name)) - (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd)).toFixed(2) < 0) {
                                $('#dohod' + i + '').attr('class', 'badge badge-warning');

                            }

                            if (bitcoinWallet[i].isFrozen) {
                                summary = parseFloat(summary) + parseFloat(0 - (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd));
                            } else {
                                summary = parseFloat(summary) + parseFloat(((bitcoinWallet[i].amount * actualPriceOfcurentCoin(bitcoinWallet[i].name)) -
                                    (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd)).toFixed(2));
                            }


                            tempInputUsd = parseFloat(tempInputUsd)+parseFloat((bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd).toFixed(2));


                            $('#soderjimoe').append(getRowStileWhenCoinIsFrozen(bitcoinWallet[i].isFrozen) +
                                '<span class="badge badge-success"' + getBageStyleWhenCoinIsFrozen(bitcoinWallet[i].isFrozen, i) + '>' + bitcoinWallet[i].name + '</span>' +
                                '<span class="badge badge-default">' + bitcoinWallet[i].amount + '</span>' +
                                '<span class="badge badge-default">' + bitcoinWallet[i].bPriceUsd + '</span>' +
                                '<span class="badge badge-default">' + bitcoinWallet[i].bPriceUA + '</span>' +
                                '<span class="badge badge-default">' + bitcoinWallet[i].bPriceBTC + '</span>' +
                                '<span class="badge badge-default">' + bitcoinWallet[i].dateOfpurchase.format('DD MM YYYY') + '</span>' +
                                '<span class="badge badge-default">' + bitcoinWallet[i].location + '</span>' +
                                '<span class="badge badge-default">' + (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd).toFixed(2) + '</span>' +
                                '<span class="badge badge-default">' + actualPriceOfcurentCoin(bitcoinWallet[i].name) + '</span>' +
                                '<span class="badge badge-default">' + (actualPriceOfcurentCoin(bitcoinWallet[i].name) * bitcoinWallet[i].amount).toFixed(2) + '</span>' +
                                '<span class="badge badge-default" id="dohod' + i + '">' + ((bitcoinWallet[i].amount * actualPriceOfcurentCoin(bitcoinWallet[i].name)) - (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd)).toFixed(2) + '</span>' + dropdownMenu +
                                '</div>');
                            $('#Bna' + i + '').attr('class', 'badge badge-warning');
                            $('#Bna' + i + '').css('width', '70px');
                            $('#Bna' + i + '').attr('data-toggle', 'tooltip');
                            $('#Bna' + i + '').attr('data-placement', 'bottom');
                            $('#Bna' + i + '').attr('title', 'Заморожено до: ' + bitcoinWallet[i].dateOfpurchase.add(bitcoinWallet[i].frozenDays, 'days').format('DD MM YYYY') + ' на ' + bitcoinWallet[i].frozenLocation + '');

                            //Делаем отрицательный доход с бэйдж ворнингом

                            if (((bitcoinWallet[i].amount * actualPriceOfcurentCoin(bitcoinWallet[i].name)) - (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd)).toFixed(2) <= 0) {
                                $('#dohod' + i + '').attr('class', 'badge badge-warning');
                            }

                        }

                        console.log("Вложили всего: " + tempInputUsd);

                        //TODO Вывод Summary
                        let tempArrayForSummary = [];

                        summary = summary.toFixed(2);
                        $('#summary').attr('class', 'badge badge-success');
                        $('#summary').text("Итог: " + summary);
                        tempArrayForSummary[0] = now.format('D.M');
                        tempArrayForSummary[1] = summary;

                        //если есть текущая дата в массиве для графиков, то я ее перезаписываю, если нету - пушу
                        console.log("Содержимое массива graf " + graf);
                        if (tempArrayForSummary[0] === graf[graf.length - 1][0]) {
                            graf[graf.length - 1][0] = tempArrayForSummary[0];
                            graf[graf.length - 1][1] = tempArrayForSummary[1];
                            console.log("Уже есть такая дата в массиве");
                            console.log("Содерж 2-х последних ячеек в массиве graf " + graf[graf.length - 1] + " , " + graf[graf.length - 2]);
                            $.ajax({
                                type: "PUT",
                                url: "http://localhost:8000/notes/5a363f42f36d2869668bac54",

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
                                url: "http://localhost:8000/notes/5a363f42f36d2869668bac54",

                                data: {
                                    title: JSON.stringify(graf)
                                },

                                success: function (msg) {
                                    console.log("Ушли данные: graf" + msg);
                                }
                            });
                        }

                    }


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

                    //TODO: Проверка для какой монеты выводить текущий курс в строке

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

                        }


                    }


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


                            $.ajax({
                                type: "PUT",
                                url: "http://localhost:8000/notes/5a48b574f36d284acc10a210",

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

            }
        });

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
                url: "http://localhost:8000/notes/5a363f42f36d2869668bac54",
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
    }, 1000);

});

// promise.then навешивает обработчики на успешный результат или ошибку
promise
    .then(
        result => {
            // первая функция-обработчик - запустится при вызове resolve
            console.log("Промиc говорит все хорошо и строит график с последней датой: " + graf[graf.length - 1][0]); // result - аргумент resolve
        },
        error => {
            // вторая функция - запустится при вызове reject
            alert("Rejected: " + error); // error - аргумент reject
        }
    );

//End




