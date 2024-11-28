
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from '@inertiajs/inertia-react'
import { useEffect } from 'react'
import { formatCurrency, formatDate } from '@/utils/helpers'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton'
import TextInput from '@/Components/TextInput'
import useTranslations from '@/Hooks/jsTranslation'
import { FaMoneyBill } from 'react-icons/fa'
import InputError from '@/Components/InputError'
import CheckboxInput from '@/Components/CheckboxInput'
import CheckboxOption from '@/Components/CheckboxLabel'
import { Invoice } from '@/types'

type PaymentCreateDialogProp = {
    open: boolean,
    setOpen: (open: boolean) => void,
    invoice: Invoice
}

export default function PaymentCreateDialog({open, setOpen, invoice}: PaymentCreateDialogProp) {
    const { t } = useTranslations();

    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        invoice_id: invoice.id,
        invoice_number: invoice.number,
        date: formatDate(),
        amount: invoice.total,
        paid: 0,
        method: '',
        note: '',
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        clearErrors();
        let valid = true;
        if (!data.method) {
            setError("method", t('method_is_required'));
            valid = false;
        } else {
            setError("method", '');
        }
        if (!data.paid) {
            setError("paid", t('paid_is_required'));
            valid = false;
        } else {
            setError("paid", '');
        }

        if (valid === true){
            post('/payments', {
                onSuccess: (response) => {
                    reset();
                    setOpen(false)
                },
                onError: (errors) => {
                    console.log('errors', errors)
                }
            });
        }
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
                                    <FaMoneyBill aria-hidden="true" className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        {t('create_invoice')}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <form onSubmit={onSubmit} id="formPayment" className="w-96 max-w-7xl text-start">
                                            <InputLabel htmlFor="invoice_id">{t('invoice')}</InputLabel>
                                            <TextInput id="invoice_id" value={data.invoice_number} readOnly={true} className="w-full" />
                                            {errors.invoice_id && <InputError message={errors.invoice_id} />}
                                            
                                            <InputLabel htmlFor="date">{t('payment_date')}</InputLabel>
                                            <TextInput id="date" value={data.date} type="date" onChange={(e) => setData('date', e.target.value)} className="w-full" />
                                            {errors.date && <InputError message={errors.date} />}
                                            
                                            <InputLabel htmlFor="amount">{t('amount')}</InputLabel>
                                            <TextInput id="amount" value={data.amount} type="number" onChange={(e) => setData('amount', Number(e.target.value))} className="w-full" />
                                            {errors.amount && <InputError message={errors.amount} />}
                                            
                                            <InputLabel htmlFor="paid">{t('paid')}</InputLabel>
                                            <TextInput id="paid" value={data.paid} type="number" onChange={(e) => setData('paid', Number(e.target.value))} className="w-full" />
                                            {errors.paid && <InputError message={errors.paid} />}

                                            <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-gray-400">How do you want to pay?</h3>
                                            <ul className="grid w-full gap-6 md:grid-cols-2">
                                                <li>
                                                    <CheckboxInput id="method-cash" name="method" value="cash" checked={data.method === "cash"} onChange={() => setData('method', 'cash')} />
                                                    <CheckboxOption title={t('cash')} about={t('pay_using_cash')} htmlFor="hosting-small" onClick={() => setData('method', 'cash')} />
                                                </li>
                                                <li>
                                                    <input type="radio" id="method-cashless" name="method" value="cashless" className="hidden peer" checked={data.method === "cashless"} onChange={() => setData('method', 'cashless')}  />
                                                    <label htmlFor="hosting-big" onClick={() => setData('method', 'cashless')} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-500 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 hover:border-gray-400">
                                                        <div className="block">
                                                            <div className="w-full text-lg font-semibold">{t('cashless')}</div>
                                                            <div className="w-full">{t('transfer_to_bank_ewallet')}</div>
                                                        </div>
                                                    </label>
                                                </li>
                                            </ul>
                                            {errors.method && <InputError message={errors.method}/>}

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <PrimaryButton
                                type="submit"
                                form="formPayment"
                                onClick={() => onSubmit}
                                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto"
                            >
                                {t('submit')}
                            </PrimaryButton>
                            <SecondaryButton
                                type="button"
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
