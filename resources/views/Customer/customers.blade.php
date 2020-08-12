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
                        <a href="{{ route('addCustomer') }}" class="btn btn-default">Add New</a>
                </div>
            </div>
            <div class="card-body">
                    <table id="example1" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Detail Id</th>
                                    <th width="40%">Customer Name</th>
                                    <th>Electrotech</th>
                                    <th>Thermal</th>
                                    <th>Pressure</th>
                                    <th>Object</th>
                                    <th>WorkOrder</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><a href="" style="color: blue">100001_GJ_RJ</a></td>
                                    <td>Bhavid Technology Private Limited Rajkot</td>
                                    <td>Yes</td>
                                    <td>No</td>
                                    <td>Yes</td>
                                    <td>10</td>
                                    <td>20</td>
                                    <td>
                                        <a><i class="fa fa-pencil" style="color: grey"></i></a>&nbsp;&nbsp;
                                        <a><i class="fa fa-trash" style="color: grey"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                    </table>
                </div>
            </div>
            <!-- /.card-body -->
        </div>
    </section>
@endsection
