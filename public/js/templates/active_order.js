var ActiveOrder = {};

const BASE_URL = "//" + window.location.host;

$(document).ready(function() {
    ActiveOrder.refreshActiveOrder();
});

setInterval(function(){ 
    ActiveOrder.refreshActiveOrder();
}, 5000*10000);

ActiveOrder.refreshActiveOrder = function(){
    $.ajax({
        type: "post",
        url: BASE_URL + "/api/Dashboard/userGetActiveOrder",
        success: function (response) {
            if(response.status.code == 200){
                let html = "";
                console.log(response.data);
                response.data.active_order.forEach(function(active_order) {
                        html += `<tr class="${ActiveOrder.getRowColor(active_order.value.profit)}">
                                    <th scope="row">${active_order.ticket}</th>
                                    <th scope="row">${ActiveOrder.getOrderType(active_order.value.type)}</th>
                                    <th scope="row">${active_order.value.lot}</th>
                                    <th scope="row">${active_order.value.symbol}</th>
                                    <th scope="row">${active_order.value.open_price}</th>
                                    <th scope="row">${active_order.value.current_price}</th>
                                    <th scope="row">${ActiveOrder.getTPSL(active_order.value.tp)}</th>
                                    <th scope="row">${ActiveOrder.getTPSL(active_order.value.sl)}</th>
                                    <th scope="row">${active_order.value.swap}</th>
                                    <th scope="row">${active_order.value.profit}</th>
                                </tr>`
                });
                $('#active_order_tbody').html(html);
            }
        }
    });
}

ActiveOrder.getTPSL = function(price){
    if(price==0){
        return "-";
    }else{
        return price;
    }
}

ActiveOrder.getRowColor = function(profit){
    if(profit>=0){
        return "bg-success";
    }else{
        return "bg-danger";
    }
}

ActiveOrder.getOrderType = function (type){
    if(type==0){
        return "Buy";
    }else if(type==1){
        return "Sell";
    }else{
        return "Unknown";
    }
}