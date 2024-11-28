
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from '@inertiajs/inertia-react'
import { useEffect } from 'react'
import { PiInvoiceBold } from 'react-icons/pi'
import { formatCurrency, formatDate } from '@/utils/helpers'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import useTranslations from '@/Hooks/jsTranslation'
import { Subscription, User } from '@/types'

type InvoiceCreateDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    selectedSubscriptions: Subscription[]
}

export default function InvoiceCreateDialog({open, setOpen, selectedSubscriptions}: InvoiceCreateDialogProps) {
    const { t } = useTranslations();

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

    const onSubmit = (e: any) => {
        e.preventDefault();

        post('/invoices', {
            onSuccess: (response) => {
                reset();
                setOpen(false)
            },
            onError: (errors) => {
                console.log('errors', errors)
            }
        });
    }

    let user: User | undefined;

    useEffect(() => {
        if (selectedSubscriptions.length > 0) {
            let totalAmount = 0
            const updatedSubscriptions = selectedSubscriptions.map((sub, index) => {
                user = sub.user;
                if (sub.price && sub.quantity && sub.price > 0 && sub.quantity > 0) {
                    totalAmount += (sub.price * sub.quantity);
                }
                return {
                    id: sub.id,
                    quantity: sub.quantity,
                    price: sub.price,
                };
            });

            setData((prevData: any) => ({
                ...prevData,
                subscriptions: updatedSubscriptions,
                total: totalAmount,
                user_id: user?.id,
                user_name: user?.name,
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                subscriptions: [],
                total: 0,
            }));
        }
    }, [selectedSubscriptions, open])


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
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        {t('create_invoice')}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <form onSubmit={onSubmit} id="formInvoice" className="w-96 max-w-7xl">
                                            <InputLabel htmlFor="user_id">{t('user')}</InputLabel>
                                            <TextInput id="user_id" value={data.user_name} readOnly={true} className="w-full" />
                                            {errors.user_id && <span>{errors.user_id}</span>}
                                            
                                            <InputLabel htmlFor="date">{t('invoice_date')}</InputLabel>
                                            <TextInput id="date" value={data.date} type="date" onChange={(e) => setData('date', e.target.value)} className="w-full" />
                                            {errors.date && <span>{errors.date}</span>}
                                            
                                            <InputLabel htmlFor="due_date">{t('due_date')}</InputLabel>
                                            <TextInput id="due_date" value={data.due_date} type="date" onChange={(e) => setData('due_date', e.target.value)} className="w-full" />
                                            {errors.due_date && <span>{errors.due_date}</span>}

                                            {selectedSubscriptions && <ul>
                                                {selectedSubscriptions.map((sub: Subscription, index: any) => {
                                                    return <li key={index} className="box-border rounded-md border-gray-500 p-2">{sub.title} <span className="float-end">{formatCurrency(sub.price)}</span></li>
                                                })}
                                                <li className="box-border rounded-md border-gray-500 p-2">{t('total')} <span className="float-end">{formatCurrency(data.total)}</span></li>
                                            </ul>}

                                            <input type="hidden" value={data.user_id} className="w-full" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <PrimaryButton
                                type="submit"
                                form="formInvoice"
                                onClick={() => onSubmit}
                                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto"
                            >
                                {t('submit')}
                            </PrimaryButton>
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
