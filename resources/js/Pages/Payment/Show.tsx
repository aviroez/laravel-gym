import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import useTranslations from '@/Hooks/jsTranslation';
import SuccessButton from '@/Components/SuccessButton';
import { useState } from 'react';
import { Payment } from '@/types/index';

type paymentShowProp = {
    payment: Payment
}

export default function PaymentShow({payment}: paymentShowProp) {
    const { t } = useTranslations();

    const [ openDialogPayment, setOpenDialogPayment ] = useState(false)

    const pdfUrl = `/payments/${payment.id}/pdf`;

    const payNowAction = () => {
        setOpenDialogPayment(true)
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t('payment')}
                </h2>
            }
        >
            <Head title={t('payment')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="px-4 pt-4 py-2 text-gray-900 grid grid-flow-col grid-cols-1 md:grid-flow-row gap-2">
                            <h5 className="col-span-1 text-2xl">{t('payment')}</h5>

                            <div className="min-h-96 max-h-screen w-full mx-auto mt-2">
                                <iframe
                                    src={pdfUrl}
                                    title="PDF Viewer"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 'none' }}
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
