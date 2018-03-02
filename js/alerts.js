'use strict';
$('.collapse').collapse();
console.log("Привет!");


$('#exampleModalLong').modal('show');

let item = function (term, price, route, startDate) {
        this.term = term;
        this.price = price;
        this.route = route;
        this.startDate = startDate
};

