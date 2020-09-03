@csrf
<div class="card-body">

    <div class="row">
        <div class="form-group col-md-5 col-sm-12">
            <label class="control-label-form" for="CustomerName">Customer Name</label>
            <input type="text" class="form-control" id="CustomerName" value="{{old('name') ?? $customer->name }}" name="name">
        </div>
        <div class="form-group col-md-3 col-sm-12">
            <label class="control-label-form" for="CustomerName">Site Name</label>
            <input type="text" class="form-control" id="SiteName" value="{{old('site_name') ?? $customer->site_name }}" name="site_name">
        </div>
        <div class="form-group col-md-2 col-sm-12">
            <label class="control-label-form" for="PanNumber">Pan Number</label>
            <input type="text" class="form-control" id="PanNumber" value="{{old('pan_number') ?? $customer->pan_number }}" name="pan_number">
        </div>
        <div class="form-group col-md-2 col-sm-12">
            <label class="control-label-form" for="gstin">GST Number</label>
            <input type="text" class="form-control" id="gstin" value="{{old('gst_number') ?? $customer->gst_number }}" name="gst_number">
        </div>
    </div>

    <div class="row mt-3"></div>
    <hr>

    <div class="row mt-4">
            <div class="col-md-5">
                <div class="form-group">
                    <label class="control-label-form">Billing Address</label>
                    <textarea class="form-control" rows="2" name="billing_address">{{old('billing_address') ?? $customer->billing_address }}</textarea>
                </div>
            </div>

        <div class="col-md-1"></div>
            <div class="col-md-5">
                <div class="form-group">
                    <label class="control-label-form">Shipping Address</label>
                    <textarea class="form-control" rows="2" name="shipping_address">{{old('shipping_address') ?? $customer->shipping_address }}</textarea>
                </div>
            </div>
    </div>
    <div class="row mt-3">
        <div class="col-md-5">
            <div class="row">
                <div class="col-md-5">
                    <div class="form-group">
                        <label class="control-label-form" for="State">State</label>
                        <select name="billing_state" id="billing_state" class="form-control">
                            <option></option>
                        </select>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <div class="form-group">
                            <label class="control-label-form" for="City">City</label>
                            <select name="billing_city" id="billing_city" class="form-control">
                                <option></option>
                            </select>
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
                        <select name="shipping_state" id="shipping_state" class="form-control">
                            <option></option>
                        </select>
                    </div>
                </div>
            <div class="col-md-1"></div>
                <div class="col-md-5">
                    <div class="form-group">
                        <label class="control-label-form" for="City">City</label>
                        <select name="shipping_city" id="shipping_city" class="form-control">
                            <option></option>
                        </select>
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
                        <input type="number" class="form-control" id="BPincode" value="{{old('billing_pin_code') ?? $customer->billing_pin_code }}" name="billing_pin_code">
                    </div>
                </div>

            <div class="col-md-1"></div>
                <div class="col-md-5">
                    <div class="form-group">
                        <label class="control-label-form">Landline Number</label>
                        <input type="text" class="form-control" id="LandlineNumber" value="{{old('landline') ?? $customer->landline }}" name="landline">
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
                        <input type="number" class="form-control" id="SPincode" value="{{old('shipping_pincode') ?? $customer->shipping_pincode }}" name="shipping_pincode">
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
                        <label class="control-label-form">Mobile Number 1</label>
                        <input type="number" class="form-control" id="MobileNumber1" value="{{old('mobilenumber1') ?? $customer->mobilenumber1 }}" name="mobilenumber1">
                    </div>
                </div>

                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <div class="form-group">
                        <label class="control-label-form">Mobile Number 2</label>
                        <input type="number" class="form-control" id="MobileNumber2" value="{{old('mobilenumber2') ?? $customer->mobilenumber2 }}" name="mobilenumber2">
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
                        <input type="email" class="form-control" id="Email1" value="{{old('companyemail1') ?? $customer->companyemail1 }}" name="companyemail1">
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label class="control-label-form">Company E-mail 2</label>
                        <input type="email" class="form-control" id="Email2" value="{{old('companyemail2') ?? $customer->companyemail2 }}" name="companyemail2">
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
            <input type="text" class="form-control" id="contactperson" value="{{old('contactperson') ?? $customer->contactperson }}" name="contactperson">
        </div>
        <div class="form-group col-md-4 col-sm-12">
            <label class="control-label-form" for="contactpersonemail">Email</label>
            <input type="email" class="form-control" id="contactpersonemail" value="{{old('contact_personemail') ?? $customer->contact_personemail }}" name="contact_personemail">
        </div>
        <div class="form-group col-md-2 col-sm-12">
            <label class="control-label-form" for="contactpersonmobile">Mobile Number</label>
            <input type="number" class="form-control" id="contactpersonmobile" value="{{old('contact_personmobile') ?? $customer->contact_personmobile }}" name="contact_personmobile">
        </div>
    </div>
    <div class="row mt-3">
        <div class="form-group col-md-4 col-sm-12">
            <label class="control-label-form" for="purchaseofficer">Purchase Officer Name</label>
            <input type="text" class="form-control" id="purchaseofficer" value="{{old('purchase_officer') ?? $customer->purchase_officer }}" name="purchase_officer">
        </div>
        <div class="form-group col-md-4 col-sm-12">
            <label class="control-label-form" for="purchaseofficeremail">Email</label>
            <input type="email" class="form-control" id="purchaseofficeremail" value="{{old('purchaseofficer_person_email') ?? $customer->purchaseofficer_person_email }}" name="purchaseofficer_person_email">
        </div>
        <div class="form-group col-md-2 col-sm-12">
            <label class="control-label-form" for="purchaseofficermobile">Mobile Number</label>
            <input type="number" class="form-control" id="purchaseofficermobile" value="{{old('purchaseofficer_person_mobile') ?? $customer->purchaseofficer_person_mobile }}" name="purchaseofficer_person_mobile">
        </div>
    </div>

    <div class="row mt-3">
        <div class="form-group col-md-4 col-sm-12">
            <label class="control-label-form" for="name_in_certificate">Name in certificate</label>
            <input type="text" class="form-control" id="name_in_certificate" value="{{old('name_in_certificate') ?? $customer->name_in_certificate }}" name="name_in_certificate">
        </div>
        <div class="col-md-5">
            <div class="form-group">
                <label class="control-label-form">Address in certificate</label>
                <textarea class="form-control" rows="2" name="address_in_certificate">{{old('address_in_certificate') ?? $customer->address_in_certificate }}</textarea>
            </div>
        </div>
    </div>

    <div class="row mt-3"></div>
    <hr>

    <div class="row mt-4">
        <div class="form-group col-md-4 col-sm-12">
            <label class="control-label-form" for="bank_name">Bank name</label>
            <input type="text" class="form-control" id="bank_name" value="{{old('bank_name') ?? $customer->bank_name }}" name="bank_name">
        </div>
        <div class="form-group col-md-3 col-sm-12">
            <label class="control-label-form" for="branch_name">Bank name</label>
            <input type="text" class="form-control" id="branch_name" value="{{old('branch_name') ?? $customer->branch_name }}" name="branch_name">
        </div>
        <div class="form-group col-md-2 col-sm-12">
            <label class="control-label-form" for="ifsc_code">IFSC code</label>
            <input type="text" class="form-control" id="ifsc_code" value="{{old('ifsc_code') ?? $customer->ifsc_code }}" name="ifsc_code">
        </div>
        <div class="form-group col-md-2 col-sm-12">
            <label class="control-label-form" for="account_number">Account number</label>
            <input type="number" class="form-control" id="account_number" value="{{old('account_number') ?? $customer->account_number }}" name="account_number">
        </div>
    </div>

    <div class="row mt-3"></div>
    <hr>

    <div class="row mt-4">
        <div class="form-group col-md-2 col-sm-12">
            <input type="checkbox" id="Electrotech" value="{{old('name') ?? $customer->name }}" name="electrotech">
            <label for="Electrotech" class="control-label-form">
                &nbsp;&nbsp;Electrotech
            </label>
        </div>
        <div class="form-group col-md-2 col-sm-12">
            <input type="checkbox" id="Thermal" value="{{old('name') ?? $customer->name }}" name="thermal">
            <label for="Thermal" class="control-label-form">
                &nbsp;&nbsp;Thermal
            </label>
        </div>
        <div class="form-group col-md-2 col-sm-12">
            <input type="checkbox" id="Pressure" value="{{old('name') ?? $customer->name }}" name="pressure">
            <label for="Pressure" class="control-label-form">
                &nbsp;&nbsp;Pressure
            </label>
        </div>
    </div>
    <hr>
</div>
<input type="hidden" name="active" value="1">
