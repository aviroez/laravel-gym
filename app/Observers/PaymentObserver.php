<?php

namespace App\Observers;

use App\Models\Invoice;
use App\Models\Payment;
use App\Repositories\InvoiceRepository;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;

class PaymentObserver implements ShouldHandleEventsAfterCommit
{
    protected InvoiceRepository $invoiceRepository;

    public function __construct(InvoiceRepository $invoiceRepository)
    {
        $this->invoiceRepository = $invoiceRepository;        
    }

    /**
     * Handle the Payment "created" event.
     */
    public function created(Payment $payment): void
    {
        if ($payment->paid >= $payment->amount) {
            $status = Invoice::PAID;
            $this->invoiceRepository->updateById($payment->invoice_id, ['status' => $status]);
        } else {
            $invoice = Invoice::find($payment->invoice_id);
            $status = Invoice::PARTIALLY_PAID;
            $dataUnpaid = ['status' => $status, 'remaining_total' => $payment->amount - $payment->paid];
            if (!$invoice->parent_id) {
                $dataUnpaid['id'] = $invoice->id;
            }
            $this->invoiceRepository->createUnpaid($payment->invoice_id, $dataUnpaid);
        }
    }

    /**
     * Handle the Payment "updated" event.
     */
    public function updated(Payment $payment): void
    {
        //
    }

    /**
     * Handle the Payment "deleted" event.
     */
    public function deleted(Payment $payment): void
    {
        //
    }

    /**
     * Handle the Payment "restored" event.
     */
    public function restored(Payment $payment): void
    {
        //
    }

    /**
     * Handle the Payment "force deleted" event.
     */
    public function forceDeleted(Payment $payment): void
    {
        //
    }
}
