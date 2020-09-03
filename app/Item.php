<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $guarded = [];

    public function scopeActive($query)
    {
        return $query->where('active', 1);
    }

    public function customer()
    {
        return $this->hasOne('App\Customer','id','customer_id');
    }

    public function make()
    {
        return $this->hasOne('App\MakeMaster','id','make_master_id');
    }

}
