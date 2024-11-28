<?php

namespace App\Repositories;

use App\Models\Subscription;

class SubscriptionRepository implements SubscriptionRepositoryInterface
{
    public function getStatuses() {
        return [
            Subscription::ACTIVE => __('dashboard.'.Subscription::ACTIVE),
            Subscription::INACTIVE => __('dashboard.'.Subscription::INACTIVE),
        ];
    }

    public function all()
    {
        return Subscription::all();
    }

    public function findById($id)
    {
        return Subscription::with(['user', 'plan', 'invoiceItems', 'invoiceItems.invoice'])->findOrFail($id);
    }

    public function getPaginatedData($perPage = 10, $filters = [])
    {
        $model = Subscription::with(['user', 'plan', 'invoiceItems']);

        if ($filters && is_array($filters)) {
            foreach ($filters as $key => $value) {
                if ($value) {
                    if ($key == 'search') {
                        $model->where('name', 'like', "%$value%");
                    } else {
                        $model->where($key, $value);
                    }
                }
            }
        }

        return $model->paginate($perPage);
    }

    public function create($data = [])
    {
        return Subscription::create($data);
    }

    public function updateById($id, $data = [])
    {
        return Subscription::find($id)->update($data);
    }

    public function deleteById($id)
    {
        return Subscription::find($id)->delete();
    }

    public function options()
    {
        return Subscription::pluck('title', 'id');
    }

    public function createManyFromFactory(int $count)
    {
        return Subscription::factory()->count($count)->create();
    }
}
