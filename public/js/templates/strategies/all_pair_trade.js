var AllPairTrade = {};

let timeframe = '';
let indicator_data_list = [];
let temp_data_for_cal_weight = [];
let previous_symbol_data_list = [];
let is_already_click_buy_btn = [];
let is_already_click_sell_btn = [];
let symbol_data_list = [];

let default_lot = 0.01; // Default Lot
let refresh_data_sec = 5 * 1000;

let order_group_id = "";
let timeframe_list = ['M1','M5','M15','M30','H1','H4','D1','W1','MN'];
let table_header = `  
    <tr class="table-dark">
        <th scope="col" rowspan=2>Symbol</th>
        <th scope="col" rowspan=2>Bid<br>Ask</th>
        <th scope="col" colspan=3>ADX</th>
        <th scope="col" rowspan=2>CCI</th>
        <th scope="col" colspan=2>Stochastic</th>
        <th scope="col" colspan=5>Moving Average</th>
        <th scope="col" rowspan=2>Weight</th>
        <th scope="col" rowspan=2>Trend</th>
        <th scope="col" colspan=2>Order Lot</th>
    </tr>
    <tr class="table-dark">
        <th style="color:aqua;">Main</th>
        <th style="color:lime;">+DI</th>
        <th style="color:red;">-DI</th>
        <th style="color:aqua;">Main</th>
        <th style="color:red;">Signal</th>
        <th>EMA5</th>
        <th>EMA21</th>
        <th>SMA50</th>
        <th>SMA100</th>
        <th>SMA200</th>
        <th><input type="number" id="lot_input" class="form-control" style="width: 90px" value="${default_lot}"></th>
    </tr>
`;
let indicator_setting_list = [
    {'indicator_name' : 'ADX','indicator_settings' : {'period':'14','apply_to':'PRICE_CLOSE'},'value' : 'mode_main','decimal':'2'},
    {'indicator_name' : 'ADX','indicator_settings' : {'period':'14','apply_to':'PRICE_CLOSE'},'value' : 'mode_plusdi','decimal':'2'},
    {'indicator_name' : 'ADX','indicator_settings' : {'period':'14','apply_to':'PRICE_CLOSE'},'value' : 'mode_minusdi','decimal':'2'},
    {'indicator_name' : 'CCI','indicator_settings' : {'period':'14','apply_to':'PRICE_CLOSE'},'value' : 'main_value','decimal':'2'},
    {'indicator_name' : 'STOCHASTIC','indicator_settings' : {'k_period':'5','d_period':'3','slowing':'3','price_field':'LOW_HIGH','method':'MODE_SMA'},'value' : 'mode_main','decimal':'2'},
    {'indicator_name' : 'STOCHASTIC','indicator_settings' : {'k_period':'5','d_period':'3','slowing':'3','price_field':'LOW_HIGH','method':'MODE_SMA'},'value' : 'mode_signal','decimal':'2'},
    {'indicator_name' : 'MA','indicator_settings' : {'period':'5','apply_to':'PRICE_WEIGHTED','method':'MODE_EMA'},'value' : 'main_value','decimal':null},
    {'indicator_name' : 'MA','indicator_settings' : {'period':'21','apply_to':'PRICE_WEIGHTED','method':'MODE_EMA'},'value' : 'main_value','decimal':null},
    {'indicator_name' : 'MA','indicator_settings' : {'period':'50','apply_to':'PRICE_CLOSE','method':'MODE_SMA'},'value' : 'main_value','decimal':null},
    {'indicator_name' : 'MA','indicator_settings' : {'period':'100','apply_to':'PRICE_CLOSE','method':'MODE_SMA'},'value' : 'main_value','decimal':null},
    {'indicator_name' : 'MA','indicator_settings' : {'period':'200','apply_to':'PRICE_CLOSE','method':'MODE_SMA'},'value' : 'main_value','decimal':null},
];

