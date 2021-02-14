var Dashboard = {};

const BASE_URL = "//" + window.location.host;
let first_run = true;

$(document).ready(function() {
    Dashboard.refreshPairData();
});

setInterval(function(){ 
    Dashboard.refreshPairData();
}, 5000);

Dashboard.refreshPairData = function(){
    $.ajax({
        type: "post",
        url: BASE_URL + "/api/Dashboard/userGetPairData",
        success: function (response) {
            if(response.status.code == 200){
                let html = "";
                response.data.pair_data.forEach(function(pair) {
                        let adr_20 = Math.round((pair.value.today_adr/pair.value.adr_20)*100);
                        html += `<tr>
                                    <th scope="row">${pair.symbol}</th>
                                    <td>${Math.round(pair.value.today_adr)}</td>
                                    <td style="color:${Dashboard.getADRPercentColor(adr_20)}">${adr_20}%</td>
                                    <td>${Math.round(pair.value.adr_20)}</td>
                                    <td id="${pair.symbol}_price_bid" style="color:${Dashboard.getPriceColor(pair.symbol,'bid',pair.value.price_bid)}">
                                        ${pair.value.price_bid}</td>
                                    <td id="${pair.symbol}_price_ask" style="color:${Dashboard.getPriceColor(pair.symbol,'ask',pair.value.price_ask)}">
                                        ${pair.value.price_ask}</td>
                                    <td style="color:${Dashboard.getSwapColor(pair.value.swap_long)}">${pair.value.swap_long}</td>
                                    <td style="color:${Dashboard.getSwapColor(pair.value.swap_short)}">${pair.value.swap_short}</td>
                                    <td>${pair.value.spread}</td>
                                    <td>${Dashboard.getMarketStatus(pair.value.trade_allowed)}</td>
                                    <td>${pair.updated_at}</td>
                                </tr>`
                });
                $('#pair_data_tbody').html(html);
                first_run = false;
            }
        }
    });
}

Dashboard.getSwapColor = function(swap){
    if(swap < 0){
        return "orange";
    }else{
        return "teal";
    }
}

Dashboard.getMarketStatus = function(status){
    if(status == true){
        return `<font color="lime">Open</font>`;
    }else{
        return `<font color="red">Close</font>`;
    }
}

Dashboard.getADRPercentColor = function(adr){
    if(adr<75){
        return "green";
    }else if(adr<91){
        return "orange";
    }else{
        return "red";
    }

}

Dashboard.getPriceColor = function(pair,price_type,current_price){
    if(first_run == false){
        let previous_price = document.getElementById(pair+"_price_"+price_type).innerText;
        if(previous_price > current_price){
            return "red";
        }else if(previous_price == current_price){
            return $('#'+pair+"_price_"+price_type).css("color");
        }else{
            return "lime";
        }
    }
}