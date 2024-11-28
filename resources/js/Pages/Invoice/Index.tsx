import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { FaFilePdf, FaReceipt, FaPlus, FaTrashAlt, FaFilter } from 'react-icons/fa';
import { PaginationLink, Invoice } from '@/types';
import { formatCurrency, formatDateString } from '@/utils/helpers';
import useTranslations from '@/Hooks/jsTranslation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DangerButton from '@/Components/DangerButton';
import InfoButton from '@/Components/InfoButton';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import TableRow from '@/Components/TableRow';
import TableLayout from '@/Components/TableLayout';
import SuccessButton from '@/Components/SuccessButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { FaFilterCircleXmark } from 'react-icons/fa6';

interface InvoiceProps {
    invoices: {
        data: Invoice[],
        links: PaginationLink[]
    },
    filters: [],
    filtersValue: [],
}

export default function InvoiceIndex({ invoices, filters, filtersValue }: InvoiceProps) {
    const { t } = useTranslations();

    const [form, setForm] = useState<'edit_invoice'|'add_invoice'|null>(null)
    const [invoice, setInvoice] = useState<Invoice|null>(null)
    const [viewFilter, setViewFilter] = useState(false)

    const addAction = () => {
        setForm('add_invoice');
        setInvoice(null)
    }

    const receiptPrintAction = (invoice: Invoice) => {
        if (!invoice) return;

        setForm('edit_invoice');
        setInvoice(invoice)
    }

    const showInvoiceAction = (invoice: Invoice) => {
        if (!invoice) return;
        
        Inertia.get(`/invoices/${invoice.id}`, {}, {
            onSuccess: () => {
            }
        });
    }

    const deleteAction = (invoice: Invoice) => {
        if (!invoice) return;
        Inertia.delete(`/invoices/${invoice.id}`, {
            onSuccess: () => {
                setInvoice(null)
            }
        });
    }

    const bgStatus = (status: string) => {
        switch (status) {
            case 'unpaid': return 'bg-red-400';
            case 'partially_paid': return 'bg-yellow-400';
            case 'paid': return 'bg-lime-400';
            default : return 'bg-blue-400';
        }
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('invoices')}
                </h2>
            }
        >
            <Head title={t('invoices')} />

            {!form && (
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="px-4 pt-4 py-2 text-gray-900 flex justify-between gap-4">
                            <h5 className="flex col-start-1 text-2xl">{t('invoices')}</h5>

                            <div className="flex gap-2">
                                {filters && <SecondaryButton className="flex" onClick={() => setViewFilter(!viewFilter)}>
                                    {viewFilter ? <FaFilter /> : <FaFilterCircleXmark />}
                                </SecondaryButton>}

                                <PrimaryButton className="flex" onClick={(e) => addAction()}>
                                    <FaPlus />&nbsp;{t('add_invoice')}
                                </PrimaryButton>
                            </div>
                        </div>
                        <div className="px-4">
                            <TableLayout formUrl={route('invoices.index')} viewFilter={viewFilter} setViewFilter={setViewFilter} filters={filters} filtersValue={filtersValue}>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <TableRow className="text-center" about="header">{t('name')}</TableRow>
                                        <TableRow key="header-user" className="text-center hidden md:table-cell" about="header">{t('user')}</TableRow>
                                        <TableRow key="header-due-data" className="text-center" about="header">{t('due_date')}</TableRow>
                                        <TableRow key="header-status" className="text-center" about="header">{t('total')}</TableRow>
                                        <TableRow key="header-type" className="text-center hidden sm:table-cell" about="header">{t('status')}</TableRow>
                                        <TableRow key="header-action" className="text-center" about="header">{t('action')}</TableRow>
                                    </tr>
                                </thead>
                                <tbody className="h-full">
                                {invoices.data.map((invoice) => (
                                <tr key={invoice.id} className="bg-white border-b hover:bg-gray-50">
                                    <TableRow key={`number-${invoice.id}`} className="p-2">
                                        {invoice.number}
                                        {invoice.status && <span className={"inline-block sm:hidden p-1 rounded-md text-slate-600 text-sm "+bgStatus(invoice.status)}>{t(invoice.status)}</span>}
                                    </TableRow>
                                    <TableRow key={`user-${invoice.id}`} className="hidden md:table-cell h-full">{invoice.user?.name}</TableRow>
                                    <TableRow key={`due-date-${invoice.id}`} className="text-right">{formatDateString(invoice.due_date)}</TableRow>
                                    <TableRow key={`total-${invoice.id}`} className="text-center">{formatCurrency(invoice.total)}</TableRow>
                                    <TableRow key={`status-${invoice.id}`} className="text-center hidden sm:table-cell">
                                        {invoice.status && <span className={"inline-block p-1 rounded-md text-slate-600 text-sm "+bgStatus(invoice.status)}>{t(invoice.status)}</span>}
                                    </TableRow>
                                    <TableRow key={`action-${invoice.id}`} className="text-center w-1/12 gap-1">
                                        {invoice.status && ['paid', 'partially_paid'].includes(invoice.status) && (
                                            <SuccessButton className="space-x-0.5" onClick={(e) => receiptPrintAction(invoice)}>
                                                <FaReceipt />
                                            </SuccessButton>
                                        )}
                                        {invoice.status === 'unpaid' && (
                                            <>
                                                <InfoButton className="space-x-0.5" onClick={(e) => showInvoiceAction(invoice)}>
                                                    <FaFilePdf />
                                                </InfoButton>
                                                <DangerButton className="space-x-0.5" onClick={(e) => deleteAction(invoice)}>
                                                    <FaTrashAlt />
                                                </DangerButton>
                                            </>
                                        )}
                                    </TableRow>
                                </tr>
                                ))}
                                {invoices.data.length <= 0 && 
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <TableRow className="p-2" colSpan={6}>
                                        {t('data_is_empty')}
                                    </TableRow>
                                </tr>}
                                </tbody>
                            </TableLayout>
                        </div>
                        <div className="px-4">
                            <Pagination className="mt-6" links={invoices.links} />
                        </div>
                    </div>
                </div>
            </div>

            )}
        </AuthenticatedLayout>
    );
}
