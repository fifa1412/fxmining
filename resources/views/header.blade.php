<!-- Load Bootstrap -->
<link href="{{ asset('bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
<script src="{{ asset('bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<script src="{{ asset('js/jquery.min.js')}}"></script>
<script src="{{ asset('js/sweetalert2.js')}}"></script>

<!-- Navbar Content -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <img src="{{asset('images/logo.png')}}" width="40px" height="40px" style="margin-right:10px;">

        <a class="navbar-brand" href="{{url('dashboard')}}" style="color:lime;">FX Mining</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link active" aria-current="page" href="{{url('dashboard')}}">Currency Dashboard</a></li>
                <li class="nav-item"><a class="nav-link" href="{{url('active_order')}}">Order Management</a></li>
                <li class="nav-item"><a class="nav-link" href="{{url('adr')}}">Average Daily Range</a></li>
                <li class="nav-item"><a class="nav-link" href="{{url('database')}}">Database Status</a></li>
            </ul>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>