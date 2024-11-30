import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import { FaMinusSquare, FaPaperPlane, FaPlusSquare } from 'react-icons/fa';
import { Setting } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import useTranslations from '@/Hooks/jsTranslation';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import InfoButton from '@/Components/InfoButton';

interface SettingProps {
    settings: Setting[],
}

export default function SettingIndex({ settings }: SettingProps) {
    const { t } = useTranslations();

    const [setting, setSetting] = useState<Setting | null>(null);
    const [newSettings, setNewSettings] = useState<Setting[]>(settings);

    const initialFormState = Object.keys(newSettings).reduce((acc: any, key: any) => {
        acc[key] = newSettings[key].value || ''; // Default to empty string if no value is provided
        return acc;
    }, {});

    const { data, setData, post, progress } = useForm(initialFormState);

    const addAction = () => {
        setSetting({
            key: '',
            value: '',
            type: 'text'
        })
    }
    const handleChange = (e: any, key: string) => {
        setSetting((prev: any) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    const submitAction = (e: any) => {
        e.preventDefault();
        post(route('settings.store'))
    }

    const deleteAction = () => {
        setSetting(null)
    }

    const applyAction = () => {
        if (setting) {
            const tempSetting = newSettings.filter((value, index) => value.key === setting.key);
            if (tempSetting) {
                // TODO: handling updated value if key exist
                setNewSettings([...newSettings, setting]);
            } else {
                setNewSettings([...newSettings, setting]);
            }
            setSetting(null);
        }
    }

    const setNewSettingValue = (e: any, setting: Setting) => {

    }

    const uppercaseKey = (key: string) => {
        let list = key.split('_');

        for (let i = 0; i < list.length; i++) {
            list[i] = list[i].charAt(0).toUpperCase() + list[i].slice(1).toLowerCase();
        }

        return list.join(' ');
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 bg-">
                    {t('settings')}
                </h2>
            }
        >
            <Head title={t('settings')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className=" bg-white shadow-sm sm:rounded-lg">
                        <div className="px-4 pt-4 py-2 text-gray-900 flex justify-between gap-4">
                            <h5 className="flex col-start-1 text-2xl">{t('settings')}</h5>
                        </div>
                        <div className="px-4">
                            <form className="flex flex-col" onSubmit={submitAction} encType="multipart/form-data">
                                {newSettings && Object.entries(newSettings).map(([key, newSetting]) => {
                                    return <div key={key} className="flex justify-between mb-2">
                                        <label htmlFor={newSetting.key} className="font-medium">{uppercaseKey(newSetting.key)}</label>
                                        {newSetting.type == 'textarea' ? 
                                            <textarea id={newSetting.key} value={data[newSetting.key]} onChange={(e) => setData(newSetting.key, e.target.value)} placeholder={uppercaseKey(newSetting.key)} className="w-8/12" />
                                        : <input id={newSetting.key} type={newSetting.type} value={newSetting.type !== "file" ? data[newSetting.key] : undefined} onChange={(e: any) => {
                                            if (newSetting.type === "file") {
                                                setData(newSetting.key, e.target.files?.[0] || null);
                                            } else {
                                                setData(newSetting.key, e.target.value);
                                            }
                                        }} placeholder={uppercaseKey(newSetting.key)} className="w-8/12" /> }
                                    </div>
                                })}
                                {setting && <div className="flex justify-between mb-2">
                                        <select id="newSettingType" className="w-full" value={setting.type} onChange={(e) => handleChange(e, 'type')}>
                                            <option value="text">Text</option>
                                            <option value="number">Number</option>
                                            <option value="file">File</option>
                                            <option value="json">Json</option>
                                        </select>
                                        <input id="newSettingKey" type="text" value={setting.key} onChange={(e) => handleChange(e, 'key')} placeholder={t('key')} className="w-full" />
                                        <input id="newSettingValue" type={setting.type} value={setting.type !== "file" ? setting.value : undefined} onChange={(e) => handleChange(e, 'value')} placeholder={t('value')} className="w-full" />
                                    </div>}

                                <div className="flex flex-row justify-between pb-2 pt-1">
                                    <div className="flex gap-1 sm:hidden">
                                        {!setting &&
                                            <SecondaryButton className="flex" onClick={() => addAction()}>
                                                <FaPlusSquare />&nbsp;{t('add')}
                                            </SecondaryButton>
                                        }

                                        {setting && <>
                                            <DangerButton className="flex" onClick={() => deleteAction()}>
                                                <FaMinusSquare />&nbsp;{t('delete')}
                                            </DangerButton>
                                            <InfoButton className="flex" onClick={() => applyAction()}>
                                                <FaMinusSquare />&nbsp;{t('apply')}
                                            </InfoButton>
                                        </>}
                                    </div>
                                    {progress && (
                                        <progress value={progress.percentage} max="100">
                                            {progress.percentage}%
                                        </progress>
                                    )}
                                    {!setting && !progress && 
                                        <PrimaryButton className="flex">
                                            <FaPaperPlane />&nbsp;{t('save')}
                                        </PrimaryButton>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
