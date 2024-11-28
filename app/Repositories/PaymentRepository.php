<?php

namespace App\Repositories;

use App\Models\Invoice;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Payment;

class PaymentRepository implements PaymentRepositoryInterface
{

    public function all()
    {
        return Payment::all();
    }

    public function findById($id)
    {
        return Payment::with(['user', 'invoice'])->findOrFail($id);
    }

    public function getNewNumber($date)
    {
        return Payment::getNewNumber($date);
    }

    public function getPaginatedData($perPage = 10, $filters = [])
    {
        $model = Payment::with(['user', 'invoice']);

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
        return Payment::create($data);
    }

    public function updateById($id, $data = [])
    {
        return Payment::find($id)->update($data);
    }

    public function deleteById($id)
    {
        return Payment::find($id)->delete();
    }

    public function getCompletedPayments($type = 'month')
    {
        return Payment::whereHas('invoice', function (Builder $query) {
            $query->where('status', Invoice::PAID);
        })
        // ->where('created_at', '<=', ($type == 'year') ? now()->subYear() : now()->subMonth())
        ->count();
    }
}
