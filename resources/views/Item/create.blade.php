@section('title', 'Add Item')

@extends('layout.mainlayout')

@section('content')

    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h4>Add Item</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                        <li class="breadcrumb-item"><a href="{{route('item.index')}}">View Item</a></li>
                        <li class="breadcrumb-item active">Add Item</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <section class="content">
        <div class="card mr-2 ml-2">
            <div class="card-body">
                <form role="form" method="post" action="{{route('item.store')}}">
                    @csrf

                        <div class="card-body container-item">

                            <div class="col-md-5">
                                <div class="form-group">
                                    <label class="control-label-form" for="Customer">Select Customer</label>
                                    <select name="customer_id" id="customer_id" class="form-control">
                                        <option></option>
                                        @if($customers)
                                            @foreach($customers as $customer)
                                                <option value="{{$customer->id}}">{{$customer->name}}</option>
                                            @endforeach
                                        @endif
                                    </select>
                                </div>
                            </div>

                            <div class="row mt-3"></div>
                            <hr>

                            <div class="row mt-4">
                                <div class="form-group col-md-4 col-sm-12">
                                    <label class="control-label-form" for="equipment_name">Equipment Name</label>
                                    <input type="text" class="form-control" id="equipment_name1" name="equipment_name1">
                                </div>
                                <div class="form-group col-md-2">
                                    <label class="control-label-form " for="make">Select Make</label>
                                    <select name="make_master_id1" id="make_master_id1" class="form-control">
                                        <option>Select make</option>
                                        @if($make)
                                            @foreach($make as $m)
                                                <option value="{{$m->id}}">{{$m->name}}</option>
                                            @endforeach
                                        @endif
                                    </select>
                                </div>
                                <div class="form-group col-md-3 col-sm-12">
                                    <label class="control-label-form" for="model_no">Model Number</label>
                                    <input type="text" class="form-control" id="model_no1" name="model_no1">
                                </div>
                                <div class="form-group col-md-3 col-sm-12">
                                    <label class="control-label-form" for="Serial_no">Serial Number</label>
                                    <input type="text" class="form-control" id="serial_no1" name="serial_no1">
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="form-group col-md-2 col-sm-12">
                                    <label class="control-label-form" for="calibration_range">Calibration Range</label>
                                    <input type="text" class="form-control" id="calibration_range1" name="calibration_range1">
                                </div>
                                <div class="form-group col-md-2 col-sm-12">
                                    <label class="control-label-form" for="no_of_points">No of Points</label>
                                    <input type="text" class="form-control" id="no_of_points1" name="no_of_points1">
                                </div>
                                <div class="form-group col-md-3 col-sm-12">
                                    <label class="control-label-form" for="calibration_value_of_each_point">Calibration value of each point</label>
                                    <input type="text" class="form-control" id="calibration_value_of_each_point1" name="calibration_value_of_each_point1">
                                </div>
                                <div class="form-group col-md-3 col-sm-12">
                                    <label class="control-label-form" for="least_count_for_readout">Least count for readout</label>
                                    <input type="text" class="form-control" id="least_count_for_readout1" name="least_count_for_readout1">
                                </div>
                                <div class="form-group col-md-2 col-sm-12">
                                    <label class="control-label-form" for="accuracy">Accuracy</label>
                                    <input type="text" class="form-control" id="accuracy1" name="accuracy1">
                                </div>
                            </div>

                            <div class="row mt-4" id="AddRow1">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label-form">Additional detail</label>
                                            <textarea class="form-control" rows="2" name="additional_detail1" id="additional_detail1"></textarea>
                                        </div>
                                    </div>
                            </div>

                            <label>Equipment count&nbsp;:&nbsp;</label><label id="itemCount">1</label>
                        </div>


                    <div class="card-footer">
                        <Button class="btn btn-warning mr-2 " type="button" onclick="addNewItem()">Add Equipment</Button>
                        <button type="submit" class="btn btn-primary mr-2">Save</button>
                        <a href="{{ URL::previous() }}" class="btn btn-default">Cancel</a>
                    </div>
                    <input type="hidden" name="count" id="count">
                </form>
            </div>
            <!-- /.card-body -->
        </div>
    </section>

@push('script')
<script type="text/javascript">

function addNewItem() {
    if ($('#count').val() != '') {
        count = $('#count').val();
    }
    else {
        count = 1;
    }
    count++;
    $('#count').val(count);

    let html = '<div id="rowId' + count + '"><div class="row mt-3"></div><hr><div class="row mt-4"><div class="form-group col-md-4 col-sm-12"><label class="control-label-form" for="equipment_name">Equipment Name</label><input type="text" class="form-control" id="equipment_name' + count + '" name="equipment_name' + count + '"></div><div class="form-group col-md-2"><label class="control-label-form " for="make">Select Make</label><select name="make_master_id' + count + '" id="make_master_id' + count + '" class="form-control"><option>Select make</option> @if($make) @foreach($make as $m) <option value="{{$m->id}}">{{$m->name}}</option>@endforeach @endif</select></div><div class="form-group col-md-3 col-sm-12"><label class="control-label-form" for="model_no">Model Number</label><input type="text" class="form-control" id="model_no' + count + '" name="model_no' + count + '"></div><div class="form-group col-md-3 col-sm-12"><label class="control-label-form" for="Serial_no">Serial Number</label><input type="text" class="form-control" id="serial_no' + count + '" name="serial_no' + count + '"></div></div><div class="row mt-4"><div class="form-group col-md-2 col-sm-12"><label class="control-label-form" for="calibration_range">Calibration Range</label><input type="text" class="form-control" id="calibration_range' + count + '" name="calibration_range' + count + '"></div><div class="form-group col-md-2 col-sm-12"><label class="control-label-form" for="no_of_points">No of Points</label><input type="text" class="form-control" id="no_of_points' + count + '" name="no_of_points' + count + '"></div><div class="form-group col-md-3 col-sm-12"><label class="control-label-form" for="calibration_value_of_each_point">Calibration value of each point</label><input type="text" class="form-control" id="calibration_value_of_each_point' + count + '" name="calibration_value_of_each_point' + count + '"></div><div class="form-group col-md-3 col-sm-12"><label class="control-label-form" for="least_count_for_readout">Least count for readout</label><input type="text" class="form-control" id="least_count_for_readout' + count + '" name="least_count_for_readout' + count + '"></div><div class="form-group col-md-2 col-sm-12"><label class="control-label-form" for="accuracy">Accuracy</label><input type="text" class="form-control" id="accuracy' + count + '" name="accuracy' + count + '"></div></div><div class="row mt-4" id="AddRow' + count + '"><div class="col-md-5"><div class="form-group"><label class="control-label-form">Additional detail</label><textarea class="form-control" rows="2" name="additional_detail' + count + '" id="additional_detail' + count + '"></textarea></div></div><div><button class="btn btn-sm btn-danger text-white" style="margin-top: 40px" type="button" onclick="deleteItem(' + count + ')">Remove</button></div></div></div>';

    $('#itemCount').html(count);
    $('#AddRow' + (count - 1) + '').after(html);
}

function deleteItem(count) {
    $('#rowId' + count).remove();
}

</script>
@endpush
@endsection
