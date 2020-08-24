@section('title', 'Add Customer')

@extends('layout.mainlayout')

@section('content')

    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h4>Add Customer</h4>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="{{route('home')}}">Home</a></li>
                        <li class="breadcrumb-item"><a href="{{route('customer')}}">View Customer</a></li>
                        <li class="breadcrumb-item active">Add Customer</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <section class="content">
        <div class="card mr-2 ml-2">
            <div class="card-body">
                <form role="form" method="post" action="{{route('addCustomer')}}">

                    <div class="card-body">

                        <div class="row">
                            <div class="form-group col-md-5 col-sm-12">
                                <label class="control-label-form" for="CustomerName">Customer Name</label>
                                <input type="text" class="form-control" id="CustomerName" name="CustomerName" placeholder="Enter Customer Name">
                            </div>
                            <div class="form-group col-md-3 col-sm-12">
                                <label class="control-label-form" for="CustomerName">Site Name</label>
                                <input type="text" class="form-control" id="SiteName" name="SiteName" placeholder="Enter Site Name">
                            </div>
                            <div class="form-group col-md-2 col-sm-12">
                                <label class="control-label-form" for="PanNumber">Pan Number</label>
                                <input type="text" class="form-control" id="PanNumber" name="PanNumber" placeholder="Enter Pan Number">
                            </div>
                            <div class="form-group col-md-2 col-sm-12">
                                <label class="control-label-form" for="gstin">GST Number</label>
                                <input type="text" class="form-control" id="gstin" name="gstin" placeholder="Enter GST Number">
                            </div>
                        </div>

                        <div class="row mt-3"></div>
                        <hr>

                        <div class="row mt-4">
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <label class="control-label-form">Billing Address</label>
                                        <textarea class="form-control" rows="3" name="BillingAddress" placeholder="Enter Billing Address"></textarea>
                                    </div>
                                </div>

                            <div class="col-md-1"></div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <label class="control-label-form">Shipping Address</label>
                                        <textarea class="form-control" rows="3" name="ShippingAddress" placeholder="Enter Shipping Address"></textarea>
                                    </div>
                                </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-5">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label-form" for="State">State</label>
                                            <select id="BState" name="BState" class="form-control">
                                                <option>Billing State</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-1"></div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                                <label class="control-label-form" for="City">City</label>
                                                <input type="text" class="form-control" id="BCity" name="BCity" placeholder="Billing City Name">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-1"></div>
                            <div class="col-md-5">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label-form" for="State">State</label>
                                            <select id="SState" name="SState" class="form-control">
                                                <option>Shipping State</option>
                                            </select>
                                        </div>
                                    </div>
                                <div class="col-md-1"></div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label-form" for="City">City</label>
                                            <input type="text" class="form-control" id="SCity" name="SCity" placeholder="Shipping City Name">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row mt-3">
                            <div class="col-md-5">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label-form" for="Pincode">Pincode</label>
                                            <input type="text" class="form-control" id="BPincode" name="BPincode" placeholder="Billing Pincode">
                                        </div>
                                    </div>

                                <div class="col-md-1"></div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label-form">Landline Number</label>
                                            <input type="text" class="form-control" id="LandlineNumber" name="LandlineNumber" placeholder="Landline Number">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-1"></div>
                            <div class="col-md-5">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label-form" for="Pincode">Pincode</label>
                                            <input type="text" class="form-control" id="SPincode" name="SPincode" placeholder="Shipping Pincode">
                                        </div>
                                    </div>

                                    <!-- <div class="col-md-1"></div>
                                    <div class="form-group col-md-5 mt-4">
                                          <input type="checkbox" id="checkboxSuccess1">
                                          <label for="checkboxSuccess1" class="control-label-form">
                                              &nbsp;&nbsp;Copy Billing to Shipping
                                          </label>
                                      </div> -->
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-5">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label-form">Mobile Number 1</label>
                                            <input type="number" class="form-control" id="MobileNumber1" name="MobileNumber1" placeholder="Enter Mobile Number">
                                        </div>
                                    </div>

                                    <div class="col-md-1"></div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="control-label-form">Mobile Number 2</label>
                                            <input type="number" class="form-control" id="MobileNumber2" name="MobileNumber2" placeholder="Enter Mobile Number">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-1"></div>
                            <div class="col-md-5">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label-form">Company E-mail 1</label>
                                            <input type="email" class="form-control" id="Email1" name="Email1" placeholder="Enter Company E-mail">
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="control-label-form">Company E-mail 2</label>
                                            <input type="email" class="form-control" id="Email2" name="Email2" placeholder="Enter Company E-mail">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3"></div>
                        <hr>

                        <div class="row mt-4">
                            <div class="form-group col-md-4 col-sm-12">
                                <label class="control-label-form" for="contactperson">Contact Person Name</label>
                                <input type="text" class="form-control" id="contactperson" name="contactperson" placeholder="Enter Contact Person Name">
                            </div>
                            <div class="form-group col-md-3 col-sm-12">
                                <label class="control-label-form" for="contactpersonemail">Email</label>
                                <input type="text" class="form-control" id="contactpersonemail" name="contactpersonemail" placeholder="Enter Contact Person Email">
                            </div>
                            <div class="form-group col-md-3 col-sm-12">
                                <label class="control-label-form" for="contactpersonmobile">Mobile Number</label>
                                <input type="text" class="form-control" id="contactpersonmobile" name="contactpersonmobile" placeholder="Contact Person Mobile Number">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="form-group col-md-4 col-sm-12">
                                <label class="control-label-form" for="purchaseofficer">Purchase Officer Name</label>
                                <input type="text" class="form-control" id="purchaseofficer" name="purchaseofficer" placeholder="Enter Purchase Officer Name">
                            </div>
                            <div class="form-group col-md-3 col-sm-12">
                                <label class="control-label-form" for="purchaseofficeremail">Email</label>
                                <input type="text" class="form-control" id="purchaseofficeremail" name="purchaseofficeremail" placeholder="Enter Purchase Officer Email">
                            </div>
                            <div class="form-group col-md-3 col-sm-12">
                                <label class="control-label-form" for="purchaseofficermobile">Mobile Number</label>
                                <input type="text" class="form-control" id="purchaseofficermobile" name="purchaseofficermobile" placeholder="Purchase Officer Mobile Number">
                            </div>
                        </div>

                        <div class="row mt-3"></div>
                        <hr>

                        <div class="row mt-4">
                            <div class="form-group col-md-2 col-sm-12">
                                <input type="checkbox" id="Electrotech" name="Electrotech">
                                <label for="Electrotech" class="control-label-form">
                                    &nbsp;&nbsp;Electrotech
                                </label>
                            </div>
                            <div class="form-group col-md-2 col-sm-12">
                                <input type="checkbox" id="Thermal" name="Thermal">
                                <label for="Thermal" class="control-label-form">
                                    &nbsp;&nbsp;Thermal
                                </label>
                            </div>
                            <div class="form-group col-md-2 col-sm-12">
                                <input type="checkbox" id="Pressure" name="Pressure">
                                <label for="Pressure" class="control-label-form">
                                    &nbsp;&nbsp;Pressure
                                </label>
                          </div>
                        </div>
                        <hr>
                    </div>

                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary mr-2">Save</button>
                        <a href="{{ URL::previous() }}" class="btn btn-default">Cancel</a>
                    </div>
                </form>
            </div>
            <!-- /.card-body -->
        </div>
    </section>
@endsection
