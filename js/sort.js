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
    this.isFrozen = isFrozen; // Заморожена ли
    this.frozenDays = frozenDays; // заморожена на сколько дней
    this.frozenLocation = frozenLocation; //Где заморожена
};


let bitcoinWallet = [];

let t = JSON.parse(localStorage.getItem('test'));

for (let i = 0; i < t.length; i++) {
    bitcoinWallet[i] = new coin(t[i].name, t[i].amount, t[i].bPriceUsd, t[i].bPriceUA, t[i].bPriceBTC, t[i].dateOfpurchase, t[i].location, t[i].isFrozen, t[i].frozenDays, t[i].frozenLocation);
}


function sortByName() {
    let result = null;

    result = bitcoinWallet.sort(function (a, b) {
        let c = a.name,
            d = b.name;

        if (c < d) {
            return -1;
        } else if (c > d) {
            return 1;
        }
        return 0;
    });

    for (let i in result) {
        console.log(result[i]); // a, b, c
    }

    for (let i = 0; i < result.length - 1; i++) {
        let temp1 = result[i],
            temp2 = result[i + 1];
        if (result[i].name === result[i + 1].name) {
            if (result[i].amount > result[i + 1].amount) {
                result[i] = temp2;
                result[i + 1] = temp1;
               i= i-2;
            }
        }

    }
console.log(`sort`);
    for (let i in result) {
        console.log(result[i]); // a, b, c
    }

}

function sortByWallet() {
    let result = null;

    result = bitcoinWallet.sort(function (a, b) {
        let c = a.location,
            d = b.location;

        if (c < d) {
            return -1;
        } else if (c > d) {
            return 1;
        }
        return 0;
    });

    for (let i in result) {
        console.log(result[i]); // a, b, c
    }

    for (let i = 0; i < result.length - 1; i++) {
        let temp1 = result[i],
            temp2 = result[i + 1];
        if (result[i].location === result[i + 1].location) {
            if (result[i].name > result[i + 1].name) {
                result[i] = temp2;
                result[i + 1] = temp1;
                i= i-2;
            }
        }
    }
    for (let i = 0; i < result.length - 1; i++) {
        let temp1 = result[i],
            temp2 = result[i + 1];
        if (result[i].location === result[i + 1].location&&result[i].name === result[i + 1].name) {
            if (result[i].amount > result[i + 1].amount) {
                result[i] = temp2;
                result[i + 1] = temp1;
                i= i-2;
            }
        }
    }




    console.log(`sort`);
    for (let i in result) {
        console.log(result[i]); // a, b, c
    }

}

sortByWallet();


