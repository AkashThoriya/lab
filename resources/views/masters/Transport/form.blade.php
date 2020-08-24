@csrf
<div class="form-group col-12 row">
    <div class="col-6">
        <label for="name" class="col-form-label">Name</label>
        <input type="text" class="form-control" id="name" name="name" value="{{old('name') ?? $transport->name }}">
        <div class="error">{{ $errors->first('name') }}</div>
    </div>
</div>

<input type="hidden" name="active" value="1">
