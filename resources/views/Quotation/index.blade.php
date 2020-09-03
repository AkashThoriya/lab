@section('title', 'Add Quotation')

@extends('layout.mainlayout')

@section('content')

    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                <h4>View Quotation</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                        <li class="breadcrumb-item active">View Quotation</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <section class="content">
        <div class="card">
            <div class="card-header" style="">
                <div class="card-tools">
                        <a href="{{ route('quotation.create') }}" class="btn btn-default">Add New</a>
                </div>
            </div>
            <div class="card-body">
                    <table id="example1" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="40%">Equipment name</th>
                                    <th width="20%">Customer name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                            @if($quotations)
                                <?php $count = 1 ?>
                                    @foreach($quotations as $quotation)
                                        <tr>
                                            <td><a href="" style="color: blue">{{$quotation->name}}</a></td>
                                            <td>{{$quotation->customer->name}}</td>
                                            <td>
                                                <form action="{{ route('quotation.destroy', ['quotation' => $quotation]) }}" method="POST">
                                                        <a href="{{ route('quotation.edit', ['quotation' => $quotation]) }}"><i class="fa fa-pencil" style="color: grey"></i></a>&nbsp;&nbsp;

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
                            {{$quotations->links()}}
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.card-body -->
        </div>
    </section>
@endsection
