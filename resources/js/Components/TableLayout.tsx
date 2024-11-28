import { ReactNode, useEffect, useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import FilterList from './FilterList'
import useTranslations from '@/Hooks/jsTranslation';
import { FaSearch } from 'react-icons/fa';
import { router } from '@inertiajs/react'

type tableRowProps = {
    formUrl?: string,
    className?: string,
    viewFilter?: boolean,
    setViewFilter?: (value: boolean) => void,
    filters?: any[],
    filtersValue?: any[],
    children?: ReactNode
}

const TableLayout = ({
    formUrl,
    className = '',
    viewFilter = false,
    setViewFilter,
    filters = [],
    filtersValue = [],
    children
}: tableRowProps) => {
    const { t } = useTranslations();

    let search = '';
    let type = '';
    let unit = '';
    let status = '';
    let invoice_id = '';
    let user_id = '';
    let gender = '';
    if (filtersValue && !Array.isArray(filtersValue)) {
        search = filtersValue['search'];
        type = filtersValue['type'];
        unit = filtersValue['unit'];
        status = filtersValue['status'];
        invoice_id = filtersValue['invoice_id'];
        user_id = filtersValue['user_id'];
        gender = filtersValue['gender'];
    }

    const { data, setData, post, processing, errors, reset } = useForm<{
        [key: string]: string;
      }>({
        search: search,
        type: type,
        unit: unit,
        status: status,
        invoice_id: invoice_id,
        user_id: user_id,
        gender: gender,
    });

    let cols = 'grid-cols-1';
    const filterLength = Object.entries(filters).length;
    let searchColspan = 'md:col-span-1 lg:col-span-1';

    if (filterLength >= 12) {
        cols += ' md:grid-cols-6 lg:grid-cols-6';
        const mod = filterLength % 6;
        if (mod > 0) {
            searchColspan = `md:col-span-${7-mod} lg:col-span-${7-mod}`;
        }
    } else if (filterLength >= 6) {
        cols += ' md:grid-cols-3 lg:grid-cols-6';
        const mod = filterLength % 6;
        const mdMod = filterLength % 3;
        if (mod > 0 || mdMod > 0) {
            searchColspan = `md:col-span-${4-mdMod} lg:col-span-${7-mod}`;
        }
    } else if (filterLength >= 4) {
        cols += ' md:grid-cols-2 lg:grid-cols-4';
        const mod = filterLength % 4;
        const mdMod = filterLength % 2;
        if (mod > 0 || mdMod > 0) {
            searchColspan = `md:col-span-${3-mdMod} lg:col-span-${5-mod}`;
        }
    } else if (filterLength >= 3) {
        cols += ' md:grid-cols-1 lg:grid-cols-3';
    } else if (filterLength >= 2) {
        cols += ' md:grid-cols-1 lg:grid-cols-2';
    }

    useEffect(() => {
        // Check if any value in `data` is non-empty
        const hasNonEmptyValue = Object.values(data).some(value => value !== '' && value !== null && value !== undefined);
    
        // Set viewFilter to true if there are any non-empty values in data
        if (hasNonEmptyValue) {
            setViewFilter?.(true);
        }
    }, [data, setViewFilter]);

    const onChangeValue = (key: never, value: never) => {
        setData(key, value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (formUrl) {
            const serializeData = (data: { [key: string]: any }) => {
                const serializedFilters: { [key: string]: any } = {};
            
                // Loop over the data and serialize each field
                for (const [key, value] of Object.entries(data)) {
                    if (value instanceof Date) {
                        // If value is a Date object, convert it to an ISO string
                        serializedFilters[key] = value.toISOString();
                    } else if (value !== undefined && value !== null && value !== '') {
                        // Only include non-empty values
                        serializedFilters[key] = value;
                    }
                }
            
                return serializedFilters;
            };
            
            const filters = serializeData(data);
            
            // Use the serialized filters in Inertia request
            router.get(formUrl, { filters: filters }, { preserveScroll: true });
        }
    };
    return (
    <>
        {(filters && viewFilter) && (
        <form className={"w-full grid justify-evenly gap-2 mb-4 "+cols} onSubmit={handleSubmit}>
            {Object.entries(filters).map(([index, filterData]) => {
            if (Array.isArray(filterData) || typeof filterData === "object" ) {
                return <FilterList key={index} label={index} list={filterData} value={data[index]} setData={setData} className="w-full"/>
            } else {
                return (
                <div key={index} className={`flex w-full ${searchColspan}`}>
                    <label className="sr-only">{t('search')}</label>
                    <input type="text" name="search" id="search" value={data.search} onChange={(e: any) => setData('search', e.target.value)} className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-l-lg text-sm focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none " placeholder={t('search_for_items')} />
                    <button type="submit" onSubmit={handleSubmit} className="border bg-indigo-500 w-16 text-center rounded-r-lg">
                    <FaSearch className="mx-auto text-md text-center text-indigo-100" />
                    </button>
                </div>);
            }
            })}
        </form>
        )}

        <table className={`table-auto border-collapse w-full text-gray-500 ${className ?? ''}`}>
        {children}
        </table>
    </>
    )
}

export default TableLayout;