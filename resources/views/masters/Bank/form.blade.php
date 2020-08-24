@csrf
<div class="form-group col-12 row">
    <div class="col-6">
        <label for="name" class="col-form-label">Bank name</label>
        <input type="text" class="form-control" id="name" name="name" value="{{old('name') ?? $bank->name }}">
        <div class="error">{{ $errors->first('name') }}</div>
    </div>    
    <div class="col-6">
        <label for="branch" class="col-form-label">Branch name</label>
        <input type="text" class="form-control" id="branch" name="branch_detail" value="{{old('branch_detail') ?? $bank->branch_detail }}">
        <div class="error">{{ $errors->first('branch_detail') }}</div>
    </div>
</div>

<div class="form-group col-12 row">
    <div class="col-6">
        <label for="account" class="col-form-label">Account holder name</label>
        <input type="text" class="form-control" id="account" name="account_name" value="{{old('account_name') ?? $bank->account_name }}">
        <div class="error">{{ $errors->first('account_name') }}</div>
    </div>
    <div class="col-6">
        <label for="account_number" class="col-form-label">Account number</label>
        <input type="text" class="form-control" id="account_number" name="account_number" value="{{old('account_number') ?? $bank->account_number }}">
        <div class="error">{{ $errors->first('account_number') }}</div>
    </div>
</div>


<div class="form-group col-12 row">
    <div class="col-6">
        <label for="ifsc_code" class="col-form-label">IFSC code</label>
        <input type="text" class="form-control" id="ifsc_code" name="ifsc_code" value="{{old('ifsc_code') ?? $bank->ifsc_code }}">
        <div class="error">{{ $errors->first('ifsc_code') }}</div>
    </div>
</div>

<input type="hidden" name="active" value="1">
