import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { FaFilePdf, FaFilter, FaPlusSquare } from 'react-icons/fa';
import { PaginationLink, Payment } from '@/types';
import InfoButton from '@/Components/InfoButton';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import TableRow from '@/Components/TableRow';
import useTranslations from '@/Hooks/jsTranslation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TableLayout from '@/Components/TableLayout';
import { formatCurrency, formatDateString } from '@/utils/helpers';
import SecondaryButton from '@/Components/SecondaryButton';
import { FaFilterCircleXmark } from 'react-icons/fa6';

interface PaymentProps {
    payments: {
        data: Payment[],
        links: PaginationLink[]
    },
    filters: [],
    filtersValue: [],
}

export default function PaymentIndex({ payments, filters, filtersValue }: PaymentProps) {
    const { t } = useTranslations();

    const [viewFilter, setViewFilter] = useState(false)
    const [form, setForm] = useState<'edit_payment'|'add_payment'|null>(null)

    const addAction = () => {
        setForm('add_payment');
    }

    const receiptPrintAction = (payment: Payment) => {
        if (!payment) return;

        setForm('edit_payment');
    }

    const showPaymentAction = (payment: Payment) => {
        if (!payment) return;
        
        Inertia.get(`/payments/${payment.id}`, {}, {
            onSuccess: () => {
            }
        });
    }

    const bgMethod = (method: string) => {
        switch (method) {
            case 'cash': return 'bg-blue-400';
            case 'cashless': return 'bg-emerald-400';
            default : return 'bg-lime-400';
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('payments')}
                </h2>
            }
        >
            <Head title={t('payments')} />

            {!form && (
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="px-4 pt-4 py-2 text-gray-900 flex justify-between gap-4">
                            <h5 className="flex col-start-1 text-2xl">{t('payments')}</h5>

                            <div className="flex gap-2">
                                {filters && <SecondaryButton className="flex" onClick={() => setViewFilter(!viewFilter)}>
                                    {viewFilter ? <FaFilter /> : <FaFilterCircleXmark />}
                                </SecondaryButton>}
                                
                                <PrimaryButton className="flex" onClick={(e) => addAction()}>
                                    <FaPlusSquare />&nbsp;{t('add_payment')}
                                </PrimaryButton>
                            </div>
                        </div>
                        <div className="px-4">
                            <TableLayout formUrl={route('payments.index')} viewFilter={viewFilter} setViewFilter={setViewFilter} filters={filters} filtersValue={filtersValue}>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <TableRow className="text-center" about="header">{t('number')}</TableRow>
                                        <TableRow key="header-user" className="text-center hidden sm:table-cell" about="header">{t('receiver')}</TableRow>
                                        <TableRow key="header-due-data" className="text-center" about="header">{t('due_date')}</TableRow>
                                        <TableRow key="header-amount" className="text-center" about="header">{t('amount')}</TableRow>
                                        <TableRow key="header-paid" className="text-center" about="header">{t('paid')}</TableRow>
                                        <TableRow key="header-method" className="text-center hidden sm:table-cell" about="header">{t('method')}</TableRow>
                                        <TableRow key="header-action" className="text-center" about="header">{t('action')}</TableRow>
                                    </tr>
                                </thead>
                                <tbody>
                                {payments.data.map((payment) => (
                                <tr key={payment.id} className="bg-white border-b hover:bg-gray-50">
                                    <TableRow key={`number-${payment.id}`} className="p-2">
                                        {payment.number}
                                        {payment.method && 
                                            <span className={"inline-block sm:hidden p-1 mx-1 rounded-md text-slate-100 text-sm "+bgMethod(payment.method)}>{t(payment.method)}</span>
                                        }
                                    </TableRow>
                                    <TableRow key={`user-${payment.id}`} className="p-2 hidden sm:table-cell">{payment.user?.name}</TableRow>
                                    <TableRow key={`date-${payment.id}`} className="text-right">{formatDateString(payment.date)}</TableRow>
                                    <TableRow key={`amount-${payment.id}`} className="text-right">{formatCurrency(payment.amount)}</TableRow>
                                    <TableRow key={`paid-${payment.id}`} className="text-right">{formatCurrency(payment.paid)}</TableRow>
                                    <TableRow key={`method-${payment.id}`} className="text-center hidden sm:table-cell">
                                        {payment.method && 
                                        <span className={"inline-block p-1 mx-1 rounded-md text-slate-100 text-sm "+bgMethod(payment.method)}>{t(payment.method)}</span>
                                        }
                                    </TableRow>
                                    <TableRow key={`action-${payment.id}`} className="text-center">
                                        <InfoButton className="space-x-0.5" onClick={(e) => showPaymentAction(payment)}>
                                            <FaFilePdf />
                                        </InfoButton>
                                    </TableRow>
                                </tr>
                                ))}
                                {payments.data.length <= 0 && 
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <TableRow className="p-2" colSpan={7}>
                                        {t('data_is_empty')}
                                    </TableRow>
                                </tr>}
                                </tbody>
                            </TableLayout>
                        </div>
                        <div className="px-4">
                            <Pagination className="mt-6" links={payments.links} />
                        </div>
                    </div>
                </div>
            </div>

            )}

        </AuthenticatedLayout>
    );
}
