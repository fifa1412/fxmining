@include('header')
<script type="text/javascript" src="{{ asset('js/templates/active_order.js') }}"></script>
<div class="container" style="padding-top:50px">

<table class="table table-bordered table-active">
    <thead class="thead">
      <tr bgcol>
        <th scope="col">Ticket No</th>
        <th scope="col">Type</th>
        <th scope="col">Lot</th>
        <th scope="col">Symbol</th>
        <th scope="col">Open Price</th>
        <th scope="col">Current Price</th>
        <th scope="col">TP</th>
        <th scope="col">SL</th>
        <th scope="col">Swap</th>
        <th scope="col">Profit</th>
      </tr>
    </thead>
    <tbody id="active_order_tbody"></tbody>
  </table>
  

</div>

@include('footer')