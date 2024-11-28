<?php

namespace App\Repositories;

use App\Models\InvoiceItem;

class InvoiceItemRepository implements InvoiceItemRepositoryInterface
{

    public function all()
    {
        return InvoiceItem::all();
    }

    public function getByInvoiceId($id)
    {
        return InvoiceItem::where(['invoice_id' => $id])->get();
    }

    public function findById($id)
    {
        return InvoiceItem::findOrFail($id);
    }

    public function create($data = [])
    {
        return InvoiceItem::create($data);
    }

    public function updateById($id, $data = [])
    {
        return InvoiceItem::find($id)->update($data);
    }

    public function deleteById($id)
    {
        return InvoiceItem::find($id)->delete();
    }
}
