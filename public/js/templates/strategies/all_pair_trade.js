var AllPairTrade = {};

let timeframe = '';
let indicator_data_list = [];
let symbol_data_list = [];
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
        <th scope="col" rowspan=2>Order<br>Execution</th>
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
}, 5000);

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
        AllPairTrade.refreshIndicatorData();
        resolve();
    });
}

AllPairTrade.refreshIndicatorData = function(){
    $.ajax({
        type: "post",
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
                    html += `<td scope="row" class="table-dark" style="font-size:13px;">${symbol_data_list[symbol]['price_bid']}<br>${symbol_data_list[symbol]['price_ask']}</td>`;
                    indicator_setting_list.forEach(function(indicator_setting) {
                        html += AllPairTrade.getIndicatorDataFromObj(symbol,indicator_setting);
                    });
                    html += `<td>${AllPairTrade.getWeightProgressBar(symbol)}</td>`;
                    html += `<td>
                                <button type="button" class="btn btn-success btn-sm">Buy</button>
                                <button type="button" class="btn btn-danger btn-sm">Sell</button>
                            </td>`;
                    html += `</tr>`;
                });

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

AllPairTrade.getWeightProgressBar = function(symbol){
    return `<div class="progress" style="height:30px;">
                <div class="progress-bar bg-warning" role="progressbar" style="height:30px; width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">80%</div>
            </div>`;
}

AllPairTrade.getIndicatorDataFromObj = function(symbol,request_settings){
    let indicator_value = "-";
    indicator_data_list.forEach(function(indicator_data) {
        if(indicator_data.symbol == symbol
            && indicator_data.timeframe == timeframe
            && indicator_data.indicator_name == request_settings.indicator_name
            && AllPairTrade.compareIndicatorSettings(request_settings.indicator_settings,indicator_data.indicator_settings)){
                indicator_value =  indicator_data['value'][request_settings.value];
        }
        
    });
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
    if(request_settings.indicator_name == "MA"){
        return  `${AllPairTrade.getMADirection(symbol,return_with_fixed)}`;
    }else{
        return  `<td scope="row" style="background:${Formatter.getIndicatorColor(request_settings,indicator_value)}">${return_with_fixed}</td>`;
    }
}

AllPairTrade.getMADirection = function(symbol, ma_price){
    let previous_price = symbol_data_list[symbol][MA_COMPARE_PRICE]; // Compare With Previous Price
    if(!isNaN(previous_price)){
        let diff_points = Formatter.getDiffPoints(symbol_data_list[symbol]['digits'],previous_price,ma_price);
        if(ma_price > previous_price){
            return `<td scope="row" style="background:#71FFE0;"><i class="fas fa-arrow-up" style="color:lime"></i> ${diff_points}</td>`;
        }else if(ma_price < previous_price){
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


