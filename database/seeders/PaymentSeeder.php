<?php

namespace Database\Seeders;

use App\Models\Invoice;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Payment::factory(10)->create();
    }
}
