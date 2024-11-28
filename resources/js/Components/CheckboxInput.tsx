import { InputHTMLAttributes } from 'react';

export default function CheckboxInput({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input type="radio" {...props} className={'hidden peer ' +className}/>
    );
}
