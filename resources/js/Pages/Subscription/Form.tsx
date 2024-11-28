import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import useTranslations from '@/Hooks/jsTranslation';
import { Plan, Subscription, User } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type FormSubscriptionProps = {
    form: string,
    subscription: Subscription | null,
    setSubscription: any,
    setForm: any,
    types: [],
    statuses: [],
    users: User[],
    plans: Plan[],
}
export default function FormSubscription({
    form,
    subscription,
    setSubscription,
    setForm,
    users,
    plans,
}: FormSubscriptionProps) {
    const { t } = useTranslations();

    const [ isNewUser, setIsNewUser ] = useState(true)

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: subscription?.user_id ?? '',
        plan_id: subscription?.plan_id ?? '',
        title: subscription?.title ?? '',
        date_from: subscription?.date_from ?? '',
        date_to: subscription?.date_to ?? '',
        status: subscription?.status ?? 'active',
        type: subscription?.type ?? 'subscription',
        quantity: subscription?.quantity ?? '',
        price: subscription?.type ?? '',
        user_name: '',
        user_email: '',
    });

    useEffect(() => {
        const selectedPlan = plans.length > 0 ? plans[0] : null
        if (selectedPlan) {
            setData('quantity', String(selectedPlan.duration))
            setData('price', String(selectedPlan.price))
        }
    }, [])

    const onChangeUser = (e: any) => {
        setData(data => ({ ...data, user_id: String(e.target.value), user_name: '', user_email: ''}));
    }

    const onChangePlan = (e: any) => {
        setData(data => ({ ...data, plan_id: String(e.target.value)}));

        const selectedPlan = plans.find(plan => plan.id == e.target.value)
        if (selectedPlan) {
            setData(data => ({ ...data, quantity: String(selectedPlan.duration), price: String(selectedPlan.price)}));

            if (data.title === '') {
                let title = selectedPlan.name;
                if (selectedPlan.unit) {
                    title += ` ${selectedPlan.duration} ${t(selectedPlan.unit)}`
                }
                setData(data => ({ ...data, title: title}));
            }
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (form === 'edit_subscription' && subscription) {
            Inertia.put(`/subscriptions/${subscription.id}`, data, {
                onSuccess: () => {
                    reset();
                    setSubscription(null)
                },
                onError: () => {

                }
            });
        } else {
            post('/subscriptions', {
                onSuccess: (response) => {
                    reset();
                    setSubscription(null)
                },
                onError: (errors) => {
                    console.log('errors', errors)
                    
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
                                <InputLabel htmlFor="user_id">{t('user')}:</InputLabel>
                                <select id="user_id" name="user_id" value={data.user_id ?? ''} onChange={(e) => onChangeUser(e)} className="w-full">
                                    <option value="">{t('add_user')}</option>
                                    {users.map((user) => {
                                        return <option key={user.id} value={user.id}>{user.name}</option>
                                    })}
                                </select>
                                {errors.user_id && <InputError message={errors.user_id} />}
                            </div>
                            {!data.user_id && <>
                                <div className="">
                                    <InputLabel htmlFor="user_name">{t('user_name')}:</InputLabel>
                                    <TextInput id="user_name" name="user_name" type="text" required={!data.user_id} placeholder={t('input_name')} value={data.user_name ?? ''} onChange={(e) => setData('user_name', e.target.value)} className="w-full"/>
                                    {errors.user_name && <InputError message={errors.user_name} />}
                                </div>
                                <div className="">
                                    <InputLabel htmlFor="user_email">{t('user_email')}:</InputLabel>
                                    <TextInput id="user_email" name="user_email" type="email" required={!data.user_id} placeholder={t('input_email')} value={data.user_email ?? ''} onChange={(e) => setData('user_email', e.target.value)} className="w-full"/>
                                    {errors.user_email && <InputError message={errors.user_email} />}
                                </div>
                            </>}
                            <div className="col-span-2">
                                <InputLabel htmlFor="plan_id">{t('plan')}:</InputLabel>
                                <select id="plan_id" name="plan_id" value={data.plan_id ?? ''} required onChange={(e) => onChangePlan(e)} className="w-full">
                                    <option value="">{t('select_plan')}</option>
                                    {plans.map((plan) => {
                                        return <option key={plan.id} value={plan.id}>{plan.name} ({plan.duration} {plan.unit && t(plan.unit)})</option>
                                    })}
                                </select>
                                {errors.plan_id && <InputError message={errors.plan_id} />}
                            </div>
                            <div className="">
                                <InputLabel htmlFor="quantity">{t('quantity')}:</InputLabel>
                                <TextInput id="quantity" name="quantity" type="text" min="0" required placeholder={t('input_quantity')} value={data.quantity ?? ''} onChange={(e) => setData('quantity', e.target.value)} className="w-full"/>
                                {errors.quantity && <InputError message={errors.quantity} />}
                            </div>
                            <div className="">
                                <InputLabel htmlFor="price">{t('price')}:</InputLabel>
                                <TextInput id="price" name="price" type="number" min="0" placeholder={t('input_price')} value={data.price ?? ''} onChange={(e) => setData('price', e.target.value)} className="w-full"/>
                                {errors.price && <InputError message={errors.price} />}
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="title">{t('title')}:</InputLabel>
                                <TextInput id="title" name="title" required placeholder={t('input_title')} value={data.title ?? ''} onChange={(e) => setData('title', e.target.value)} className="w-full"/>
                                {errors.title && <InputError message={errors.title} />}
                            </div>
                            <div className="">
                                <InputLabel htmlFor="date_from">{t('date_from')}:</InputLabel>
                                <TextInput id="date_from" name="date_from" type="date" placeholder={t('input_date_from')} value={data.date_from.toString() ?? ''} onChange={(e) => setData('date_from', e.target.value)} className="w-full"/>
                                {errors.date_from && <InputError message={errors.date_from} />}
                            </div>
                            <div className="">
                                <InputLabel htmlFor="date_to">{t('date_to')}:</InputLabel>
                                <TextInput id="date_to" name="date_to" type="date" placeholder={t('input_date_to')} value={data.date_to.toString() ?? ''} onChange={(e) => setData('date_to', e.target.value)} className="w-full"/>
                                {errors.date_to && <InputError message={errors.date_to} />}
                            </div>
                            <div className="col-span-2">
                                {subscription && (
                                    <input type="hidden" id="id" value={subscription.id} />
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