$(document).ready(async function() {
    AllPairTrade.generateTimeframeTab();
    await AllPairTrade.changeTimeFrame('H1');
});

setInterval(function(){ 
    AllPairTrade.refreshIndicatorData();
}, refresh_data_sec);

AllPairTrade.generateTimeframeTab = function(){
    let timeframe_tab_html = '';
    timeframe_list.forEach(function(timeframe) {
        timeframe_tab_html += `<li class="nav-item"><a class="nav-link cursor-pointer" style="color:white;" id="TF_TAB_${timeframe}" onclick="AllPairTrade.changeTimeFrame('${timeframe}')">${timeframe}</a></li>`;
    });
    $('#timeframe_tab').html(timeframe_tab_html);
}

AllPairTrade.changeTimeFrame = async function(tf){
    return new Promise((resolve)=>{
        is_first_run = true;
        Root.showPopup("Loading...");
        timeframe = tf;
        $(`a[id^='TF_TAB']`).css("color", "white");
        $(`a[id^='TF_TAB']`).removeClass('active');
        $(`#TF_TAB_${tf}`).css("color", "black");
        $(`#TF_TAB_${tf}`).addClass('active');
        AllPairTrade.refreshRandomStr();
        AllPairTrade.refreshIndicatorData();
        resolve();
    });
}

AllPairTrade.refreshRandomStr = function(){
    let rand = Root.randomStr(4);
    order_group_id = rand;
    $('#random_code').text(rand);
}

AllPairTrade.refreshIndicatorData = function(){
    $.ajax({
        type: "get",
        url: BASE_URL + "/api/Dashboard/userGetIndicatorData",
        data:{
            timeframe
        },
        success: function (response) {
            if(response.status.code == 200){
                let symbol_list = [];
                let trade_not_allow_count = 0;

                // Get Symbol Data //
                symbol_data_list = response.data.symbol_data;
                symbol_data_list.forEach(function(symbol_data) {
                    if(symbol_data.value.trade_allowed == "false"){
                        trade_not_allow_count++;
                    }
                    symbol_data_list[symbol_data.symbol] = symbol_data.value;       
                     // Push Unique Symbol To Array //
                    if(symbol_list.indexOf(symbol_data.symbol) === -1){
                        symbol_list.push(symbol_data.symbol);
                    }
                });

                // Set Status Panel //
                $('#server_name').text(response.data.symbol_data[0]['value']['server_name']);
                $('#server_time').text(response.data.symbol_data[0]['value']['server_time']);
                if(trade_not_allow_count==symbol_data_list.length){
                    $('#server_status').html('<a style="color:red">(Close)</a>');
                }else{
                    $('#server_status').html('<a style="color:lime">(Open)</a>');
                }
                
                // Write Indicator Data //
                indicator_data_list = response.data.indicator_data;
                let html = "";
                symbol_list.forEach(async function(symbol) {
                    html += `<tr><td scope="row" class="table-dark">${symbol}</td>`;
                    html += `<td scope="row" class="table-dark" style="font-size:13px;">${AllPairTrade.getBidAskPrice(symbol)}</td>`;
                    indicator_setting_list.forEach(function(indicator_setting) {
                        html += AllPairTrade.getIndicatorDataFromObj(symbol,indicator_setting);
                    });
                    html += `<td>${AllPairTrade.getWeightProgressBar(symbol)}</td>`;
                    html += `<td>${AllPairTrade.getTrendStatus(symbol)}</td>`;
                    html += `<td>
                                <button id="${symbol}_BUY_BTN" type="button" class="btn ${AllPairTrade.getBtnColor(symbol,'BUY')} btn-sm" onclick="AllPairTrade.executeOrder('${symbol}','BUY')">Buy</button>
                                <button id="${symbol}_SELL_BTN" type="button" class="btn ${AllPairTrade.getBtnColor(symbol,'SELL')} btn-sm" onclick="AllPairTrade.executeOrder('${symbol}','SELL')">Sell</button>
                            </td>`;
                    html += `</tr>`;
                });

                previous_symbol_data_list = symbol_data_list;
                $('#indicator_data_tbody').html(html);
            
                if(is_first_run == true){
                    $('#indicator_table').show();
                    $('#indicator_data_thead').html(table_header)
                    is_first_run = false;
                    Root.closePopup();
                }
            }
        }
    });
}

