let ar=[];
$.ajax({
    type: "GET",
    url: "https://api.coinmarketcap.com/v1/ticker/",
    dataType : 'json',

    success: function(res){
        for (var value in res) {
            if (res.hasOwnProperty(value)) {
                ar.push(res[value]);
            }
        }

        console.log(ar[1].name +" " + ar[1].price_usd);
    }
});


