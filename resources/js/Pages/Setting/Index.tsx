import { Head } from '@inertiajs/react';
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

    const [form, setForm] = useState<'edit_setting'|'add_setting'|null>(null)
    const [setting, setSetting] = useState<Setting | null>(null);
    const [newSettings, setNewSettings] = useState<Setting[]>(settings);

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

    const setSettingValue = (e: any, setting: Setting) => {
        
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

            {!form && (
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className=" bg-white shadow-sm sm:rounded-lg">
                        <div className="px-4 pt-4 py-2 text-gray-900 flex justify-between gap-4">
                            <h5 className="flex col-start-1 text-2xl">{t('settings')}</h5>

                        </div>
                        <div className="px-4">
                            <form className="flex flex-col">
                                {/* {settings && settings.map((setting) => {
                                    return <div key={setting.key} className="flex justify-between mb-2">
                                        <label htmlFor={setting.key} className="font-medium">{uppercaseKey(setting.key)}</label>
                                        <input id={setting.key} type={setting.type} value={setting.value} onChange={(e) => setSettingValue(e, setting)} placeholder={uppercaseKey(setting.key)} className="w-8/12" />
                                    </div>
                                })} */}
                                {newSettings && newSettings.map((newSetting) => {
                                    return <div key={newSetting.key} className="flex justify-between mb-2">
                                        <label htmlFor={newSetting.key} className="font-medium">{uppercaseKey(newSetting.key)}</label>
                                        <input id={newSetting.key} type={newSetting.type} value={newSetting.type !== "file" ? newSetting.value : undefined} onChange={(e) => setNewSettingValue(e, newSetting)} placeholder={uppercaseKey(newSetting.key)} className="w-8/12" />
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
                                    <div className="flex gap-1">
                                        {!setting && <SecondaryButton className="flex" onClick={() => addAction()}>
                                            <FaPlusSquare />&nbsp;{t('add')}
                                        </SecondaryButton>}

                                        {setting && <>
                                        <DangerButton className="flex" onClick={() => deleteAction()}>
                                            <FaMinusSquare />&nbsp;{t('delete')}
                                        </DangerButton>
                                        <InfoButton className="flex" onClick={() => applyAction()}>
                                            <FaMinusSquare />&nbsp;{t('apply')}
                                        </InfoButton>
                                        </>}
                                    </div>
                                    {!setting && <PrimaryButton className="flex" onClick={(e) => submitAction(e)}>
                                            <FaPaperPlane />&nbsp;{t('save')}
                                        </PrimaryButton>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            )}
        </AuthenticatedLayout>
    );
}
