<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\InvoiceRequest;
use App\Repositories\InvoiceItemRepository;
use App\Repositories\InvoiceRepository;
use App\Repositories\SubscriptionRepository;
use App\Repositories\UserRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    protected InvoiceRepository $invoiceRepository;
    protected InvoiceItemRepository $invoiceItemRepository;
    protected SubscriptionRepository $subscriptionRepository;
    protected UserRepository $userRepository;

    public function __construct(
        InvoiceRepository $invoiceRepository,
        InvoiceItemRepository $invoiceItemRepository,
        SubscriptionRepository $subscriptionRepository,
        UserRepository $userRepository
    ) {
        $this->invoiceRepository = $invoiceRepository;
        $this->invoiceItemRepository = $invoiceItemRepository;
        $this->subscriptionRepository = $subscriptionRepository;
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
        return Inertia::render('Invoice/Index', [
            'invoices' => $this->invoiceRepository->getPaginatedData($perPage, $filters),
            'users' => $users,
            'filters' => [
                'user_id' => $users,
                'search' => isset($filters['search']) ? $filters['search'] : '',
            ],
            'filtersValue' => $filters
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InvoiceRequest $request)
    {
        $data = $request->validated();

        try {
            $data['number'] = $this->invoiceRepository->getNewNumber();
            $invoice = $this->invoiceRepository->create($data);

            if ($invoice && $data['subscriptions']) {
                foreach ($data['subscriptions'] as $subscription) {
                    $this->invoiceItemRepository->create([
                        'invoice_id' => $invoice->id,
                        'subscription_id' => $subscription['id'],
                        'quantity' => $subscription['quantity'],
                        'price' => $subscription['price'],
                        'description' => isset($subscription['description']) ? $subscription['description'] : '',
                    ]);
                }
            }

            return redirect()->route('invoices.index')
                ->with('success', __('dashboard.create_success', ['field' => __('dashboard.invoice')]));
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $invoice = $this->invoiceRepository->findById($id);

        return Inertia::render('Invoice/Show', [
            'invoice' => $invoice
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
        try {
            $this->invoiceRepository->deleteById($id);

            return redirect()->route('invoices.index')
                ->with('success', __('dashboard.delete_success', ['field' => __('dashboard.invoice')]));
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function pdf(Request $request, string $id)
    {
        $invoice = $this->invoiceRepository->findById($id);

        $pdf = Pdf::loadView('pdf.invoice', ['invoice' => $invoice]);

        return $pdf->stream('invoice.pdf', ['Attachment' => false]);
    }
}
