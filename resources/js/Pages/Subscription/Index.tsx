import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { FaEdit, FaFileInvoice, FaFilter, FaPlusSquare, FaTrashAlt } from 'react-icons/fa';

import { PaginationLink, Subscription } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatCurrency } from '@/utils/helpers';
import useTranslations from '@/Hooks/jsTranslation';
import DangerButton from '@/Components/DangerButton';
import InfoButton from '@/Components/InfoButton';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import TableRow from '@/Components/TableRow';
import TableLayout from '@/Components/TableLayout';
import Checkbox from '@/Components/Checkbox';
import SuccessButton from '@/Components/SuccessButton';
import FormSubscription from '@/Pages/Subscription/Form';
import InvoiceCreateDialog from '@/Pages/Invoice/CreateDialog';
import SubscriptionShowDialog from '@/Pages/Subscription/ShowDialog';
import SecondaryButton from '@/Components/SecondaryButton';
import { FaFilterCircleXmark } from 'react-icons/fa6';

interface SubscriptionProps {
    subscriptions: {
        data: Subscription[],
        links: PaginationLink[]
    },
    filters: [],
    filtersValue: [],
    types: [],
    statuses: [],
    users: [],
    plans: [],
}

export default function SubscriptionIndex({
    subscriptions,
    filters,
    filtersValue,
    types,
    statuses,
    users,
    plans
}: SubscriptionProps) {
    const { t } = useTranslations();

    const [form, setForm] = useState<'edit_subscription'|'add_subscription'|null>(null)
    const [subscription, setSubscription] = useState<Subscription|null>(null)
    const [selectedSubscriptions, setSelectedSubscriptions] = useState<Subscription[]>([])
    const [checkedUser, setCheckedUser] = useState('')
    const [viewFilter, setViewFilter] = useState(false)
    const [openDialogInvoice, setOpenDialogInvoice] = useState(false)
    const [openDialogSubscription, setOpenDialogSubscription] = useState(false)

    const onCheckboxChange = (e: any, subscription: Subscription) => {
        if (e.target.checked) {
            if (subscription.user) {
                setCheckedUser(subscription.user.email)
            }
            setSelectedSubscriptions([...selectedSubscriptions, subscription])
        } else {
            setSelectedSubscriptions(
                selectedSubscriptions.filter(sub => sub.id !== subscription.id)
            );
            if (selectedSubscriptions.length === 0) {
                setCheckedUser('')
            }
        }
    }

    const addAction = () => {
        setForm('add_subscription');
        setSubscription(null)
    }

    const createInvoice = () => {
        setOpenDialogInvoice(true)
    }

    const invoiceAction = (subscription: Subscription) => {
        setSubscription(subscription)
        
        setOpenDialogSubscription(true)
    }

    const editAction = (subscription: Subscription) => {
        if (!subscription) return;

        setForm('edit_subscription');
        setSubscription(subscription)
    }

    const deleteAction = (subscription: Subscription) => {
        if (!subscription) return;
        Inertia.delete(`/subscriptions/${subscription.id}`, {
            onSuccess: () => {
                setSubscription(null)
            }
        });
    }

    const bgStatus = (status: string) => {
        let style = 'px-2 py-1 font-semibold leading-tight rounded-full';
        switch (status) {
            case 'expired': return style + ' text-red-700 bg-red-100';
            case 'incative': return style + ' text-yellow-700 bg-yellow-100';
            case 'active': return style + ' text-green-700 bg-green-100';
            default : return style + ' text-blue-700 bg-blue-100';
        }
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('subscriptions')}
                </h2>
            }
        >
            <Head title={t('subscriptions')} />

            {!form && (
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="px-4 pt-4 py-2 text-gray-900 flex flex-wrap justify-between gap-2">
                            <h5 className="flex text-2xl">{t('subscriptions')}</h5>

                            <div className="flex gap-2">
                                {filters && <SecondaryButton className="flex" onClick={() => setViewFilter(!viewFilter)}>
                                    {viewFilter ? <FaFilter /> : <FaFilterCircleXmark />}
                                </SecondaryButton>}

                                <PrimaryButton className="flex" onClick={(e) => addAction()}>
                                    <FaPlusSquare />&nbsp;{t('add_subscription')}
                                </PrimaryButton>

                                {checkedUser && <InfoButton className="flex" onClick={(e) => createInvoice()}>
                                    <FaFileInvoice />&nbsp;{t('create_invoice')}
                                </InfoButton>}
                            </div>
                        </div>
                        <div className="px-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                            <TableLayout formUrl={route('subscriptions.index')} viewFilter={viewFilter} setViewFilter={setViewFilter} filters={filters} filtersValue={filtersValue}>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <TableRow key="header-checkbox" className="text-center" about="header"></TableRow>
                                        <TableRow key="header-title" className="text-center" about="header">{t('title')}</TableRow>
                                        <TableRow key="header-plan" className="text-center" about="header">{t('plan')}</TableRow>
                                        <TableRow key="header-user" className="text-center hidden sm:table-cell" about="header">{t('user')}</TableRow>
                                        <TableRow key="header-price" className="text-center" about="header">{t('price')}</TableRow>
                                        <TableRow key="header-status" className="text-center" about="header">{t('status')}</TableRow>
                                        <TableRow key="header-type" className="text-center hidden sm:table-cell" about="header">{t('type')}</TableRow>
                                        <TableRow key="header-action" className="text-center hidden sm:table-cell" about="header">{t('action')}</TableRow>
                                    </tr>
                                </thead>
                                <tbody>
                                {subscriptions.data.map((subscription) => (
                                <tr key={subscription.id} className="bg-white border-b hover:bg-gray-50">

                                    <TableRow key={`check-${subscription.id}`} className="p-2 w-6">
                                        {(checkedUser === '' || checkedUser === subscription.user?.email) && (subscription.invoice_items && subscription.invoice_items.length <= 0) ? 
                                            <Checkbox onChange={(e) => onCheckboxChange(e, subscription)}/>
                                            : <></>
                                        }
                                    </TableRow>
                                    <TableRow key={`title-${subscription.id}`} className="p-2">
                                        {subscription.title}
                                        {subscription.type && <span className={"inline-block sm:hidden "+bgStatus('')}>{t(subscription.type)}</span>}
                                    </TableRow>
                                    <TableRow key={`plan-${subscription.id}`} className="p-2">
                                        {subscription.plan?.duration} {subscription.plan?.unit && t(subscription.plan?.unit)}
                                        {subscription.status && 
                                            <span className={"inline-block sm:hidden "+bgStatus(subscription.status || '')}>
                                                {t(subscription.status)}
                                            </span>
                                        }
                                    </TableRow>
                                    <TableRow key={`user-${subscription.id}`} className="p-2 hidden sm:table-cell">{subscription.user?.name} {subscription.user?.phone && t(subscription.user?.phone)}</TableRow>
                                    <TableRow key={`price-${subscription.id}`} className="text-right">{formatCurrency(subscription.price)}</TableRow>
                                    <TableRow key={`status-${subscription.id}`} className="text-center hidden sm:table-cell">
                                        {subscription.status && <span className={bgStatus(subscription.status || '')}>{t(subscription.status)}</span>}
                                    </TableRow>
                                    <TableRow key={`type-${subscription.id}`} className="text-center hidden sm:table-cell">
                                    {subscription.type && <span className={bgStatus('')}>{t(subscription.type)}</span>}
                                        
                                    </TableRow>
                                    <TableRow key={`action-${subscription.id}`} className="">
                                        {subscription.invoice_items && subscription.invoice_items.length > 0 && 
                                            <SuccessButton onClick={(e) => invoiceAction(subscription)}>
                                                <FaFileInvoice />
                                            </SuccessButton>}
                                        <InfoButton onClick={(e) => editAction(subscription)}>
                                            <FaEdit />
                                        </InfoButton>
                                        <DangerButton onClick={(e) => deleteAction(subscription)}>
                                            <FaTrashAlt />
                                        </DangerButton>
                                    </TableRow>
                                </tr>
                                ))}
                                </tbody>
                            </TableLayout>
                        </div>
                        <div className="px-4">
                            <Pagination className="mt-6" links={subscriptions.links} />
                        </div>
                    </div>
                </div>
            </div>

            )}

            {form && (
                <FormSubscription form={form} setForm={setForm} subscription={subscription} setSubscription={setSubscription} types={types} statuses={statuses} plans={plans} users={users} />
            )}

            <InvoiceCreateDialog open={openDialogInvoice} setOpen={setOpenDialogInvoice} selectedSubscriptions={selectedSubscriptions}/>
            <SubscriptionShowDialog open={openDialogSubscription} setOpen={setOpenDialogSubscription} subscription={subscription}/>
        </AuthenticatedLayout>
    );
}