AllPairTrade.getBtnColor = function(symbol,type){
    if(type=="BUY"){
        if(is_already_click_buy_btn[symbol] == true){
            return 'btn-secondary';
        }else{
            return 'btn-success';
        }
    }else if(type=="SELL"){
        if(is_already_click_sell_btn[symbol] == true){
            return 'btn-secondary';
        }else{
            return 'btn-danger';
        }
    }

}

AllPairTrade.executeOrder = function(symbol,type){
    // Send Order To API //
    let lot = document.getElementById('lot_input').value;
    $.ajax({
        type: "post",
        data: {
            type,
            symbol,
            lot,
            trade_system : "all_pair_trading",
            order_id : Root.randomStr(5),
            order_group_id,
        },
        url: BASE_URL + "/api/Order/userExecuteOrder",
        success: function (response) {
            if(response.status.code == 200){
                // Success //
                Root.showPopupUpRightCorner(`success`,`${type} ${symbol} (Lot ${lot}) Success.`)
                if(type=="BUY"){
                    $(`#${symbol}_${type}_BTN`).removeClass('btn-success');
                    $(`#${symbol}_${type}_BTN`).addClass('btn-secondary');
                    is_already_click_buy_btn[symbol] = true;
                }else if(type=="SELL"){
                    $(`#${symbol}_${type}_BTN`).removeClass('btn-danger');
                    $(`#${symbol}_${type}_BTN`).addClass('btn-secondary');
                    is_already_click_sell_btn[symbol] = true;
                }
            }else{
                Root.showPopupUpRightCorner(`error`,`userExecuteOrder: ${response.status.description}`)
            }
        }
    });
    
}

AllPairTrade.getBidAskPrice = function(symbol, with_style = true){
    let bid = parseFloat(symbol_data_list[symbol]['price_bid']).toFixed(symbol_data_list[symbol]['digits']);
    let ask = parseFloat(symbol_data_list[symbol]['price_ask']).toFixed(symbol_data_list[symbol]['digits']);
    let color_bid = "white";
    let color_ask = "white";
    if(is_first_run == false){
        let prv_bid = parseFloat(previous_symbol_data_list[symbol]['price_bid']).toFixed(previous_symbol_data_list[symbol]['digits']);
        let prv_ask = parseFloat(previous_symbol_data_list[symbol]['price_ask']).toFixed(previous_symbol_data_list[symbol]['digits']);
        if(bid>prv_bid){
            color_bid = "lime";
        }else if(bid<prv_bid){
            color_bid = "red";
        }
        if(ask>prv_ask){
            color_ask = "lime";
        }else if(ask<prv_ask){
            color_ask = "red";
        }
    }

    if(with_style == true){
        return `<font color="${color_bid}">${bid}</font><br><font color="${color_ask}">${ask}</font>`;
    }else{
        return bid; // Default Return Value == BID //
    }
}

AllPairTrade.getStochZoneAndDirection = function(stoch_main, stoch_signal){
    let return_data = {
        'zone': 0,
        'direction': 'UNKNOWN'
    }
    if(stoch_signal >= 90){
        return_data.zone = -2;
    }else if(stoch_signal >= 75){
        return_data.zone = -1;
    }else if(stoch_signal >= 50){
        return_data.zone = -0.5;
    }else if(stoch_signal >= 25){
        return_data.zone = 0.5;
    }else if(stoch_signal >= 10){
        return_data.zone = 1;
    }else if(stoch_signal >= 0){
        return_data.zone = 2;
    }
    if(stoch_main > stoch_signal){
        return_data.direction = 'UP'
    }else{
        return_data.direction = 'DOWN'
    }

    return return_data;
}

