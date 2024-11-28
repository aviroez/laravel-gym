import DashboardCheck from '@/Components/DashboardCheck';
import useTranslations from '@/Hooks/jsTranslation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Plan } from '@/types';
import { formatCurrency } from '@/utils/helpers';
import { Head } from '@inertiajs/react';
import { FaFileInvoice, FaReceipt, FaUserCircle } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';

interface DashboardProps {
    allMembers: number,
    activeMembers: number,
    unpaidInvoices: number,
    completedPayments: number,
    latestPlans: [Plan],
}

export default function Dashboard({allMembers, activeMembers, unpaidInvoices, completedPayments, latestPlans}: DashboardProps) {
    const { t } = useTranslations();
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('dashboard')}
                </h2>
            }
        >
            <Head title={t('dashboard')} />

            <div className="pt-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className=" bg-white shadow-sm sm:rounded-lg">
                        <div className="px-4 pt-4 py-2 text-gray-900 flex justify-between gap-4">
                            <article className="rounded-lg border border-gray-100 bg-white w-full p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{t('members')}</p>

                                        <p className="text-2xl font-medium text-gray-900">{allMembers}</p>
                                    </div>

                                    <span className="rounded-full bg-green-100 p-3 text-green-600 w-14">
                                        <FaUserCircle className="w-full h-full"/>
                                    </span>
                                </div>

                                <div className="mt-1 flex gap-1 text-green-600 sm:hidden">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                    </svg>

                                    <p className="flex gap-2 text-xs">
                                    <span className="font-medium"> {activeMembers} </span>

                                    <span className="text-gray-500"> Since last week </span>
                                    </p>
                                </div>
                            </article>
                            
                            <article className="rounded-lg border border-gray-100 bg-white w-full p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{t('active_members')}</p>
                                        <p className="text-2xl font-medium text-gray-900">{activeMembers}</p>
                                    </div>

                                    <span className="rounded-full bg-teal-100 p-3 text-teal-600 w-14">
                                        <FaUserGroup className="w-full h-full" />
                                    </span>
                                </div>

                                <div className="mt-1 flex gap-1 text-red-600 sm:hidden">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                                    />
                                    </svg>

                                    <p className="flex gap-2 text-xs">
                                    <span className="font-medium"> 67.81% </span>

                                    <span className="text-gray-500"> Since last week </span>
                                    </p>
                                </div>
                            </article>
                        </div>
                        <div className="px-4 pt-4 py-2 text-gray-900 flex justify-between gap-4">
                            <article className="rounded-lg border border-gray-100 bg-white w-full p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{t('unpaid_invoices')}</p>

                                        <p className="text-2xl font-medium text-gray-900">{unpaidInvoices}</p>
                                    </div>

                                    <span className="rounded-full bg-blue-100 p-3 text-blue-600 w-14">
                                        <FaFileInvoice className="w-full h-full"/>
                                    </span>
                                </div>

                                <div className="mt-1 flex gap-1 text-green-600 sm:hidden">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                    </svg>

                                    <p className="flex gap-2 text-xs">
                                    <span className="font-medium"> 67.81% </span>

                                    <span className="text-gray-500"> Since last week </span>
                                    </p>
                                </div>
                            </article>
                            
                            <article className="rounded-lg border border-gray-100 bg-white w-full p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{t('payments')}</p>
                                        <p className="text-2xl font-medium text-gray-900">{completedPayments}</p>
                                    </div>

                                    <span className="rounded-full bg-indigo-100 p-3 text-indigo-600 w-14">
                                        <FaReceipt className="w-full h-full"/>
                                    </span>
                                </div>

                                <div className="mt-1 flex gap-1 text-red-600 sm:hidden">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                                    />
                                    </svg>

                                    <p className="flex gap-2 text-xs">
                                    <span className="font-medium"> 67.81% </span>

                                    <span className="text-gray-500"> Since last week </span>
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className=" bg-white shadow-sm sm:rounded-lg">
                        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
                                {latestPlans && latestPlans.map((plan) => 
                                    <div className={plan.unit === 'week' ? `rounded-2xl border border-indigo-600 p-6 shadow-sm ring-1 ring-indigo-600 sm:px-8 lg:p-12`:
                                        `rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12`}>
                                    <div className="text-center">
                                        <h2 className="text-lg font-medium text-gray-900">
                                        {plan.name}
                                        <span className="sr-only">{plan.name}</span>
                                        </h2>

                                        <p className="mt-2 sm:mt-4">
                                        <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {formatCurrency(plan.price)} </strong>

                                        <span className="text-sm font-medium text-gray-700">{plan.unit && '/' + t(plan.unit)}</span>
                                        </p>
                                    </div>

                                    {plan.description && 
                                        <ul className="mt-6 space-y-2">
                                            {plan.description.split('. ').map((val) => {
                                                return <li className="flex items-center gap-1">
                                                    <DashboardCheck />

                                                    <span className="text-gray-700"> {val} </span>
                                                </li>
                                            })}
                                            
                                        </ul>
                                    }

                                    <a
                                        href="#"
                                        className={plan.unit == 'week' ? `mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500` :
                                            `mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500`}
                                    >
                                        Get Started
                                    </a>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
