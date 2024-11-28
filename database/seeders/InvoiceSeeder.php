<?php

namespace Database\Seeders;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Subscription;
use App\Repositories\InvoiceItemRepository;
use App\Repositories\InvoiceRepository;
use App\Repositories\SubscriptionRepository;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InvoiceSeeder extends Seeder
{
    private SubscriptionRepository $subscriptionRepository;
    private InvoiceRepository $invoiceRepository;
    private InvoiceItemRepository $invoiceItemRepository;

    public function __construct(
        InvoiceRepository $invoiceRepository,
        SubscriptionRepository $subscriptionRepository,
        InvoiceItemRepository $invoiceItemRepository
    ) {
        $this->invoiceRepository = $invoiceRepository;
        $this->subscriptionRepository = $subscriptionRepository;
        $this->invoiceItemRepository = $invoiceItemRepository;
    }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0; $i < 10; $i++) {
            $subscriptions = [];
            $rand = rand(0, 2); // 2: to get all user active subs who havent create invoice, 1: split users has many subs, 0: get random subs
            if ($rand > 0) {
                $userIds = Subscription::select('user_id')
                    ->has('plan')
                    ->doesntHave('invoiceItems')
                    ->where('status', Subscription::ACTIVE)
                    ->havingRaw('COUNT(*) > 1')
                    ->groupBy('user_id')
                    ->pluck('user_id');

                if (count($userIds) > 1) {
                    $userId = $userIds->random();
                } else if (count($userIds) == 1) {
                    $userId = $userIds[0];
                } else {
                    // skip if no userId found
                    continue;
                }
                
                $subscriptions = Subscription::with('plan')
                    ->where('status', Subscription::ACTIVE)
                    ->where('user_id', $userId)->get();

                if ($rand == 1 && count($subscriptions) > 1) {
                    $splitRand = rand(0, count($subscriptions) - 1);

                    if ($splitRand < count($subscriptions) - 1) {
                        // take part of the subscription lists randomly
                        $subscriptions = $subscriptions->slice(0, $splitRand);
                    }
                }
            } else {
                $subscriptions = [Subscription::with('plan')->where('status', Subscription::ACTIVE)->inRandomOrder()->first()];
            }

            $invoice = null;
            $total = 0;
            foreach($subscriptions as $subscription) {
                if (!$invoice) {
                    $invoice = Invoice::factory()->create([
                        'user_id' => $subscription->user_id,
                        'date' => date('Y-m-d'),
                        'total' => $total,
                        'due_date' => date('Y-m-d'),
                        'note' => rand(0, 1) ? fake()->sentence() : null,
                    ]);
                }

                if ($invoice) {
                    InvoiceItem::create([
                        'invoice_id' => $invoice->id,
                        'subscription_id' => $subscription->id,
                        'quantity' => $subscription->quantity,
                        'price' => $subscription->plan->price,
                        'description' => $subscription->title,
                    ]);
                    $total += $subscription->quantity * $subscription->plan->price;
                }

            }

            if ($invoice && $invoice->total != $total) {
                $invoice->total = $total;
                $invoice->save();
            }
        }
    }
}
