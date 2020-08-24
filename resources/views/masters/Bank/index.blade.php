@section('title', 'View Bank')

@extends('layout.mainlayout')

@section('content')

    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h4>View Bank</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                        <li class="breadcrumb-item active">View Bank</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <section class="content">
        <div class="card">
            <div class="card-header" style="">
                <div class="card-tools">
                        <a class="btn btn-default" href="{{route('bank.create')}}">Add New</a>
                </div>
            </div>
            <div class="card-body">
                    <table id="example1" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="10%">Number</th>
                                    <th width="30%">Name</th>
                                    <th width="30%">Branch detail</th>
                                    <th width="20%">Account Name</th>
                                    <th width="10%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            @if($banks)
                                <?php $count = 1 ?>
                                @foreach($banks as $b)
                                    <tr>
                                        <td>{{$count}}</td>
                                        <td>{{$b->name}}</td>
                                        <td>{{$b->branch_detail}}</td>
                                        <td>{{$b->account_name}}</td>
                                        <td>
                                        <form action="{{ route('bank.destroy', ['bankMaster' => $b]) }}" method="POST">
                                                <a href="{{ route('bank.edit', ['bankMaster' => $b]) }}"><i class="fa fa-pencil" style="color: grey"></i></a>&nbsp;&nbsp;
                                            
                                                @method('DELETE')
                                                @csrf
                                                <button type="submit" style="border:none;"><i class="fa fa-trash" style="color: grey"></i></button>
                                        </form>
                                        
                                        </td>
                                    </tr>
                                    <?php $count++ ?>
                                @endforeach
                            @endif
                            </tbody>
                    </table>
                </div>
            </div>
            <!-- /.card-body -->
        </div>
    </section>
    
@endsection
