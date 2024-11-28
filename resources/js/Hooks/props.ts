import { usePage } from '@inertiajs/react';

const getValue = (key: any) => {
    const { props } = usePage();
    const prop = props[key] || [];

    return prop;
};

export {getValue};
