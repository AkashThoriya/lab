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
            $table->string('detail_id')->unique();
            $table->string('group_id')->unique();
            $table->string('name');
            $table->string('site_name');
            $table->string('gst_number')->nullable();
            $table->string('pan_number');
            $table->string('billing_address')->nullable();
            $table->string('billing_city')->nullable();
            $table->string('billing_state')->nullable();
            $table->decimal('billing_pin_code',6)->nullable();
            $table->string('shipping_address')->nullable();
            $table->string('shipping_city')->nullable();
            $table->string('shipping_state')->nullable();
            $table->decimal('shipping_pincode',6)->nullable();
            $table->string('landline')->nullable();
            $table->string('mobilenumber1')->nullable();
            $table->string('mobilenumber2')->nullable();
            $table->string('companyemail1')->unique();
            $table->string('companyemail2')->unique();
            $table->string('contactperson')->nullable();
            $table->string('contact_personemail')->nullable();
            $table->string('contact_personmobile')->nullable();
            $table->string('purchase_officer')->nullable();
            $table->string('purchaseofficer_person_email')->nullable();
            $table->string('purchaseofficer_person_mobile')->nullable();

            $table->string('bank_name')->nullable();
            $table->string('bank_branch_detail')->nullable();
            $table->string('calibration_charges')->nullable();
            $table->string('cheque_or_ddnumber')->nullable();
            $table->string('utr_number')->nullable();
            $table->string('tds')->nullable();
            $table->string('transaction_id')->nullable();

            $table->string('electrotech')->nullable();
            $table->string('thermal')->nullable();
            $table->string('pressure')->nullable();
            $table->integer('active');
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
