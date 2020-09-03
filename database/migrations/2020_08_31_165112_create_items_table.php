<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('customer_id');
            $table->string('equipment_name');
            $table->unsignedInteger('make_master_id');
            $table->string('model_no');
            $table->string('serial_no');
            $table->string('calibration_range');
            $table->string('no_of_points');
            $table->string('calibration_value_of_each_point');
            $table->string('least_count_for_readout');
            $table->string('accuracy');
            $table->text('additional_detail')->nullable();
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
        Schema::dropIfExists('items');
    }
}
