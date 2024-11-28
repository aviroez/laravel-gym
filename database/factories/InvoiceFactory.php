<?php

namespace Database\Factories;

use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * The current date being used by the factory.
     */
    protected static ?string $date;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $currentDate = static::$date ??= date('Y-m-d');
        return [
            'number' => Invoice::getNewNumber(null, $currentDate),
            'status' => Invoice::UNPAID,
            'date' => $currentDate,
        ];
    }
}
