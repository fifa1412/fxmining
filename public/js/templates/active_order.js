var ActiveOrder = {};

$(document).ready(function() {
    Root.showPopup("Loading...");
    ActiveOrder.refreshActiveOrder();
});

setInterval(function(){ 
    ActiveOrder.refreshActiveOrder();
}, 5000);

ActiveOrder.refreshActiveOrder = function(){
    $.ajax({
        type: "get",
        url: BASE_URL + "/api/Dashboard/userGetActiveOrder",
        success: function (response) {
            if(response.status.code == 200){
                let html = "";
                let total_profit = 0;
                response.data.active_order.forEach(function(active_order) {
                        html += `<tr style="color:${ActiveOrder.getRowFontColor(active_order.value.profit)};">
                                    <th scope="row">${active_order.ticket}</th>
                                    <th scope="row">${Root.getOrderType(active_order.value.type)}</th>
                                    <th scope="row">${active_order.value.lot}</th>
                                    <th scope="row">${active_order.value.symbol}</th>
                                    <th scope="row">${parseFloat(active_order.value.open_price).toFixed(5)}</th>
                                    <th scope="row">${parseFloat(active_order.value.current_price).toFixed(5)}</th>
                                    <th scope="row">${ActiveOrder.getTPSL(active_order.value.tp)}</th>
                                    <th scope="row">${ActiveOrder.getTPSL(active_order.value.sl)}</th>
                                    <th scope="row">${ActiveOrder.getSwap(active_order.value.swap)}</th>
                                    <th scope="row">${parseFloat(active_order.value.profit).toFixed(2)}</th>
                                </tr>`
                        total_profit += parseFloat(active_order.value.profit);
                });

                if(html == ``){
                    html += `<tr style="color:white">
                        <td style="text-align:center" colspan=10>No Active Order</td>
                    </tr>`;
                }else{
                    // Summary Profit //
                    html += `<tr class="${ActiveOrder.getRowBgColor(total_profit)}">
                        <th scope="row" colspan=9>Total Profit</th>
                        <th scope="row">${parseFloat(total_profit).toFixed(2)}</th>
                    </tr> `;
                }
                
                $('#active_order_tbody').html(html);

                if(is_first_run == true){
                    is_first_run = false;
                    Root.closePopup();
                }
            }
        }
    });
}

ActiveOrder.getSwap = function(swap){
    if(swap!=0){
        return parseFloat(swap).toFixed(2);
    }else{
        return "-";
    }
}

ActiveOrder.getTPSL = function(price){
    if(price==0){
        return "-";
    }else{
        return price;
    }
}

ActiveOrder.getRowBgColor = function(profit){
    if(profit>=0){
        return "bg-success";
    }else{
        return "bg-danger";
    }
}

ActiveOrder.getRowFontColor = function(profit){
    if(profit>=0){
        return "lime";
    }else{
        return "red";
    }
}
