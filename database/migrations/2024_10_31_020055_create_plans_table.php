<?php

use App\Models\Plan;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->text('description')->nullable();
            $table->unsignedTinyInteger('duration')->default(1);
            $table->enum('unit', [Plan::DAY, Plan::WEEK, Plan::MONTH, Plan::YEAR])->nullable();
            $table->double('price')->default(0);
            $table->enum('status', [Plan::ACTIVE, Plan::INACTIVE]);
            $table->enum('type', [Plan::REGISTER, Plan::SUBSCRIPTION]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
