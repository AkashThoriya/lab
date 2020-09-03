@section('title', 'Add Quotation')

@extends('layout.mainlayout')

@section('content')

    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h4>Add Quotation</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                        <li class="breadcrumb-item"><a href="{{route('quotation.index')}}">View Quotation</a></li>
                        <li class="breadcrumb-item active">Add Quotation</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <section class="content">
        <div class="card mr-2 ml-2">
            <div class="card-body">
                <form role="form" method="post" action="{{route('quotation.store')}}">
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

                            <div class="row mt-4" id="AddRow1">
                                <div class="form-group col-md-4">
                                    <label class="control-label-form " for="make">Select Equipment</label>
                                    <select name="make_master_id1" id="make_master_id1" class="form-control">
                                        <option>Select Equipment</option>
                                        @if($items)
                                            @foreach($items as $i)
                                                <option value="{{$i->id}}">{{$e->name}}</option>
                                            @endforeach
                                        @endif
                                    </select>
                                </div>
                                <div class="form-group col-md-2 col-sm-12">
                                    <label class="control-label-form" for="model_no">Rate</label>
                                    <input type="text" class="form-control" id="model_no1" name="model_no1">
                                </div>
                                <div class="form-group col-md-2 col-sm-12">
                                    <label class="control-label-form" for="Serial_no">SGST</label>
                                    <input type="text" class="form-control" id="serial_no1" name="serial_no1">
                                </div>
                                <div class="form-group col-md-2 col-sm-12">
                                    <label class="control-label-form" for="Serial_no">CGST</label>
                                    <input type="text" class="form-control" id="serial_no1" name="serial_no1">
                                </div>
                                <div class="form-group col-md-2 col-sm-12">
                                    <label class="control-label-form" for="Serial_no">Final Price</label>
                                    <input type="text" class="form-control" id="serial_no1" name="serial_no1">
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

    let html = '<div class="row mt-4" id="AddRow'+count+'"><div class="form-group col-md-4"><label class="control-label-form " for="make">Select Equipment</label><select name="make_master_id'+count+'" id="make_master_id'+count+'" class="form-control"><option>Select Equipment</option> @if($items) @foreach($items as $i) <option value="{{$i->id}}">{{$e->name}}</option> @endforeach @endif </select></div><div class="form-group col-md-2"><label class="control-label-form" for="model_no">Rate</label><input type="text" class="form-control" id="model_no'+count+'" name="model_no'+count+'"></div><div class="form-group col-md-2"><label class="control-label-form" for="Serial_no">SGST</label><input type="text" class="form-control" id="serial_no'+count+'" name="serial_no'+count+'"></div><div class="form-group col-md-2"><label class="control-label-form" for="Serial_no">CGST</label><input type="text" class="form-control" id="serial_no'+count+'" name="serial_no'+count+'"></div><div class="form-group col-md-2"><label class="control-label-form" for="Serial_no">Final Price</label><input type="text" class="form-control" id="serial_no'+count+'" name="serial_no'+count+'"></div></div>';

    $('#itemCount').html(count);
    $('#AddRow' + (count - 1) + '').after(html);
}

function deleteItem(count) {
    $('#rowId' + count).remove();
}

</script>
@endpush
@endsection
