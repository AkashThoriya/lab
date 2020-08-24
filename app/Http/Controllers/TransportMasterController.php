<?php

namespace App\Http\Controllers;

use App\TransportMaster;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TransportMasterController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $transports = TransportMaster::active()->get();

        $transport = new TransportMaster();

        return view('masters.Transport.index', compact('transports','transport'));
    }


    public function create()
    {        
        $transport = new TransportMaster();

        return view('masters.Transport.create', compact('transport'));
    }


    public function store(Request $request)
    {
        TransportMaster::create($this->validateRequest());
       
        return redirect('transport');
    }


    public function edit(TransportMaster $transportMaster)
    {
        $transport = $transportMaster;

        return view('masters.Transport.edit', compact('transport'));
    }


    public function update(Request $request, TransportMaster $transportMaster)
    {        
        $transportMaster->update($this->validateRequest());

        return redirect('transport');
    }


    public function destroy(TransportMaster $transportMaster)
    {
        $transportMaster->active = 0;
        $transportMaster->save();

        return redirect('transport');
    }

    private function validateRequest()
    {
        return request()->validate([
            'name' => 'required',
            'active' => ''
        ]);
    }
}
