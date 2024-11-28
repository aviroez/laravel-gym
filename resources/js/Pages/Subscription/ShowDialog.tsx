
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react'
import { PiInvoiceBold } from 'react-icons/pi'
import { formatCurrency, formatDate } from '@/utils/helpers'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import useTranslations from '@/Hooks/jsTranslation'
import { Invoice, Subscription } from '@/types';

interface SubscriptionShowDialogProps {
    open: boolean,
    setOpen: (open: boolean) => void, 
    subscription: Subscription | null
}
export default function SubscriptionShowDialog({open, setOpen, subscription = null}: SubscriptionShowDialogProps) {
    const { t } = useTranslations();

    const [ invoices, setInvoices ] = useState<Invoice[]>([])

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: '',
        user_name: '',
        date: formatDate(),
        due_date: formatDate(),
        total: 0,
        subscriptions: [
            {
                id: '',
                quantity: 1,
                price: ''
            }
        ]
    });

    useEffect( () => {
        if (subscription && subscription.id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/invoices/${subscription.id}/subscriptions`, {
                        method: 'GET',
                        headers: {
                            "Accept": "application/json",
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
              
                    const responseData = await response.json();
                    setInvoices(responseData);
                    return responseData;
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message);
                    }
                }
            }
            const data = fetchData()
        }
    }, [subscription])

    const goToInvoice = (invoiceId: string) => {
        Inertia.visit(`/invoices/${invoiceId}`, {
            onSuccess: (response) => {
                // reset();
                // setOpen(false)
            },
            onError: (errors) => {
                console.log('errors', errors)
            }
        });
    }


    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <PiInvoiceBold aria-hidden="true" className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        {t('invoice_list')}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <ul className="w-full">
                                            {invoices && invoices.map((invoice) => {
                                                return <li key={invoice.id} className="border border-gray-500 rounded-md m-2 p-2 hover:border-slate-800 hover:bg-slate-400 cursor-pointer">
                                                    <div className="flex flex-row justify-between">
                                                        <span className="flex">#{invoice.number}</span>
                                                        <span className="right-0">{invoice.due_date?.getUTCDate()}</span>
                                                    </div>
                                                    <ul className="mt-2" onClick={() => goToInvoice(invoice.id.toString())}>
                                                        {invoice.items && invoice.items.map((item) => {
                                                            return <li key={item.id} className="flex justify-between">
                                                                <strong>{item.subscription ? item.subscription.title : ''}</strong>
                                                                <i>{item.quantity}x</i>
                                                                <span>{formatCurrency(item.price)}</span>
                                                            </li>
                                                        })}
                                                        <li className="flex justify-between mt-1">
                                                            <strong>Total</strong>
                                                            <strong>{formatCurrency(invoice.total)}</strong>
                                                        </li>
                                                    </ul>
                                                </li>
                                            })}
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <SecondaryButton
                                type="submit"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto"
                            >
                                {t('close')}
                            </SecondaryButton>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>

    )
}
