import { HTMLAttributes } from 'react';

interface CheckboxOptionProps extends HTMLAttributes<HTMLLabelElement> {
    title: string;
    about: string;
    htmlFor?: string; // Explicitly add htmlFor to the props
}

export default function CheckboxOption({
    className = '',
    title,
    about,
    htmlFor,
    ...props
}: CheckboxOptionProps) {
    return (
        <label {...props} className={'inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-500 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 hover:border-gray-400 '+className}>
            <div className="block">
                <div className="w-full text-lg font-semibold">{title}</div>
                <div className="w-full">{about}</div>
            </div>
        </label>
    );
}
