var Dashboard = {};

$(document).ready(function() {
    Root.showPopup("Loading...");
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
                let updated_time = "";
                let date_obj = "";
                response.data.pair_data.forEach(function(pair) {
                        let today_adr_percent = Math.round((pair.value.today_adr/pair.value.adr_20)*100);
                        updated_time = pair.updated_at;
                        html += `<tr valign="middle">
                                    <td scope="row">${pair.symbol}</td>
                                    <td>${Math.round(pair.value.today_adr)}</td>
                                    <td>${Dashboard.getADRProgressBar(today_adr_percent)}</td>
                                    <td>${Math.round(pair.value.adr_20)}</td>
                                    <td id="${pair.symbol}_price_bid" style="color:${Root.getPriceColor(pair.symbol,'price_bid',pair.value.price_bid)}">
                                        ${pair.value.price_bid}</td>
                                    <td id="${pair.symbol}_price_ask" style="color:${Root.getPriceColor(pair.symbol,'price_ask',pair.value.price_ask)}">
                                        ${pair.value.price_ask}</td>
                                    <td style="color:${Dashboard.getSwapColor(pair.value.swap_long)}">${pair.value.swap_long}</td>
                                    <td style="color:${Dashboard.getSwapColor(pair.value.swap_short)}">${pair.value.swap_short}</td>
                                    <td>${pair.value.spread}</td>
                                    <td>${Dashboard.getMarketStatus(pair.value.trade_allowed)}</td>
                                    <td>
                                        <button type="button" class="btn btn-success btn-sm">Buy</button>
                                        <button type="button" class="btn btn-danger btn-sm">Sell</button>
                                    </td>
                                </tr>`
                });
                $('#pair_data_tbody').html(html);
                date_obj = new Date(Date.parse(updated_time));
                $('#updated_time').html(`Updated Time: ${Root.formatDatetime(date_obj)}`);
                if(is_first_run==true){
                    $('#dashboard_table').show();
                    $('#status_table').show();
                    is_first_run = false;
                    Root.closePopup();
                }
            }
        }
    });
}

Dashboard.getADRProgressBar = function(percent){
    if(percent < 75){
        bg_color = "bg-success";
    }else if(percent<91){
        bg_color = "bg-warning";
    }else{
        bg_color = "bg-danger";
    }

    if(percent <= 100){
        progress = percent;
    }else{
        progress = 100;
    }
    return `<div class="progress" style="height:30px;">
                <div class="progress-bar ${bg_color}" role="progressbar" style="height:30px; width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">${percent}%</div>
            </div>`;
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