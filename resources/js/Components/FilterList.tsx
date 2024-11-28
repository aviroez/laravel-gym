import useTranslations from '@/Hooks/jsTranslation';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface FilterListProps {
    list: Record<string, string>,
    label?: string,
    className?: string,
    value?: string,
    setData: (label: string, value: string) => void
}

const FilterList = ({list, label = '', className = '', value = '', setData}: FilterListProps) => {
    const { t } = useTranslations();

    const [filteredDatas, setFilteredDatas] = useState<[string, string][]>([]);
    const [selectedData, setSelectedData] = useState(value || '');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setData(label, inputValue);
        setSelectedData(inputValue);

        const filtered = Object.entries(list).filter(
            ([key, val]) => val.toLowerCase().includes(inputValue.toLowerCase())
        )
        setFilteredDatas(filtered);
    };

    const handleOnCLick = () => {
        const filtered = Object.entries(list);
        setFilteredDatas(filtered);
    };

    const handleDataSelect = (key: string, val: string) => {
        setData(label, key);
        setSelectedData(val); // Store the selected data
        setFilteredDatas([]); // Clear suggestions
    };

    const resetData = () => {
        setData(label, '');
        setSelectedData(''); // Store the selected data
        setFilteredDatas([]); // Clear suggestions
    }

    const handleBlur = () => {
        // Optionally clear suggestions when input loses focus
        setTimeout(() => {
            setFilteredDatas([]);
        }, 1000);
    };

    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                value={selectedData ?? ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onClick={handleOnCLick}
                placeholder={t('select') + ' ' + t(label.replace('/_id(?!.*_id)/', ''))} // replace last _id
                className="w-full h-full p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 rounded-md" 
            />
            {selectedData.length > 0 && <button type="button" onClick={() => {resetData()}} className="absolute rounded-full text-slate-600 right-2 top-2.5"><FaTimes /></button>}
            
            {filteredDatas.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-60 overflow-y-auto">
                    {Object.entries(list).map(([key, value]) => (
                        <li
                            key={key}
                            onClick={() => handleDataSelect(key, value)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            {value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilterList;
