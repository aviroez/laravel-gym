import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-md font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-blue-400 text-blue-200 focus:border-blue-100'
                    : 'border-transparent text-blue-100 hover:border-blue-200 hover:text-blue-200 focus:border-blue-300 focus:text-blue-300') +
                className
            }
        >
            {children}
        </Link>
    );
}
