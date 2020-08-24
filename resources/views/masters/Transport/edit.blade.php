@section('title', 'Add transport')

@extends('layout.mainlayout')

@section('content')

    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h4>Add transport</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                        <li class="breadcrumb-item"><a href="{{route('transport.index')}}">View transport</a></li>
                        <li class="breadcrumb-item active">Add transport</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <section class="content">
        <div class="card mr-2 ml-2">
            <div class="card-body">
            <form action="{{ route('transport.update', ['transportMaster' => $transport]) }}" method="POST">    
   
                      @method('PATCH')
                      @include('masters.Transport.form')
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