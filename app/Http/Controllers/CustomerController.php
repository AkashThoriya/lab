<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $customers = Customer::active()->paginate(10);

        return view('Customer.index', compact('customers'));
    }

    public function create()
    {
        $customer = new Customer();

        return view('Customer.create', compact('customer'));
    }

    public function store(Request $request)
    {
        // Customer::create($this->validateRequest());
        Customer::create($request->all());

        return redirect('customer');
    }

    public function edit(Customer $customer)
    {
        return view('Customer.edit', compact('customer'));
    }

    public function update(Request $request, Customer $customer)
    {
        $customer->update($this->validateRequest());

        return redirect('customer');
    }

    public function destroy(Customer $customer)
    {
        $customer->active = 0;
        $customer->save();

        return redirect('customer');
    }

    private function validateRequest()
    {
        return request()->validate([
            'name' => 'required',
            'gst_number' => 'required',
            'pan_number' => 'required',
            'active' => '',
        ]);
    }
}

