import { HTMLAttributes, useState } from 'react';

export default function Alert({
    className = '',
    children,
    about,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const [isVisible, setIsVisible] = useState(true);

    const closeAlert = () => {
        setIsVisible(false)
    }

    let colors = 'text-white bg-cyan-500 '

    switch (about) {
        case 'info': colors = 'text-white bg-blue-500'; break;
        case 'success': colors = 'text-white bg-green-500'; break;
        case 'warning': colors = 'text-white bg-yellow-500'; break;
        case 'danger': colors = 'text-white bg-red-500'; break;
    }
    return (
        isVisible === true ? 
        <div className="absolute right-0">
            <div
                className={
                    `relative rounded-md border px-4 py-2 mx-8 mt-4 min-h-16 text-md font-semibold tracking-widest ${colors} ${className}` 
                }
                {...props}
            >
                <button onClick={(e) => closeAlert()} className="absolute top-2 right-2 bg-slate-400/50 hover:bg-slate-700/80 px-2 py-1 text-sm">x</button>
                <p>{children}</p>
            </div>
        </div> :
        <></>
);
}
