<script type="text/javascript" src="{{ asset('js/formatter.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/templates/strategies/all_pair_trade.js') }}"></script>
<div class="container" style="padding-top:20px">
    <ul class="nav nav-tabs" id="timeframe_tab" role="tablist"></ul>
    <br>

    <table id="indicator_detail_table" class="table table-bordered" style="border-radius: 40px; text-align: center;">
        <tbody>
            <tr class="table-dark">
                <th scope="col">Server&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;<img src="{{ asset('images/broker-logo/xm.png') }}" width="40px">&nbsp;&nbsp;&nbsp;<a id="server_name"></a></th>
                <th scope="col">Market Watch&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;<a id="server_time"></a> <a id="server_status"></a></th>
                <th scope="col">Random Code&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;<a id="random_code"></a>&nbsp;&nbsp;&nbsp;
                    <i class="fas fa-redo cursor-pointer" style="color:yellow;" onclick="AllPairTrade.refreshRandomStr();" aria-hidden="true"></i>
                </th>
            </tr>
        </tbody>
    </table>
    
    <table id="indicator_table" class="table table-bordered table-hover" style="border-radius: 40px; text-align: center;display:none;">
        <thead id="indicator_data_thead"></thead>
        <tbody id="indicator_data_tbody"></tbody>
    </table>
</div>