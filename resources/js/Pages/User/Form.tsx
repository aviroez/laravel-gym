import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import useTranslations from '@/Hooks/jsTranslation';
import { User } from '@/types';
import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';

type FormUserProps = {
    form: string,
    user: User | null,
    setUser: any,
    setForm: any,
    genders: [],
    roles: [],
}

export default function FormUser({
    form,
    user,
    setUser,
    setForm,
    genders,
    roles,
}: FormUserProps) {
    const { t } = useTranslations();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: user?.password ?? '',
        phone: user?.phone ?? '',
        birth_date: user?.birth_date ?? '',
        role: user?.role ?? 'member',
        gender: user?.gender ?? 'male',
    });

    const [ checkPassword, setCheckPassword ] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form === 'edit_user' && user) {
            Inertia.put(`/users/${user.id}`, data, {
                onSuccess: () => {
                    reset();
                    setUser(null)
                }
            });
        } else {
            post('/users', {
                onSuccess: () => {
                    reset();
                    setUser(null)
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
                                <InputLabel htmlFor="email">{t('email')}:</InputLabel>
                                <TextInput id="email" name="email" type="email" required placeholder={t('input_email')} value={data.email ?? ''} onChange={(e) => setData('email', e.target.value)} className="w-full"/>
                                {errors.email && <InputError message={errors.email} />}
                            </div>
                            {form == 'edit_user' && <>
                                <div className="col-span-2 flex gap-1">
                                    <Checkbox id="check_password" onChange={() => setCheckPassword(!checkPassword)} /> <label htmlFor="check_password">{t('update_password')}:</label>
                                </div>
                                {checkPassword && 
                                <div className="col-span-2">
                                    <InputLabel htmlFor="password">{t('password')}:</InputLabel>
                                    <TextInput id="password" name="password" required placeholder={t('input_password')} value={data.password ?? ''} onChange={(e) => setData('password', e.target.value)} className="w-full"/>
                                    {errors.password && <InputError message={errors.password} />}
                                </div>}
                            </>}
                            {form == 'add_user' && <>
                                <div className="col-span-2">
                                    <InputLabel htmlFor="password">{t('password')}:</InputLabel>
                                    <TextInput id="password" name="password" required placeholder={t('input_password')} value={data.password ?? ''} onChange={(e) => setData('password', e.target.value)} className="w-full"/>
                                    {errors.password && <InputError message={errors.password} />}
                                </div>
                            </>}
                            <div className="col-span-2">
                                <InputLabel htmlFor="phone">{t('phone')}:</InputLabel>
                                <TextInput id="phone" name="phone" placeholder={t('input_phone')} value={data.phone ?? ''} onChange={(e) => setData('phone', e.target.value)} className="w-full"/>
                                {errors.phone && <InputError message={errors.phone} />}
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="birth_date">{t('birth_date')}:</InputLabel>
                                <TextInput id="birth_date" name="birth_date" type="date" placeholder={t('input_birth_date')} value={data.birth_date ?? ''} onChange={(e) => setData('birth_date', e.target.value)} className="w-full"/>
                                {errors.birth_date && <InputError message={errors.birth_date} />}
                            </div>
                            <div className="">
                                <InputLabel htmlFor="role">{t('role')}:</InputLabel>
                                <select id="role" name="role" value={data.role} onChange={(e: any) => setData('role', e.target.value as "admin" | "operator" | "member" | "guest")} className="w-full">
                                    {Object.entries(roles).map(([key, value]) => {
                                        return <option key={key} value={key}>{value}</option>
                                    })}
                                </select>
                                {errors.role && <InputError message={errors.role} />}
                            </div>
                            <div className="">
                                <InputLabel htmlFor="gender">{t('gender')}:</InputLabel>

                                <select id="gender" name="gender" value={data.gender ?? ''} onChange={(e: any) => setData('gender', e.target.value as "male" | "female")} className="w-full">
                                    {Object.entries(genders).map(([key, value]) => {
                                        return <option key={key} value={key}>{value}</option>
                                    })}
                                </select>
                                {errors.gender && <InputError message={errors.gender} />}
                            </div>
                            <div className="col-span-2">
                                {user && (
                                    <input type="hidden" id="id" value={user.id} />
                                )}
                                <SecondaryButton type="button" onClick={onBack} className="mr-2">{t('back')}</SecondaryButton>
                                <PrimaryButton type="submit">{t('save')}</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
