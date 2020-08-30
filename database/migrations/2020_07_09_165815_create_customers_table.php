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
            $table->string('detail_id')->nullable()->unique();
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

            $table->string('name_in_certificate')->nullable();
            $table->string('address_in_certificate')->nullable();

            $table->string('electrotech')->nullable();
            $table->string('thermal')->nullable();
            $table->string('pressure')->nullable();
            $table->integer('active')->default(1);
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
