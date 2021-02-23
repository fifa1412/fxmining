<script type="text/javascript" src="{{ asset('js/templates/dashboard.js') }}"></script>
<div class="container" style="padding-top:50px">
<table id="status_table" class="table table-borderless " style="text-align: center; color: white; display:none;">
    <thead>
      <tr>
        <th scope="col" id="server_name"></th>
        <th scope="col" id="updated_time"></th>
      </tr>
    </thead>
</table>
<table id="dashboard_table" class="table table-dark table-bordered table-hover" style="border-radius: 40px; text-align: center;display:none;">
    <thead class="thead-dark">
      <tr style="background-color:#3B6B5E">
        <th scope="col" rowspan=2>Symbol</th>
        <th scope="col" colspan=3>Average Daily Range (ADR)</th>
        <th scope="col" colspan=2>Price</th>
        <th scope="col" colspan=2>Swap</th>
        <th scope="col" rowspan=2>Spread</th>
        <th scope="col" rowspan=2>Market<br>Status</th>
        <th scope="col" rowspan=2>Order<br>Execution</th>
      </tr>
      <tr>
        {{-- Average Daily Range --}}
        <th scope="col">Today<br>(Points)</th>
        <th scope="col">Today (%)</th>
        <th scope="col">20 Days<br>(Points)</th>
        {{-- Price --}}
        <th scope="col">Bid</th>
        <th scope="col">Ask</th>
        {{-- Swap --}}
        <th scope="col">Long</th>
        <th scope="col">Short</th>
      </tr>
    </thead>
    <tbody id="pair_data_tbody"></tbody>
</table>
</div>