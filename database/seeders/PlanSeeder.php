<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Repositories\PlanRepository;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    private PlanRepository $planRepository;

    public function __construct(PlanRepository $planRepository)
    {
        $this->planRepository = $planRepository;
    }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $planList = [
            [
                'name' => 'Registration',
                'price' => '50000',
                'status' => Plan::ACTIVE,
                'type' => Plan::REGISTER,
            ],
            [
                'name' => 'Subscription',
                'price' => '10000',
                'status' => Plan::ACTIVE,
                'type' => Plan::SUBSCRIPTION,
                'unit' => Plan::DAY,
            ],
            [
                'name' => 'Subscription',
                'price' => '150000',
                'status' => Plan::ACTIVE,
                'type' => Plan::SUBSCRIPTION,
                'unit' => Plan::MONTH,
            ],
        ];

        foreach ($planList as $plan) {
            try {
                $this->planRepository->create($plan);
            } catch (\Exception $th) {
                
            }

            $this->planRepository->createManyFromFactory(10);
        }
    }
}
