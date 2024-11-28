<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SubscriptionRequest;
use App\Repositories\PlanRepository;
use App\Repositories\SubscriptionRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    protected SubscriptionRepository $subscriptionRepository;
    protected UserRepository $userRepository;
    protected PlanRepository $planRepository;

    public function __construct(
        SubscriptionRepository $subscriptionRepository,
        UserRepository $userRepository,
        PlanRepository $planRepository
    ) {
        $this->subscriptionRepository = $subscriptionRepository;
        $this->userRepository = $userRepository;
        $this->planRepository = $planRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $filters = $request->input('filters');

        $plans = $this->planRepository->getActive();
        $types = $this->planRepository->getTypes();
        return Inertia::render('Subscription/Index', [
            'subscriptions' => $this->subscriptionRepository->getPaginatedData($perPage),
            'statuses' => $this->subscriptionRepository->getStatuses(),
            'users' => $this->userRepository->all(),
            'plans' => $plans,
            'types' => $types,
            'filters' => [
                'type' => $types,
                'search' => isset($filters['search']) ? $filters['search'] : '',
            ],
            'filtersValue' => $filters
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SubscriptionRequest $request)
    {
        $data = $request->validated();

        try {
            if (!isset($data['user_id']) && $data['user_name'] && $data['user_email']) {
                $user = $this->userRepository->findByEmail($data['user_email']);

                if (!$user) {
                    $user = $this->userRepository->create([
                        'name' => $data['user_name'],
                        'email' => $data['user_email'],
                    ]);
                }

                if ($user) {
                    $data['user_id'] = $user->id;
                }
            }
            $this->subscriptionRepository->create($data);

            return redirect()->route('subscriptions.index')
                ->with('success', __('dashboard.create_success', ['field' => __('dashboard.subscription')]));
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $subscription = $this->subscriptionRepository->findById($id);

        if ($request->wantsJson()) {
            return response()->json($subscription);
        }
        return Inertia::render('Subscription/Show', [
            'subscription' => $subscription
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubscriptionRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $this->subscriptionRepository->updateById($id, $data);

            return redirect()->route('subscriptions.index')
                ->with('success', __('dashboard.update_success', ['field' => __('dashboard.subscription')]));
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->subscriptionRepository->deleteById($id);

            return redirect()->route('subscriptions.index')
                ->with('success', __('dashboard.delete_success', ['field' => __('dashboard.subscription')]));
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }
}
