@section('title', 'Add Item')

@extends('layout.mainlayout')

@section('content')

    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                <h4>View Item</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                        <li class="breadcrumb-item active">View Item</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <section class="content">
        <div class="card">
            <div class="card-header" style="">
                <div class="card-tools">
                        <a href="{{ route('item.create') }}" class="btn btn-default">Add New</a>
                </div>
            </div>
            <div class="card-body">
                    <table id="example1" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="40%">Equipment name</th>
                                    <th width="20%">Customer name</th>
                                    <th>Make</th>
                                    <th>Model No</th>
                                    <th>Serial No</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                            @if($items)
                                <?php $count = 1 ?>
                                    @foreach($items as $item)
                                        <tr>
                                            <td><a href="" style="color: blue">{{$item->equipment_name}}</a></td>
                                            <td>{{$item->customer->name}}</td>
                                            <td>{{$item->make->name}}</td>
                                            <td>{{$item->model_no}}</td>
                                            <td>{{$item->serial_no}}</td>
                                            <td>
                                                <form action="{{ route('item.destroy', ['item' => $item]) }}" method="POST">
                                                        <a href="{{ route('item.edit', ['item' => $item]) }}"><i class="fa fa-pencil" style="color: grey"></i></a>&nbsp;&nbsp;

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
                            {{$items->links()}}
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.card-body -->
        </div>
    </section>
@endsection
