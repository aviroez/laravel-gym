<?php

namespace Database\Seeders;

use App\Repositories\SubscriptionRepository;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    private SubscriptionRepository $subscriptionRepository;

    public function __construct(
        SubscriptionRepository $subscriptionRepository
    ) {
        $this->subscriptionRepository = $subscriptionRepository;
    }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->subscriptionRepository->createManyFromFactory(10);
    }
}
