<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;

class InitialDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            User::factory()->create([
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'role' => User::ADMIN
            ]);
        } catch (\Exception $th) {

        }

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
                Plan::create($plan);
            } catch (\Exception $th) {

            }
        }

        $settingList = Setting::defaultValues();

        foreach ($settingList as $setting) {
            try {
                Setting::create($setting);
            } catch (\Exception $th) {

            }
        }
    }
}
