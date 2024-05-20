var ActiveGroupOrder = {};

$(document).ready(function() {
    Root.showPopup("Loading...");
    ActiveGroupOrder.refreshActiveGroupOrder();
});

setInterval(function(){ 
    ActiveGroupOrder.refreshActiveGroupOrder();
}, 5000);

ActiveGroupOrder.refreshActiveGroupOrder = function(){
    $.ajax({
        type: "get",
        url: BASE_URL + "/api/Dashboard/userGetActiveGroupOrder",
        success: function (response) {
            if(response.status.code == 200){
                let html = "";
                let group_id_list = response.data.order_group_id_list;
                if(group_id_list.length>0){
                    group_id_list.forEach(function(group_id) {

                        // Create Group Table //
                        let order_list = response.data.order_list[group_id];
                        html += ActiveGroupOrder.writeTableHeader(group_id, "DURATION", "TIME");
                        html += `<tbody>`;
                        let footer_value = [];
                            footer_value['total_lot'] = 0;
                            footer_value['total_swap'] = 0;
                            footer_value['total_profit'] = 0;
                            footer_value['count_win'] = 0;
                            footer_value['count_lose'] = 0;

                        order_list.forEach(function(order) {
                            let font_color = ``;
                            if(order.value.profit>=0){
                                font_color = 'green';
                            }else{
                                font_color = 'red';
                            }
                            html += `<tr style="color:${font_color};">
                                        <td>${order.ticket}</td>
                                        <td>${Root.getOrderType(order.value.type)}</td>
                                        <td>${order.value.lot}</td>
                                        <td>${order.value.symbol}</td>
                                        <td>${parseFloat(order.value.open_price).toFixed(5)}</td>
                                        <td>${parseFloat(order.value.current_price).toFixed(5)}</td>
                                        <td>+0</td>
                                        <td>${order.value.tp}</td>
                                        <td>${order.value.sl}</td>
                                        <td>${parseFloat(order.value.swap).toFixed(2)}</td>
                                        <td>${parseFloat(order.value.profit).toFixed(2)}</td>
                                        <td style="text-align:center;"><a href="#" style="color:red;text-align:center" onclick="ActiveGroupOrder.closeGroupOrder('${order.ticket}')">Close</a></td>
                                    </tr>`;
                                    footer_value['total_lot'] += parseFloat(order.value.lot);
                                    footer_value['total_swap'] += parseFloat(order.value.swap);
                                    footer_value['total_profit'] += parseFloat(order.value.profit);
                                    if(order.value.profit>=0){
                                        footer_value['count_win']++;
                                    }else{
                                        footer_value['count_lose']++;
                                    }
                        });
                        html += `</tbody>`;
                        html += ActiveGroupOrder.writeTableFooter(group_id,footer_value);
                    });

                    if(is_first_run == true){
                        is_first_run = false;
                        Root.closePopup();
                    }

                    $(`#main_container`).html(html);
                }else{
                    // No Active Group Order //
                    let footer_value = {
                        'total_lot': 0,
                        'count_win': 0,
                        'count_lose': 0,
                        'total_swap': 0.00,
                        'total_profit': 0.00
                    }
                    html += ActiveGroupOrder.writeTableHeader(`-`,`-`,`-`);
                    html += `<tbody>`;
                    html += `<tr style="color: white;">
                                <td style="text-align:center" colspan="12">No Active Group Order</td>
                            </tr>`
                    html += `</tbody>`;
                    html += ActiveGroupOrder.writeTableFooter(`-`,footer_value);
                    $(`#main_container`).html(html);

                    if(is_first_run == true){
                        is_first_run = false;
                        Root.closePopup();
                    }
                }
            }
        }
    });
}

ActiveGroupOrder.closeGroupOrder = function(order_group_id){

    $.ajax({
        type: "post",
        data:{
            order_group_id
        },
        url: BASE_URL + "/api/Order/userRequestCloseOrderGroup",
        success: function (response) {
            if(response.status.code == 200){
                Root.showPopupUpRightCorner(`success`,`Close Order Group ID (${order_group_id}) Success.`)
            }else{
                Root.showPopupUpRightCorner(`error`,`userRequestCloseOrderGroup: ${response.status.description}`)
            }
        }
    });

}

