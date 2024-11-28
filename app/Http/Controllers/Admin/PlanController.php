<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PlanRequest;
use App\Repositories\PlanRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanController extends Controller
{
    protected PlanRepository $planRepository;

    public function __construct(PlanRepository $planRepository)
    {
        $this->planRepository = $planRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $filters = $request->input('filters');
        
        $units = $this->planRepository->getUnits();
        $statuses = $this->planRepository->getStatuses();
        $types = $this->planRepository->getTypes();

        return Inertia::render('Plan/Index', [
            'plans' => $this->planRepository->getPaginatedData($perPage, $filters),
            'units' => $units,
            'statuses' => $statuses,
            'types' => $types,
            'filters' => [
                'unit' => $units,
                'status' => $statuses,
                'type' => $types,
                'search' => isset($filters['search']) ? $filters['search'] : '',
            ],
            'filtersValue' => $filters
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlanRequest $request)
    {
        $data = $request->validated();

        try {
            $this->planRepository->create($data);
    
            return redirect()->route('plans.index')
                ->with('success', __('dashboard.create_success', ['field' => __('dashboard.plan')]));
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PlanRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $this->planRepository->updateById($id, $data);
    
            return redirect()->route('plans.index')
                ->with('success', __('dashboard.update_success', ['field' => __('dashboard.plan')]));
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
            $this->planRepository->deleteById($id);
    
            return redirect()->route('plans.index')
                ->with('success', __('dashboard.delete_success', ['field' => __('dashboard.plan')]));
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }
}
