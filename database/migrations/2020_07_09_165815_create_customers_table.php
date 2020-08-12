<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('detailid')->unique();
            $table->string('groupid')->unique();
            $table->string('name');
            $table->string('sitename');
            $table->string('gstnumber')->nullable();
            $table->string('pannumber');
            $table->string('billingaddress')->nullable();
            $table->string('billingcity')->nullable();
            $table->string('billingstate')->nullable();
            $table->decimal('billingpincode',6)->nullable();
            $table->string('shippingaddress')->nullable();
            $table->string('shippingcity')->nullable();
            $table->string('shippingstate')->nullable();
            $table->decimal('shippingpincode',6)->nullable();
            $table->string('landline')->nullable();
            $table->string('mobilenumber1')->nullable();
            $table->string('mobilenumber2')->nullable();
            $table->string('companyemail1')->unique();
            $table->string('companyemail2')->unique();
            $table->string('contactperson')->nullable();
            $table->string('contactpersonemail')->nullable();
            $table->string('contactpersonmobile')->nullable();
            $table->string('purchaseofficer')->nullable();
            $table->string('purchaseofficerpersonemail')->nullable();
            $table->string('purchaseofficerpersonmobile')->nullable();
            $table->string('electrotech')->nullable();
            $table->string('thermal')->nullable();
            $table->string('pressure')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
