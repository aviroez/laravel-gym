<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\InvoiceRepository;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    protected InvoiceRepository $invoiceRepository;

    public function __construct(
        InvoiceRepository $invoiceRepository
    ) {
        $this->invoiceRepository = $invoiceRepository;
    }

    /**
     * List all invoices based on subscription.
     */
    public function subscriptions(Request $request, string $id)
    {
        $invoices = $this->invoiceRepository->getBySubscriptionId($id);
        return response()->json($invoices);
    }
}