AllPairTrade.getTrendStatus = function(symbol){
    let summary_text = `<font color="white">UNKNOWN</font>`;
    let current_price = AllPairTrade.getBidAskPrice(symbol, false);

    // 1. Get EMA200 => Main Trend //
    let ema200trend = '';
    let ema200 = AllPairTrade.getIndicatorDataFromObj(symbol, {'indicator_name' : 'MA','indicator_settings' : {'period':'200','apply_to':'PRICE_CLOSE','method':'MODE_SMA'},'value' : 'main_value','decimal':null}, false);
    if(current_price > ema200){
        ema200trend = `UP`
    }else{
        ema200trend = `DOWN`
    }   

    // 2. Check Stochastic Zone //
    let stoch_main = AllPairTrade.getIndicatorDataFromObj(symbol, {'indicator_name' : 'STOCHASTIC','indicator_settings' : {'k_period':'5','d_period':'3','slowing':'3','price_field':'LOW_HIGH','method':'MODE_SMA'},'value' : 'mode_main','decimal':'2'}, false);
    let stoch_signal = AllPairTrade.getIndicatorDataFromObj(symbol, {'indicator_name' : 'STOCHASTIC','indicator_settings' : {'k_period':'5','d_period':'3','slowing':'3','price_field':'LOW_HIGH','method':'MODE_SMA'},'value' : 'mode_signal','decimal':'2'}, false);
    let stoch_data = AllPairTrade.getStochZoneAndDirection(stoch_main, stoch_signal);

    // 3. Check ADX Zone (Implement Later) //

    // Summarize Data //
    if(ema200trend == stoch_data.direction){
        if([-2,2].includes(stoch_data.zone)){
            summary_text = `<font color="lime">STRONG FOLLOW</font>`;
        }else if([-1,1].includes(stoch_data.zone)){
            summary_text = `<font color="green">FOLLOW</font>`;
        }else{
            summary_text = `<font color="yellow">SIDEWAY</font>`;
        }
    }else{
        summary_text = `<font color="red">RETRACE</font>`;
    }

    return summary_text;
    
    // If 1=2=3 => STRONG FOLLOW //
    // If 1=3 & 1!=2 => FOLLOW //
    // If 1!=2!=3 => RETRACE (Not Safe For Trade) //
}

