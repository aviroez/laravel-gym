<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PaymentRequest;
use App\Models\Invoice;
use App\Repositories\InvoiceRepository;
use App\Repositories\PaymentRepository;
use App\Repositories\UserRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{

    protected $paymentRepository;
    protected $invoiceRepository;
    protected $userRepository;
    public function __construct(PaymentRepository $paymentRepository, InvoiceRepository $invoiceRepository, UserRepository $userRepository)
    {
        $this->paymentRepository = $paymentRepository;
        $this->invoiceRepository = $invoiceRepository;
        $this->userRepository = $userRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $filters = $request->input('filters');

        $users = $this->userRepository->options();
        $invoices = $this->invoiceRepository->options();
        return Inertia::render('Payment/Index', [
            'payments' => $this->paymentRepository->getPaginatedData($perPage, $filters),
            'invoices' => $invoices,
            'users' => $users,
            'filters' => [
                'invoice_id' => $invoices,
                'user_id' => $users,
                'search' => isset($filters['search']) ? $filters['search'] : '',
            ],
            'filtersValue' => $filters
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaymentRequest $request)
    {
        $data = $request->validated();

        try {
            $data['user_id'] = auth()->id();
            $data['number'] = $this->paymentRepository->getNewNumber();
            $invoice = $this->invoiceRepository->findById($data['invoice_id'], []);

            if (!in_array($invoice->status, [Invoice::UNPAID])) {
                return redirect()->route('invoices.index')->with('failed', __('dashboard.payment_failed'));
            }

            $status = null;
            if ($data['paid'] > 0 && $data['amount'] > 0) {
                // if ($data['paid'] >= $data['amount']) {
                //     $status = Invoice::PAID;
                //     $this->invoiceRepository->updateById($data['invoice_id'], ['status' => $status]);
                // } else {
                //     $status = Invoice::PARTIALLY_PAID;
                //     $dataUnpaid = ['status' => $status, 'remaining_total' => $data['amount'] - $data['paid']];
                //     $this->invoiceRepository->createUnpaid($data['invoice_id'], $dataUnpaid);
                // }
                $this->paymentRepository->create($data);
                return redirect()->route('invoices.index')
                    ->with('success', __('dashboard.create_success', ['field' => __('dashboard.payment')]));
            }

            // if (!$status) {
            //     return redirect()->route('invoices.index')->with('failed', __('dashboard.payment_failed'));
            // }
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Payment/Show', [
            'payment' => $this->paymentRepository->findById($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function pdf(Request $request, string $id)
    {
        $payment = $this->paymentRepository->findById($id);

        $pdf = Pdf::loadView('pdf.payment', ['payment' => $payment]);

        return $pdf->stream('payment.pdf', ['Attachment' => false]);
    }
}
