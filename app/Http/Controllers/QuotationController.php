<?php

namespace App\Http\Controllers;

use App\Quotation;
use App\Customer;
use App\Item;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class QuotationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $quotations = Quotation::with('customer')->active()->paginate(5);

        return view('Quotation.index', compact('quotations'));
    }

    public function create()
    {
        $quotation = new Quotation();
        $customers = Customer::active()->get();
        $items = Item::with('customer','make')->active();

        return view('Quotation.create', compact('quotation','items','customers'));
    }

    public function store(Request $request)
    {
        for($i=1; $i<=$request->count; $i++)
        {
            $quotation = new Quotation();
            $quotation->customer_id = $request['customer_id'];
            $quotation->equipment_name = $request['equipment_name'.$i.''];
            $quotation->make_master_id = $request['make_master_id'.$i.''];
            $quotation->model_no = $request['model_no'.$i.''];
            $quotation->serial_no = $request['serial_no'.$i.''];
            $quotation->calibration_range = $request['calibration_range'.$i.''];
            $quotation->no_of_points = $request['no_of_points'.$i.''];
            $quotation->calibration_value_of_each_point = $request['calibration_value_of_each_point'.$i.''];
            $quotation->least_count_for_readout = $request['least_count_for_readout'.$i.''];
            $quotation->accuracy = $request['accuracy'.$i.''];
            $quotation->additional_detail = $request['additional_detail'.$i.''];
            $quotation->save();

        }

        $quotation = new Quotation();

        return redirect('quotation');
    }

    public function edit(Quotation $quotation)
    {
        return view('Quotation.edit', compact('quotation'));
    }

    public function update(Request $request, Quotation $quotation)
    {
        $quotation->update($this->validateRequest());

        return redirect('quotation');
    }

    public function destroy(Quotation $quotation)
    {
        $quotation->active = 0;
        $quotation->save();

        return redirect('quotation');
    }

    private function validateRequest()
    {
        return request()->validate([
            'name' => 'required',
            'active' => '',
        ]);
    }
}