AllPairTrade.getWeightProgressBar = function(symbol){
    let prefix = `${symbol}_${timeframe}`;
    let sum_weight = 0;

    let max_weight = [];
    let weight_percent = [];
    weight_percent['adx'] = 20;
    max_weight['adx'] = 4*3;

    weight_percent['stochastic'] = 20;
    max_weight['stochastic'] = 2;

    weight_percent['cci'] = 20;
    max_weight['cci'] = 2;

    weight_percent['ma'] = 40;
    max_weight['ma'] = 3.5;

    /*  [1] adx (weight_percent = 20%) (max_weight = 4*3 = 12)
        criteria: 
            main { 
                0-25 อ่อนแรง (1)
                25-50 แข็งแรง (2)
                50+ แข็งแรงมาก (3)
            }

            plusdi, minusdi {
                0-15 อ่อนแรง (1)
                15-25 ก่อตัว (2)
                25-50 แข็งแรง (3)
                50+ แข็งแรงมาก (4)
            }
    */

    let adx_weight = 0;

    let adx_main = temp_data_for_cal_weight[`${prefix}_ADX_mode_main`];
    let adx_plusdi = temp_data_for_cal_weight[`${prefix}_ADX_mode_plusdi`];
    let adx_minusdi = temp_data_for_cal_weight[`${prefix}_ADX_mode_minusdi`];

    if(adx_plusdi > adx_minusdi){
        if(adx_plusdi >= 50){
            adx_weight = 4;
        }else if(adx_plusdi >= 25){
            adx_weight = 3;
        }else if(adx_plusdi >= 15){
            adx_weight = 2;
        }else if(adx_plusdi >= 0){
            adx_weight = 1;
        }
    }else{
        if(adx_minusdi >= 50){
            adx_weight = -4;
        }else if(adx_minusdi >= 25){
            adx_weight = -3;
        }else if(adx_minusdi >= 15){
            adx_weight = -2;
        }else if(adx_minusdi >= 0){
            adx_weight = -1;
        }
    }

    if(adx_main >= 50){
        adx_weight = adx_weight*3;
    }else if(adx_main >= 25){
        adx_weight = adx_weight*2;
    }else if(adx_main >= 0){
        adx_weight = adx_weight*1;
    }

    /*  [2] stochastic (weight_percent = 20%) (max_weight = 4*3 = 12)
        criteria: 
            main { 
                0-10 super oversold (2)
                10-25 oversold (1)
                25-50 middle sell (0.5)
                50-75 middle buy (-0.5)
                75-90 overbought (-1)
                90-100 super overbought (-2)
            }
    */

    let stoch_weight = 0;

    let stoch_signal = temp_data_for_cal_weight[`${prefix}_STOCHASTIC_mode_signal`];
    if(stoch_signal >= 90){
        stoch_weight = -2;
    }else if(stoch_signal >= 75){
        stoch_weight = -1;
    }else if(stoch_signal >= 50){
        stoch_weight = -0.5;
    }else if(stoch_signal >= 25){
        stoch_weight = 0.5;
    }else if(stoch_signal >= 10){
        stoch_weight = 1;
    }else if(stoch_signal >= 0){
        stoch_weight = 2;
    }

    /*  [3] cci (weight_percent = 20%) (max_weight = 2)
        criteria: 
            main { 
                มากกว่า 90 : 2
                0 - 90 : 1
                -90 - 0 : -1
                น้อยกว่า -90 : -2
            }
    */

    let cci_weight = 0;

    let cci_main = temp_data_for_cal_weight[`${prefix}_CCI_main_value`];
    if(cci_main >= 90){
        cci_weight = 2;
    }else if(cci_main >= 0){
        cci_weight = 1;
    }else if(cci_main >= -90){
        cci_weight = -1;
    }else{
        cci_weight = -2;
    }       
    
    /*  [4] ma (weight_percent = 40%) (max_weight = 3.5)
        criteria: 
            SMA50: 0.5
            SMA100: 1
            SMA200: 2
    */

    let ma_weight = 0;

    let sma50 = temp_data_for_cal_weight[`${prefix}_MA_MODE_SMA_50_main_value`];
    let sma100 = temp_data_for_cal_weight[`${prefix}_MA_MODE_SMA_100_main_value`];
    let sma200 = temp_data_for_cal_weight[`${prefix}_MA_MODE_SMA_200_main_value`];
    let c_price = symbol_data_list[symbol][MA_COMPARE_PRICE];
    if(c_price > sma50){
        ma_weight += 0.5;
    }else{
        ma_weight += -0.5;
    }
    if(c_price > sma100){
        ma_weight += 1;
    }else{
        ma_weight += -1;
    }
    if(c_price > sma200){
        ma_weight += 2;
    }else{
        ma_weight += -2;
    }

    // summerize all indicator weight //
    sum_weight += (adx_weight/max_weight['adx'])*weight_percent['adx'];
    sum_weight += (stoch_weight/max_weight['stochastic'])*weight_percent['stochastic'];
    sum_weight += (cci_weight/max_weight['cci'])*weight_percent['cci'];
    sum_weight += (ma_weight/max_weight['ma'])*weight_percent['ma'];

    let weight_color = '';
    if(sum_weight >= 0){
        weight_color = 'bg-success';
    }else{
        weight_color = 'bg-danger';
    }

    return `<div class="progress" style="height:30px; line-height: 30px;">
        <div class="progress-bar ${weight_color}" role="progressbar" aria-valuenow="${Math.abs(sum_weight)}" aria-valuemin="0" aria-valuemax="100" style="width: ${Math.abs(sum_weight)}%;"></div>
        <div class="progress-bar-title" style="font-family: Helvetica, sans-serif; color:black; font-size: 15px;"><b>${parseFloat(Math.abs(sum_weight)).toFixed(2)}%</b></div>
    </div>`;
}

