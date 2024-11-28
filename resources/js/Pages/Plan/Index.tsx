import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { FaEdit, FaFilter, FaPlusSquare, FaTrashAlt } from 'react-icons/fa';
import { FaFilterCircleXmark } from 'react-icons/fa6';
import { PaginationLink, Plan } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import useTranslations from '@/Hooks/jsTranslation';
import { formatCurrency } from '@/utils/helpers';
import DangerButton from '@/Components/DangerButton';
import InfoButton from '@/Components/InfoButton';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import TableRow from '@/Components/TableRow';
import TableLayout from '@/Components/TableLayout';
import SecondaryButton from '@/Components/SecondaryButton';
import FormPlan from '@/Pages/Plan/Form';

interface PlanProps {
    plans: {
        data: Plan[],
        links: PaginationLink[]
    },
    filters: [],
    filtersValue: [],
    types: [],
    statuses: [],
    units: [],
}

export default function PlanIndex({ plans, filters, filtersValue, types, statuses, units }: PlanProps) {
    const { t } = useTranslations();

    const [form, setForm] = useState<'edit_plan'|'add_plan'|null>(null)
    const [plan, setPlan] = useState<Plan|null>(null)
    const [viewFilter, setViewFilter] = useState(false)

    const addAction = () => {
        setForm('add_plan');
        setPlan(null)
    }

    const editAction = (plan: Plan) => {
        if (!plan) return;

        setForm('edit_plan');
        setPlan(plan)
    }

    const deleteAction = (plan: Plan) => {
        if (!plan) return;
        Inertia.delete(`/plans/${plan.id}`, {
            onSuccess: () => {
                setPlan(null)
            }
        });
    }

    const bgStatus = (status: string | null) => {
        let style = 'px-2 py-1 font-semibold leading-tight rounded-full';
        switch (status) {
            case 'expired': return style + ' text-red-700 bg-red-100';
            case 'incative': return style + ' text-yellow-700 bg-yellow-100';
            case 'active': return style + ' text-green-700 bg-green-100';
            default : return style + ' text-blue-700 bg-blue-100';
        }
    }

    const bgType = (status: string | null) => {
        let style = 'px-2 py-1 font-semibold leading-tight rounded-full';
        switch (status) {
            case 'subscription': return style + ' text-yellow-700 bg-yellow-100';
            case 'register': return style + ' text-green-700 bg-green-100';
            default : return style + ' text-blue-700 bg-blue-100';
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 bg-">
                    {t('plans')}
                </h2>
            }
        >
            <Head title={t('plans')} />

            {!form && (
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className=" bg-white shadow-sm sm:rounded-lg">
                        <div className="px-4 pt-4 py-2 text-gray-900 flex justify-between gap-4">
                            <h5 className="flex col-start-1 text-2xl">{t('plans')}</h5>

                            <div className="flex gap-2">
                                {filters && <SecondaryButton className="flex" onClick={() => setViewFilter(!viewFilter)}>
                                    {viewFilter ? <FaFilter /> : <FaFilterCircleXmark />}
                                </SecondaryButton>}
                                
                                <PrimaryButton className="flex" onClick={(e) => addAction()}>
                                    <FaPlusSquare />&nbsp;{t('add_plan')}
                                </PrimaryButton>
                            </div>
                        </div>
                        <div className="px-4">
                            <TableLayout formUrl={route('plans.index')} viewFilter={viewFilter} setViewFilter={setViewFilter} filters={filters} filtersValue={filtersValue}>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <TableRow key="header-name" className="text-center" about="header">{t('name')}</TableRow>
                                        <TableRow key="header-duration" className="text-center" about="header">{t('duration')} / {t('unit')}</TableRow>
                                        <TableRow key="header-price" className="text-center" about="header">{t('price')}</TableRow>
                                        <TableRow key="header-status" className="text-center hidden sm:table-cell" about="header">{t('status')}</TableRow>
                                        <TableRow key="header-type" className="text-center hidden sm:table-cell" about="header">{t('type')}</TableRow>
                                        <TableRow key="header-action" className="text-center" about="header">{t('action')}</TableRow>
                                    </tr>
                                </thead>
                                <tbody>
                                {plans.data.map((plan) => (
                                <tr key={plan.id} className="bg-white border-b hover:bg-gray-50">
                                    <TableRow key={`name-${plan.id}`} className="p-2">
                                        {plan.name}
                                        {plan.type && <span className={"inline-block sm:hidden "+bgType(plan.type)}>{t(plan.type)}</span>}
                                    </TableRow>
                                    <TableRow key={`duration-${plan.id}`} className="p-2">
                                        {plan.duration} {plan.unit && t(plan.unit)}
                                        {plan.status && <span className={"inline-block sm:hidden "+bgStatus(plan.status)}>{t(plan.status)}</span>}
                                    </TableRow>
                                    <TableRow key={`price-${plan.id}`} className="text-right">{formatCurrency(plan.price)}</TableRow>
                                    <TableRow key={`status-${plan.id}`} className="text-center hidden sm:table-cell">
                                        {plan.status && <span className={bgStatus(plan.status)}>{t(plan.status)}</span>}
                                    </TableRow>
                                    <TableRow key={`type-${plan.id}`} className="text-center hidden sm:table-cell">
                                        {plan.type && <span className={bgType(plan.type)}>{t(plan.type)}</span>}
                                    </TableRow>
                                    <TableRow key={`action-${plan.id}`} className="text-center">
                                        <InfoButton className="space-x-0.5" onClick={(e) => editAction(plan)}>
                                            <FaEdit />
                                        </InfoButton>
                                        <DangerButton className="space-x-0.5" onClick={(e) => deleteAction(plan)}>
                                            <FaTrashAlt />
                                        </DangerButton>
                                    </TableRow>
                                </tr>
                                ))}
                                {plans.data.length <= 0 && 
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <TableRow className="p-2" colSpan={6}>
                                        {t('data_is_empty')}
                                    </TableRow>
                                </tr>}
                                </tbody>
                            </TableLayout>
                        </div>
                        <div className="px-4">
                            <Pagination className="mt-6" links={plans.links} />
                        </div>
                    </div>
                </div>
            </div>

            )}

            {form && (
                <FormPlan form={form} setForm={setForm} plan={plan} setPlan={setPlan} types={types} statuses={statuses} units={units} />
            )}
        </AuthenticatedLayout>
    );
}
