<?php

namespace App\Http\Controllers;

use App\BankMaster;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BankMasterController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $banks = BankMaster::active()->get();

        $bank = new BankMaster();

        return view('masters.Bank.index', compact('banks','bank'));
    }


    public function create()
    {        
        $bank = new BankMaster();

        return view('masters.Bank.create', compact('bank'));
    }


    public function store(Request $request)
    {
        BankMaster::create($this->validateRequest());
       
        return redirect('bank');
    }


    public function edit(BankMaster $bankMaster)
    {
        $bank = $bankMaster;

        return view('masters.Bank.edit', compact('bank'));
    }


    public function update(Request $request, BankMaster $bankMaster)
    {        
        $bankMaster->update($this->validateRequest());

        return redirect('bank');
    }


    public function destroy(BankMaster $bankMaster)
    {
        $bankMaster->active = 0;
        $bankMaster->save();

        return redirect('bank');
    }

    private function validateRequest()
    {
        return request()->validate([
            'name' => 'required',
            'branch_detail' => 'required',
            'account_name' => 'required',
            'account_number' => 'required',
            'ifsc_code' => 'required',
            'active' => ''
        ]);
    }
}
