@section('title', 'Add make')

@extends('layout.mainlayout')

@section('content')

    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h4>Add make</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                        <li class="breadcrumb-item"><a href="{{route('make.index')}}">View make</a></li>
                        <li class="breadcrumb-item active">Add make</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <section class="content">
        <div class="card mr-2 ml-2">
            <div class="card-body">
            <form action="{{ route('make.update', ['makeMaster' => $make]) }}" method="POST">    
   
                      @method('PATCH')
                      @include('masters.Make.form')
                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary mr-2">Update</button>
                        <a href="{{ URL::previous() }}" class="btn btn-default">Cancel</a>
                    </div>     
              </form>
            </div>
            <!-- /.card-body -->
        </div>
    </section>
@endsection