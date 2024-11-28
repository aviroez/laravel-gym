<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\InvoiceRepository;
use App\Repositories\PaymentRepository;
use App\Repositories\PlanRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected UserRepository $userRepository;
    protected PlanRepository $planRepository;
    protected InvoiceRepository $invoiceRepository;
    protected PaymentRepository $paymentRepository;
    public function __construct(
        UserRepository $userRepository,
        PlanRepository $planRepository,
        InvoiceRepository $invoiceRepository,
        PaymentRepository $paymentRepository
    ) {
        $this->userRepository = $userRepository;
        $this->planRepository = $planRepository;
        $this->invoiceRepository = $invoiceRepository;
        $this->paymentRepository = $paymentRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $type = $request->input('type', 'month'); // month | year

        $allMembers = $this->userRepository->getAllMembers($type);
        $activeMembers = $this->userRepository->getActiveMembers($type);
        $unpaidInvoices = $this->invoiceRepository->getUnpaidInvoices($type);
        $completedPayments = $this->paymentRepository->getCompletedPayments($type);
        $latestPlans = $this->planRepository->getlatestPlans();

        return Inertia::render('Dashboard', [
            'allMembers' => $allMembers,
            'activeMembers' => $activeMembers,
            'unpaidInvoices' => $unpaidInvoices,
            'completedPayments' => $completedPayments,
            'latestPlans' => $latestPlans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
}
