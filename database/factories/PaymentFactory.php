<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * The current field being used by the factory.
     */
    protected static ?int $userId = null;
    protected static ?int $invoiceId = null;
    protected static ?string $date = null;
    protected static ?string $method = null;
    protected static ?string $note = null;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userIdValue = static::$userId ?? optional(User::whereIn('role', [User::ADMIN, User::OPERATOR])->inRandomOrder()->first())->id;
        $invoice = static::$invoiceId 
            ? Invoice::find(static::$invoiceId)
            : Invoice::whereIn('status', [Invoice::UNPAID, Invoice::PARTIALLY_PAID])->inRandomOrder()->first();

        $invoiceIdValue = optional($invoice)->id;
        $amountValue = optional($invoice)->total ?? 0;
        $noteValue = static::$note ?? $invoice->note ?? null;
        $paidValue = 0;

        if ($amountValue > 0) {
            $full = rand(0, 1);
            $paidValue = $full ? $amountValue : rand(floor($amountValue / 2), $amountValue);
        }

        $methodList = [Payment::CASH, Payment::CASHLESS];
        $methodValue = static::$method ?? $methodList[array_rand($methodList)];

        $currentDate = static::$date ??= date('Y-m-d');

        return [
            'number' => Payment::getNewNumber($currentDate), // TODO: number didnt change when seeding
            'date' => $currentDate,
            'user_id' => $userIdValue,
            'invoice_id' => $invoiceIdValue,
            'method' => $methodValue,
            'amount' => $amountValue,
            'paid' => $paidValue,
            'note' => $noteValue,
        ];
    }
}
