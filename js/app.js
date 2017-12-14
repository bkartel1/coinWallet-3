'use strict';
$('.collapse').collapse();

// Массив, куда положу запрос из базы
let bitcoinWallet = [];

//TODO: Запрос курса монет с CoinMArcetCap
let ajaxArray = [];
$.ajax({
    type: "GET",
    url: "https://api.coinmarketcap.com/v1/ticker/",
    dataType: 'json',

    success: function (res) {

        for (var value in res) {
            if (res.hasOwnProperty(value)) {
                ajaxArray.push(res[value]);
            }
        }


//Запрос в базу
        let ar = [];
        $.ajax({
            type: "get",
            url: "http://localhost:8000/notes/5a259c138b11802bc869922c",
            dataType: 'json',

            success: function (res) {
                for (let value in res) {
                    if (res.hasOwnProperty(value)) {
                        ar.push(res[value]);
                    }
                }


                let now = moment();
                moment.locale('ru');

                let m = moment(new Date(2011, 2, 12));
                m.locale('ru');


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

                let string = '2017-11-1';
                let time = moment(new Date(string));

                console.log("Время дата -" + time.format('D.M'));

                //TODO График гугла
                google.charts.load('current', {'packages': ['corechart']});
                google.charts.setOnLoadCallback(drawChart);

                // Забиваю 1 месяц данных чтобы посмотреть ка будет
                let tarray = [['Data', 'Summ'],
                    ['4.11', -610],
                    ['5.11', -611],
                    ['6.11', -614.85],
                    ['7.11', -624.12],
                    ['8.11', -607.86],
                    ['9.11', -613.92],
                    ['10.11', -642.6],
                    ['11.11', -665.82],
                    ['12.11', -677.98],
                    ['13.11', -644.12],
                    ['14.11', -619.52],
                    ['15.11', -559.51],
                    ['16.11', -521.00],
                    ['17.11', -514.15],
                    ['18.11', -495.32],
                    ['19.11', -470.77],
                    ['20.11', -457.38],
                    ['21.11', -450.00],
                    ['22.11', -558.37],
                    ['23.11', -554.77],
                    ['24.11', -546.32],
                    ['25.11', -517.35],
                    ['26.11', -478.32],
                    ['27.11', -446.58],
                    ['28.11', -430.22],
                    ['29.11', -431.52],
                    ['30.11', -427.32], ['01.12', -343.78],['02.12', -318.12],['03.12', -289.88],
                    ['04.12', -292.42], ['05.12', -266.00],['06.12', -167.55],['07.12', -52.55],
                    ['08.12', -17.58],['09.12', -14.52],['10.12', -16.71],['11.12', 202.34],
                    ['12.12', 194.15]

                ];

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


// Здесь я преобразую заново массив объектов, полученных от GET запроса
                let t = JSON.parse(ar[1]);

                for (let i = 0; i < t.length; i++) {
                    bitcoinWallet[i] = new coin(t[i].name, t[i].amount, t[i].bPriceUsd, t[i].bPriceUA, t[i].bPriceBTC, t[i].dateOfpurchase, t[i].location, t[i].isFrozen, t[i].frozenDays, t[i].frozenLocation);
                }


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
                            '<span class="badge badge-default">Доход</span>');

                        let summary = 0.0;
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
                                '<span class="badge badge-default" id="dohod' + i + '">' + ((bitcoinWallet[i].amount * actualPriceOfcurentCoin(bitcoinWallet[i].name)) - (bitcoinWallet[i].amount * bitcoinWallet[i].bPriceUsd)).toFixed(2) + '</span>' +
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
                        summary = summary.toFixed(2);
                        $('#summary').attr('class', 'badge badge-success');
                        $('#summary').text("Итог: " + summary);
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
                                return 3.0;
                            case "BTC" :
                                return ajaxArray[0].price_usd;
                            case "ETH" :
                                return ajaxArray[1].price_usd;
                                ;
                        }


                    }

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


                            bitcoinWallet.push(Coin1);


                            $.ajax({
                                type: "PUT",
                                url: "http://localhost:8000/notes/5a259c138b11802bc869922c",

                                data: {
                                    title: JSON.stringify(bitcoinWallet)
                                },

                                success: function (msg) {
                                    alert("Ушли данные: " + msg);
                                }
                            });


                        }


                    }

                });

            }
        });

    }
});