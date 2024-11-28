import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

type Setting = {
    key: string;
    value: string;
};

const getSettings = (): Setting[] => {
    const { props } = usePage<PageProps>();
    return props.settings || [];
};

const getSetting = (key: string) => {
    const settings = getSettings();

    
    for (let i = 0; i < settings.length; i++) {
        const setting = settings[i];
        if (setting.key == key) {
            return setting;
        }
    }

    return null;
};

const getSettingValue = (key: string) => {
    const setting = getSetting(key);

    return setting && setting['value'] ? setting['value'] : '';
};

export {getSettings, getSetting, getSettingValue};
