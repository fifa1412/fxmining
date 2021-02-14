@include('header')
<script type="text/javascript" src="{{ asset('js/templates/dashboard.js') }}"></script>
<div class="container" style="padding-top:50px">

<table class="table table-dark">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Pair</th>
        <th scope="col">Today ADR</th>
        <th scope="col">%</th>
        <th scope="col">ADR(20)</th>
        <th scope="col">Bid</th>
        <th scope="col">Ask</th>
        <th scope="col">Long</th>
        <th scope="col">Short</th>
        <th scope="col">Spread</th>
        <th scope="col">Market Status</th>
        <th scope="col">Updated Time</th>
      </tr>
    </thead>
    <tbody id="pair_data_tbody"></tbody>
  </table>
  

</div>

@include('footer')