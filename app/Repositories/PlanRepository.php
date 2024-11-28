<?php

namespace App\Repositories;

use App\Models\Plan;

class PlanRepository implements PlanRepositoryInterface
{

    public function getUnits() {
        return [
            Plan::DAY => __('dashboard.'.Plan::DAY),
            Plan::WEEK => __('dashboard.'.Plan::WEEK),
            Plan::MONTH => __('dashboard.'.Plan::MONTH),
            Plan::YEAR => __('dashboard.'.Plan::YEAR),
        ];
    }

    public function getStatuses() {
        return [
            Plan::ACTIVE => __('dashboard.'.Plan::ACTIVE),
            Plan::INACTIVE => __('dashboard.'.Plan::INACTIVE),
        ];
    }

    public function getTypes() {
        return [
            Plan::REGISTER => __('dashboard.'.Plan::REGISTER),
            Plan::SUBSCRIPTION => __('dashboard.'.Plan::SUBSCRIPTION),
        ];
    }

    public function all()
    {
        return Plan::all();
    }

    public function getActive()
    {
        return Plan::all()->where('status', Plan::ACTIVE);
    }

    public function findById($id)
    {
        return Plan::findOrFail($id);
    }

    public function getPaginatedData($perPage = 10, $filters = [])
    {
        $plans = Plan::query();

        if ($filters && is_array($filters)) {
            foreach ($filters as $key => $value) {
                if ($value) {
                    if ($key == 'search') {
                        $plans->where('name', 'like', "%$value%");
                    } else {
                        $plans->where($key, $value);
                    }
                }
            }
        }

        return $plans->paginate($perPage);
    }

    public function create($data = [])
    {
        return Plan::create($data);
    }

    public function createManyFromFactory(int $count)
    {
        return Plan::factory()->count($count)->create();
    }

    public function updateById($id, $data = [])
    {
        return Plan::find($id)->update($data);
    }

    public function deleteById($id)
    {
        return Plan::find($id)->delete();
    }

    public function getLatestPlans()
    {
        return Plan::where('type', Plan::SUBSCRIPTION)
            ->where('status', Plan::ACTIVE)
            ->whereNotNull('unit')
            ->groupBy('unit')
            ->orderBy('created_at', 'DESC')
            ->get();
    }
}
