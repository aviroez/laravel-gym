<?php

namespace Database\Factories;

use App\Models\Plan;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $plan = Plan::where('status', Plan::ACTIVE)->inRandomOrder()->first();
        $user = User::whereIn('role', [User::MEMBER, User::GUEST])->inRandomOrder()->first();
        return [
            'user_id' => $user->id,
            'plan_id' => $plan->id,
            'title' => $plan->name . ' ' . $plan->duration . ($plan->unit ? ' '.__($plan->unit) : ''),
            'date_from' => fake()->date(),
            'date_to' => fake()->date(),
            'status' => Subscription::ACTIVE,
            'type' => $plan->type,
            'quantity' => 1,
            'price' => $plan->price,
        ];
    }
}
