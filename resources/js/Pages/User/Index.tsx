import { Head, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { FaEdit, FaFilter, FaPlusSquare, FaTrashAlt } from 'react-icons/fa';
import { PaginationLink, User } from '@/types';
import DangerButton from '@/Components/DangerButton';
import InfoButton from '@/Components/InfoButton';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import TableRow from '@/Components/TableRow';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TableLayout from '@/Components/TableLayout';
import useTranslations from '@/Hooks/jsTranslation';
import FormUser from '@/Pages/User/Form';
import SecondaryButton from '@/Components/SecondaryButton';
import { FaFilterCircleXmark } from 'react-icons/fa6';

interface UserProps {
    users: {
        data: User[],
        links: PaginationLink[]
    },
    filters: [],
    filtersValue: [],
    roles: [],
    genders: [],
}

export default function UserIndex({ users, filters, filtersValue, roles, genders }: UserProps) {
    const { props } = usePage();

    const { t } = useTranslations();

    const [form, setForm] = useState<'edit_user'|'add_user'|null>(null)
    const [user, setUser] = useState<User|null>(null)
    const [viewFilter, setViewFilter] = useState(false)

    const addAction = () => {
        setForm('add_user');
        setUser(null)
    }

    const editAction = (user: User) => {
        if (!user) return;

        setForm('edit_user');
        setUser(user)
    }

    const deleteAction = (user: User) => {
        if (!user) return;
        Inertia.delete(`/users/${user.id}`, {
            onSuccess: () => {
                setUser(null)
            }
        });
    }

    const bgGender = (status: string) => {
        let style = 'px-2 py-1 font-semibold leading-tight rounded-full';
        switch (status) {
            case 'female': return style + ' text-pink-700 bg-pink-100';
            case 'male' : return style + ' text-blue-700 bg-blue-100';
            default : return style + ' text-green-700 bg-green-100';
        }
    }

    const bgRole = (status: string) => {
        let style = 'px-2 py-1 font-semibold leading-tight rounded-full';
        switch (status) {
            case 'member': return style + ' text-yellow-700 bg-yellow-100';
            case 'admin': return style + ' text-green-700 bg-green-100';
            default : return style + ' text-blue-700 bg-blue-100';
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 bg-">
                    {t('users')}
                </h2>
            }
        >
            <Head title={t('users')} />

            {!form && (
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className=" bg-white shadow-sm sm:rounded-lg">
                        <div className="px-4 pt-4 py-2 text-gray-900 flex justify-between gap-4">
                            <h5 className="flex col-start-1 text-2xl">{t('users')}</h5>

                            <div className="flex gap-2">
                                {filters && <SecondaryButton className="flex" onClick={() => setViewFilter(!viewFilter)}>
                                    {viewFilter ? <FaFilter /> : <FaFilterCircleXmark />}
                                </SecondaryButton>}
                                
                                <PrimaryButton className="flex" onClick={(e) => addAction()}>
                                    <FaPlusSquare />&nbsp;{t('add_user')}
                                </PrimaryButton>
                            </div>
                        </div>
                        <div className="px-4">
                            <TableLayout formUrl={route('users.index')} viewFilter={viewFilter} setViewFilter={setViewFilter} filters={filters} filtersValue={filtersValue}>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <TableRow key="header-name" className="" about="header">{t('name')}</TableRow>
                                        <TableRow key="header-email" className="" about="header">{t('email')}</TableRow>
                                        <TableRow key="header-phone" className="" about="header">{t('phone')}</TableRow>
                                        <TableRow key="header-birth-date" className="text-center hidden sm:table-cell" about="header">{t('birth_date')}</TableRow>
                                        <TableRow key="header-role" className="text-center hidden sm:table-cell" about="header">{t('role')}</TableRow>
                                        <TableRow key="header-gender" className="text-center hidden sm:table-cell" about="header">{t('gender')}</TableRow>
                                        <TableRow key="header-action" className="text-center" about="header">{t('action')}</TableRow>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.data.map((user) => (
                                <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                    <TableRow key={`name-${user.id}`} className="p-2">
                                        {user.name}
                                        {user.gender && <span className={"inline-block sm:hidden ml-1 "+bgGender(user.gender)}>{t(user.gender)}</span>}                                        
                                    </TableRow>
                                    <TableRow key={`duration-${user.id}`} className="p-2">
                                        {user.email}
                                        {user.role && 
                                            <span className={"inline-block sm:hidden ml-1 "+bgRole(user.role ?? '')}>{t(user.role)}</span>
                                        }
                                    </TableRow>
                                    <TableRow key={`phone-${user.id}`} className="text-right">{user.phone}</TableRow>
                                    <TableRow key={`birth_date-${user.id}`} className="text-right hidden sm:table-cell">{user.birth_date}</TableRow>
                                    <TableRow key={`role-${user.id}`} className="text-center hidden sm:table-cell">
                                        {user.role && <span className={bgRole(user.role ?? '')}>{t(user.role)}</span>}                                        
                                    </TableRow>
                                    <TableRow key={`gender-${user.id}`} className="text-center hidden sm:table-cell">
                                        {user.gender ? <span className={bgGender(user.gender)}>{t(user.gender)}</span> : '-'}                                        
                                    </TableRow>
                                    <TableRow key={`action-${user.id}`} className="text-center">
                                        {user.id !== props.auth.user.id ? 
                                        <>
                                            <InfoButton className="space-x-0.5" onClick={(e) => editAction(user)}>
                                                <FaEdit />
                                            </InfoButton>
                                            <DangerButton className="space-x-0.5" onClick={(e) => deleteAction(user)}>
                                                <FaTrashAlt />
                                            </DangerButton>
                                        </> : '-'}
                                    </TableRow>
                                </tr>
                                ))}
                                {users.data.length <= 0 && 
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <TableRow className="p-2" colSpan={6}>
                                        {t('data_is_empty')}
                                    </TableRow>
                                </tr>}
                                </tbody>
                            </TableLayout>
                        </div>
                        <div className="px-4">
                            <Pagination className="mt-6" links={users.links} />
                        </div>
                    </div>
                </div>
            </div>

            )}

            {form && (
                <FormUser form={form} setForm={setForm} user={user} setUser={setUser} roles={roles} genders={genders} />
            )}
        </AuthenticatedLayout>
    );
}
