<?php

namespace App\Http\Controllers;

use App\Item;
use App\MakeMaster;
use App\Customer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ItemController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $items = Item::with('customer','make')->active()->paginate(5);

        return view('Item.index', compact('items'));
    }

    public function create()
    {
        $item = new Item();
        $make = MakeMaster::active()->get();
        $customers = Customer::active()->get();

        return view('Item.create', compact('item','make','customers'));
    }

    public function store(Request $request)
    {
        for($i=1; $i<=$request->count; $i++)
        {
            $item = new Item();
            $item->customer_id = $request['customer_id'];
            $item->equipment_name = $request['equipment_name'.$i.''];
            $item->make_master_id = $request['make_master_id'.$i.''];
            $item->model_no = $request['model_no'.$i.''];
            $item->serial_no = $request['serial_no'.$i.''];
            $item->calibration_range = $request['calibration_range'.$i.''];
            $item->no_of_points = $request['no_of_points'.$i.''];
            $item->calibration_value_of_each_point = $request['calibration_value_of_each_point'.$i.''];
            $item->least_count_for_readout = $request['least_count_for_readout'.$i.''];
            $item->accuracy = $request['accuracy'.$i.''];
            $item->additional_detail = $request['additional_detail'.$i.''];
            $item->save();

        }

        $item = new Item();

        return redirect('item');
    }

    public function edit(Item $item)
    {
        return view('Item.edit', compact('item'));
    }

    public function update(Request $request, Item $item)
    {
        $item->update($this->validateRequest());

        return redirect('item');
    }

    public function destroy(Item $item)
    {
        $item->active = 0;
        $item->save();

        return redirect('item');
    }

    private function validateRequest()
    {
        return request()->validate([
            'name' => 'required',
            'active' => '',
        ]);
    }
}
