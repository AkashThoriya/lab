<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>@yield('title')</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="_token" content="{{ csrf_token() }}">
  <link rel="icon" href="{{ asset('img/logo.png') }}" type="image/x-icon" />
    <!-- include css -->
  @include('layout.css')
    <style>
        .control-label-form{
            color: #000b16 !important;
            font-weight: normal !important;
        }
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #ededed;
        }
        ::-webkit-scrollbar-thumb {
            background: #b0b0b0;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #777;
        }

    </style>
</head>
{{--sidebar-collapse--}}
{{-- hold-transition sidebar-mini --}}
{{-- sidebar-mini layout-fixed gorgias-loaded --}}

<body class="sidebar-mini layout-fixed sidebar-collapse gorgias-loaded">
<div class="loading" id="loader" style="display: none;"></div>

<div class="wrapper">



  <!-- include header -->
  @include('layout.header')

  <!-- include sidebar -->
  @include('layout.sidebar')

  <div class="content-wrapper">
    <input type="hidden" name="" id="url" value="{{ url('/') }}">
    @yield('content')
  </div>

   <!-- include sidebar -->
  @include('layout.footer')

   <!-- include sidebar -->
  @include('layout.script')



</div>
</body>
</html>
