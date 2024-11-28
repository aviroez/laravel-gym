<?php

namespace App\Repositories;

use App\Models\Invoice;

class InvoiceRepository implements InvoiceRepositoryInterface
{
    protected InvoiceItemRepository $invoiceItemRepository;

    public function __construct(InvoiceItemRepository $invoiceItemRepository)
    {
        $this->invoiceItemRepository = $invoiceItemRepository;        
    }

    public function getStatuses() {
        return [
            Invoice::UNPAID => __('dashboard.'.Invoice::UNPAID),
            Invoice::PARTIALLY_PAID => __('dashboard.'.Invoice::PARTIALLY_PAID),
            Invoice::PAID => __('dashboard.'.Invoice::PAID),
        ];
    }

    public function all()
    {
        return Invoice::all();
    }

    public function findById($id, $with = ['user', 'items', 'items.subscription', 'items.subscription.plan'])
    {
        return Invoice::with($with)->findOrFail($id);
    }

    public function getNewNumber($number = null, $date = null)
    {
        return Invoice::getNewNumber($number, $date);
    }

    public function getPaginatedData($perPage = 10, $filters = [])
    {
        $model = Invoice::with(['user','items']);

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
        return Invoice::create($data);
    }

    public function updateById($id, $data = [])
    {
        return Invoice::find($id)->update($data);
    }

    public function createUnpaid($id, $data = [])
    {
        // Update status for old invoice
        $invoice = Invoice::with(['items'])->findOrFail($id);
        if (isset($data['status'])) {
            $invoice->status = $data['status'];
            $invoice->save();
        }

        // Replicate old invoice and set status to unpaid, also set parent_id to old invoice parent_id or id
        $newInvoice = $invoice->replicate();
        $newInvoice->number = $this->getNewNumber(removeAfterLastDash($invoice->number));
        $newInvoice->status = Invoice::UNPAID;
        $newInvoice->parent_id = $invoice->parent_id ?? $invoice->id;
        if (isset($data['remaining_total'])) {
            $newInvoice->total = $data['remaining_total'];
        }
        $newInvoice->save();

        if ($newInvoice) {
            $invoiceItems = $this->invoiceItemRepository->getByInvoiceId($invoice->id);
            foreach ($invoiceItems as $invoiceItem) {
                $newInvoiceItem = $invoiceItem->replicate();
                $newInvoiceItem->invoice_id = $newInvoice->id;
                $newInvoiceItem->save();
            }
        }

        return $newInvoice;
    }

    public function deleteById($id)
    {
        return Invoice::find($id)->delete();
    }

    public function getBySubscriptionId($id)
    {
        $ids = Invoice::whereRelation('items','subscription_id', $id)->get()->pluck('id');
        return Invoice::with(['user', 'items', 'items.subscription', 'items.subscription.plan'])->whereIn('id', $ids)->get();
    }

    public function options()
    {
        return Invoice::pluck('number', 'id');
    }

    public function getUnpaidInvoices($type = 'month')
    {
        return Invoice::whereIn('status', [Invoice::UNPAID, Invoice::PARTIALLY_PAID])
            // ->where('created_at', '<=', ($type == 'year') ? now()->subYear() : now()->subMonth())
            ->count();
    }
}
