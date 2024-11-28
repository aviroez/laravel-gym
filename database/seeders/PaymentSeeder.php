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
        // Get any available values
        // $activeUsers = User::whereIn('status', [User::ADMIN, User::OPERATOR])->pluck('id')->toArray();
        // $activeInvoices = Invoice::where('status', Invoice::UNPAID)->get();
        // $methodList = [Payment::CASH, Payment::CASHLESS];

        // Check if there are any active users or invoices
        // if (empty($activeUsers) || empty($activeInvoices)) {
        //     $this->command->info('No active users or invoices found. Skipping payment seeding.');
        //     return;
        // }

        // Generate fake payments
        // Payment::factory(10)->create()->each(function ($payment) use ($activeUsers, $activeInvoices, $methodList) {
        //     $invoice = $activeInvoices[array_rand($activeInvoices)];
        //     $payment->user_id = $activeUsers[array_rand($activeUsers)];
        //     $payment->invoice_id = $invoice->id;
        //     $payment->amount = $invoice->total;
        //     $payment->date = $invoice->due_date - date('Y-m-d');
        //     $payment->note = $invoice->note;
        //     $payment->paid = rand(floor($invoice->total/2), $invoice->total);
        //     $payment->method = $methodList[array_rand($methodList)];
        //     $payment->save();
        // });
        Payment::factory(10)->create();
    }
}
