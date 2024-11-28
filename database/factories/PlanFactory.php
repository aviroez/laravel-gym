<?php

namespace Database\Factories;

use App\Models\Plan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plan>
 */
class PlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = [Plan::REGISTER, Plan::SUBSCRIPTION];
        $type = $types[rand(0, 1)];
        $price = rand(1, 999) * 1000;
        $unit = null;
        if ($type != Plan::REGISTER) {
            $plans = [Plan::DAY, Plan::WEEK, Plan::MONTH, Plan::YEAR];
            $unit = $plans[rand(0, 3)];
            $duration = rand(1, 30);
        } else {
            $duration = 1;
        }

        switch ($unit) {
            case Plan::YEAR: $duration = rand(1, 3); break;
            case Plan::MONTH: $duration = rand(1, 36); break;
            case Plan::WEEK: $duration = rand(1, 52); break;
            case Plan::DAY: $duration = rand(1, 365); break;
            default: $duration = 1; break;
        }

        $statuses = [Plan::ACTIVE, Plan::INACTIVE];

        return [
            'name' => fake()->unique()->word(),
            'description' => fake()->sentence(),
            'duration' => $duration,
            'unit' => $unit,
            'price' => $price,
            'status' => $statuses[rand(0, 1)],
            'type' => $type,
        ];
    }
}
