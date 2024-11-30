import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

const useTranslations = () => {
    const { props } = usePage<PageProps>();
    const translations = props.translations || [];
    const locale = props.locale || 'en';

    const t = (key: any) => translations[key] || key;

    return { t, locale };
};

export default useTranslations;