AllPairTrade.getIndicatorDataFromObj = function(symbol,request_settings, with_style = true){
    let indicator_value = "-";
    indicator_data_list.forEach(function(indicator_data) {
        if(indicator_data.symbol == symbol
            && indicator_data.timeframe == timeframe
            && indicator_data.indicator_name == request_settings.indicator_name
            && AllPairTrade.compareIndicatorSettings(request_settings.indicator_settings,indicator_data.indicator_settings)){
                indicator_value =  indicator_data['value'][request_settings.value];
                
                    let val = request_settings.value;
                    if(request_settings.indicator_name == 'MA'){
                        val = request_settings.indicator_settings.method+'_'+request_settings.indicator_settings.period+'_'+request_settings.value;
                    }
                    
                    let key = `${symbol}_${timeframe}_${request_settings.indicator_name}_${val}`;
                    temp_data_for_cal_weight[key] = indicator_value;
        }

    });

    if(with_style == false){
        return indicator_value;
    }

    if(isNaN(indicator_value)){
        return `<th scope="row" style="background:grey">${indicator_value}</th>`;
    }else{
        return AllPairTrade.getIndicatorCellStyle(request_settings, indicator_value, symbol);
    }
}

AllPairTrade.getIndicatorCellStyle = function(request_settings, indicator_value, symbol){
    let return_with_fixed = "";
    if(request_settings.decimal>0){
        return_with_fixed = indicator_value.toFixed(request_settings.decimal);
    }else{
        return_with_fixed = indicator_value;
    }
    
    // add black border between indicator cell //
    let border = ``;
    if((request_settings.indicator_name == 'STOCHASTIC' && request_settings.value == 'mode_signal') ||
    (request_settings.indicator_name == 'CCI' && request_settings.value == 'main_value') || 
    (request_settings.indicator_name == 'ADX' && request_settings.value == 'mode_minusdi')  ){
        border = `border-right: 4px solid black;`;
    }
    if(request_settings.indicator_name == "MA"){
        return  `${AllPairTrade.getMADirection(symbol,return_with_fixed)}`;
    }else{
        return  `<td scope="row" style="${border} background:${Formatter.getIndicatorColor(request_settings,indicator_value)}">${return_with_fixed}</td>`;
    }
}

AllPairTrade.getMADirection = function(symbol, ma_price){
    let previous_price = symbol_data_list[symbol][MA_COMPARE_PRICE]; // Compare With Previous Price
    if(!isNaN(previous_price)){
        let diff_points = Formatter.getDiffPoints(symbol_data_list[symbol]['digits'],previous_price,ma_price);
        if(ma_price < previous_price){
            return `<td scope="row" style="background:#71FFE0;"><i class="fas fa-arrow-up" style="color:lime"></i> ${diff_points}</td>`;
        }else if(ma_price > previous_price){
            return `<td scope="row" style="background:#FFAE73;"><i class="fas fa-arrow-down" style="color:red;"></i> ${diff_points}</td>`;
        }else{
            return `<td scope="row"  style="background:grey;">${diff_points}</td>`;
        }
    }else{
        return '';
    }
}

AllPairTrade.compareIndicatorSettings = function(request_settings, indicator_data){
    if(Object.keys(request_settings).length != Object.keys(indicator_data).length){
        return false;
    }
    let is_equal = true;
    let request_keys = Object.keys(request_settings);
    request_keys.forEach(function(keys) {
        if(request_settings[keys] != indicator_data[keys]){
            is_equal = false;
        }
    });
    return is_equal;
}


