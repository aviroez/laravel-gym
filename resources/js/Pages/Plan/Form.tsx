import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import useTranslations from '@/Hooks/jsTranslation';
import { Plan } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';

type FormPlanProps = {
    form: string,
    plan: Plan | null,
    setPlan: any,
    setForm: any,
    types: [],
    statuses: [],
    units: [],
}
export default function FormPlan({
    form,
    plan,
    setPlan,
    setForm,
    types,
    statuses,
    units,
}: FormPlanProps) {
    const { t } = useTranslations();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: plan?.name ?? '',
        description: plan?.description ?? '',
        duration: plan?.duration ?? '',
        unit: plan?.unit ?? 'day',
        price: plan?.price ?? '',
        status: plan?.status ?? 'active',
        type: plan?.type ?? 'subscription'
    });

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (form === 'edit_plan' && plan) {
            Inertia.put(`/plans/${plan.id}`, data, {
                onSuccess: () => {
                    reset();
                    setPlan(null)
                }
            });
        } else {
            post('/plans', {
                onSuccess: () => {
                    reset();
                    setPlan(null)
                }
            });
        }
    }

    const onBack = () => {
        setForm(null);
    }
    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="px-4 pt-4 py-2 text-gray-900">
                        <h5 className="col-start-1 text-2xl">{t(form)}</h5>
                    </div>
                    <div className="px-4">
                        <form onSubmit={onSubmit} className="mb-4 grid gap-4 grid-cols-2">
                            <div className="col-span-2">
                                <InputLabel htmlFor="name">{t('name')}:</InputLabel>
                                <TextInput id="name" name="name" required placeholder={t('input_name')} value={data.name ?? ''} onChange={(e) => setData('name', e.target.value)} className="w-full"/>
                                {errors.name && <InputError message={errors.name} />}
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="description">{t('description')}:</InputLabel>
                                <TextInput id="description" name="description" placeholder={t('input_description')} value={data.description ?? ''} onChange={(e) => setData('description', e.target.value)} className="w-full"/>
                                {errors.description && <InputError message={errors.description} />}
                            </div>
                            <div className="">
                                <InputLabel htmlFor="duration">{t('duration')}:</InputLabel>
                                <TextInput id="duration" name="duration" required placeholder={t('input_duration')} value={data.duration ?? ''} onChange={(e) => setData('duration', e.target.value)} className="w-full"/>
                                {errors.duration && <InputError message={errors.duration} />}
                            </div>
                            <div className="">
                                <InputLabel htmlFor="unit">{t('unit')}:</InputLabel>
                                <select id="unit" name="unit" value={data.unit ?? ''} onChange={(e: any) => setData('unit', e.target.value)} className="w-full">
                                    {Object.entries(units).map(([key, value]) => {
                                        return <option key={key} value={key}>{value}</option>
                                    })}
                                </select>
                                {errors.unit && <InputError message={errors.unit} />}
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="price">{t('price')}:</InputLabel>
                                <TextInput id="price" name="price" type="number" min="0" placeholder={t('input_price')} value={data.price ?? ''} onChange={(e) => setData('price', e.target.value)} className="w-full"/>
                                {errors.price && <InputError message={errors.price} />}
                            </div>
                            <div className="">
                                <InputLabel htmlFor="status">{t('status')}:</InputLabel>

                                <select id="status" name="status" value={data.status ?? ''} onChange={(e: any) => setData('status', e.target.value)} className="w-full">
                                    {Object.entries(statuses).map(([key, value]) => {
                                        return <option key={key} value={key}>{value}</option>
                                    })}
                                </select>
                                {errors.status && <InputError message={errors.status} />}
                            </div>
                            <div className="">
                                <InputLabel htmlFor="type">{t('type')}:</InputLabel>
                                
                                <select id="type" name="type" value={data.type ?? ''} onChange={(e: any) => setData('type', e.target.value)} className="w-full">
                                    {Object.entries(types).map(([key, value]) => {
                                        return <option key={key} value={key}>{value}</option>
                                    })}
                                </select>
                                {errors.type && <InputError message={errors.type} />}
                            </div>
                            <div className="col-span-2">
                                {plan && (
                                    <input type="hidden" id="id" value={plan.id} />
                                )}
                                <SecondaryButton type="button" onClick={onBack} className="mr-2">{t('back')}</SecondaryButton>
                                <PrimaryButton onSubmit={onSubmit}>{t('save')}</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
