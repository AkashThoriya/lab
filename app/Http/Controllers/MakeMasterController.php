<?php

namespace App\Http\Controllers;

use App\MakeMaster;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MakeMasterController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $makes = MakeMaster::active()->get();

        $make = new MakeMaster();

        return view('masters.Make.index', compact('makes','make'));
    }


    public function create()
    {        
        $make = new MakeMaster();

        return view('masters.Make.create', compact('make'));
    }


    public function store(Request $request)
    {
        MakeMaster::create($this->validateRequest());
       
        return redirect('make');
    }


    public function edit(MakeMaster $makeMaster)
    {
        $make = $makeMaster;

        return view('masters.Make.edit', compact('make'));
    }


    public function update(Request $request, MakeMaster $makeMaster)
    {        
        $makeMaster->update($this->validateRequest());

        return redirect('make');
    }


    public function destroy(MakeMaster $makeMaster)
    {
        $makeMaster->active = 0;
        $makeMaster->save();

        return redirect('make');
    }

    private function validateRequest()
    {
        return request()->validate([
            'name' => 'required',
            'active' => ''
        ]);
    }
}

