<!-- Load Bootstrap -->
<link href="{{ asset('bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
<script src="{{ asset('bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<script src="{{ asset('js/libs/jquery.min.js')}}"></script>
<script src="{{ asset('js/libs/sweetalert2.js')}}"></script>
<script src="{{ asset('js/libs/font-awesome/js/all.js')}}"></script>

<script type="text/javascript" src="{{ asset('js/global_variable.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/root.js') }}"></script>

<link rel="stylesheet" href="{{ asset('js/libs/notific.css')}}"/>
<script src="{{ asset('js/libs/notific.js')}}"></script>

<head>
    <title>FX Mining</title>
    <link rel="icon" href="{{asset('images/logo.png')}}">
</head>

<style>
    .cursor-pointer{
        cursor: pointer;
    }
    .progress {
        position: relative;
    }
    .progress-bar-title {
        position: absolute;
        text-align: center;
        overflow: hidden;
        color: #fff;
        right: 0;
        left: 0;
        top: 0;
    }
</style>

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
                <li class="nav-item"><a class="nav-link" href="{{url('active_group_order')}}">Order Group Management</a></li>
                <li class="nav-item"><a class="nav-link" href="{{url('strategies/all_pair_trade')}}">หว่านแห Order</a></li>
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