ActiveGroupOrder.writeTableHeader = function(group_id, duration, open_time){
    let content = `<div class="div-scroll" style="overflow:hidden;">
    <table class="table" style="display: block; overflow-y: scroll; margin-right: -30px;">
        <thead>
            <tr style="color:yellow;">
                <th style="width:300px">Order Group Id : <a id="group_id_${group_id}">${group_id}</a></th>
                <th style="width:200px">Duration : <a id="duration_${group_id}">${duration}</a></th>
                <th style="width:400px">Open Time : <a id="open_time_${group_id}">${open_time}</a></th>
                <th style="width:300px"></th>
            </tr>
        </thead>
    </table>
    <table class="table table-dark" style="display: block; height: 250px; overflow-y: scroll; margin-right: -30px;">
        <thead>
            <tr class="table-dark">
                <th style="width:100px">Order No</th>
                <th style="width:100px">Type</th>
                <th style="width:100px">Lot</th>
                <th style="width:100px">Symbol</th>
                <th style="width:100px">Open</th>
                <th style="width:100px">Current</th>
                <th style="width:100px">Diff</th>
                <th style="width:100px">TP</th>
                <th style="width:100px">SL</th>
                <th style="width:100px">Swap</th>
                <th style="width:100px">Profit</th>`
    if(group_id == "-"){
        content += `<th style="width:100px;text-align:center"></th>`
    }else{
        content += `<th style="width:100px;text-align:center"><button type="button" class="btn btn-danger" style="line-height:1;font-size:12px;" onclick="ActiveGroupOrder.closeGroupOrder('${group_id}')">Close All</button></th>`
    }
    content += `</tr></thead>`;
    return content;
}

ActiveGroupOrder.writeTableFooter = function(group_id,footer_value){
    let bg_color = "";
    if(footer_value['total_profit']>=0){
        bg_color = "green";
    }else{
        bg_color = "red";
    }
    return `<tfoot>
                <tr style="--bs-table-bg:${bg_color};">
                    <th scope="row" colspan=2>Total Profit</th>
                    <th scope="row"><a id="total_lot_${group_id}">${footer_value['total_lot'].toFixed(2)}</a></th>
                    <th scope="row" colspan=3></th>
                    <th scope="row" colspan=1 style="color:lime">Win: ${footer_value['count_win']}</th>
                    <th scope="row" colspan=1 style="color:orange">Lose: ${footer_value['count_lose']}</th>
                    <th scope="row" colspan=1></th>
                    <th scope="row"><a id="total_swap_${group_id}">${footer_value['total_swap'].toFixed(2)}</a></th>
                    <th scope="row"><a id="total_profit_${group_id}">${footer_value['total_profit'].toFixed(2)}</a></th>
                    <th scope="row"></th>
                </tr>
            </tfoot>
            </table>
            </div>
            <br>`;
}

/*
<div class="div-scroll" style="overflow:hidden;">
        <table class="table" style="display: block; overflow-y: scroll; margin-right: -30px;">
            <thead>
                <tr style="color:yellow;">
                    <th style="width:300px">Order Group Id : aE6m8gxIjh</th>
                    <th style="width:200px">Duration : --:--:--</th>
                    <th style="width:400px">Open Time : 2020-02-23 22:22:22</th>
                    <th style="width:300px"></th>
                </tr>
            </thead>
        </table>
        <table class="table table-dark" style="display: block; height: 250px; overflow-y: scroll; margin-right: -30px;">
            <thead>
                <tr class="table-dark">
                    <th style="width:100px">Order No</th>
                    <th style="width:100px">Type</th>
                    <th style="width:100px">Lot</th>
                    <th style="width:100px">Symbol</th>
                    <th style="width:100px">Open</th>
                    <th style="width:100px">Current</th>
                    <th style="width:100px">Diff</th>
                    <th style="width:100px">TP</th>
                    <th style="width:100px">SL</th>
                    <th style="width:100px">Swap</th>
                    <th style="width:100px">Profit</th>
                    <th style="width:100px;text-align:center"><button type="button" class="btn btn-danger" style="line-height:1;font-size:12px;">Close All</button></th>
                </tr>
            </thead>
            <tbody>
                <tr style="color:green;">
                    <td>101593466</td>
                    <td>BUY</td>
                    <td>100.00</td>
                    <td>EURGBP</td>
                    <td>1.00000</td>
                    <td>2.00000</td>
                    <td>+1564</td>
                    <td>6.00000</td>
                    <td>8.00000</td>
                    <td>256.30</td>
                    <td>4562.33</td>
                    <td style="text-align:center;"><a href="#" style="color:red;text-align:center">Close</a></td>
                </tr>
            </tbody>
            <tfoot>
                <tr style="--bs-table-bg:green;">
                    <th scope="row" colspan=2>Total Profit</th>
                    <th scope="row">600.00</th>
                    <th scope="row" colspan=6></th>
                    <th scope="row">222.33</th>
                    <th scope="row">5555.55</th>
                    <th scope="row"></th>
                </tr>
            </tfoot>
        </table>
    </div>
    <br>
*/
