@section('title', 'Add Customer')

@extends('layout.mainlayout')

@section('content')

    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h4>View Customer</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                        <li class="breadcrumb-item active">View Customer</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <section class="content">
        <div class="card">
            <div class="card-header" style="">
                <div class="card-tools">
                        <a href="{{ route('customer.create') }}" class="btn btn-default">Add New</a>
                </div>
            </div>
            <div class="card-body">
                    <table id="example1" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Detail Id</th>
                                    <th width="40%">Customer Name</th>
                                    <th>Object</th>
                                    <th>WorkOrder</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                            @if($customers)
                                <?php $count = 1 ?>
                                    @foreach($customers as $customer)
                                        <tr>
                                            <td><a href="" style="color: blue">100001_GJ_RJ</a></td>
                                            <td>{{$customer->name}}</td>
                                            <td>10</td>
                                            <td>20</td>
                                            <td>
                                                <form action="{{ route('customer.destroy', ['customer' => $customer]) }}" method="POST">
                                                        <a href="{{ route('customer.edit', ['customer' => $customer]) }}"><i class="fa fa-pencil" style="color: grey"></i></a>&nbsp;&nbsp;

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
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                            {{$customers->links()}}
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.card-body -->
        </div>
    </section>
@endsection
