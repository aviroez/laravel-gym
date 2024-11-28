import { PaginationLink } from '@/types';
import { Link } from '@inertiajs/react';

type PaginationProp = {
    links: PaginationLink[],
    className: string
}
export default function Pagination({ links, className }: PaginationProp) {

    function getClassName(active: boolean) {
        if(active) {
            return "bg-blue-700 text-white";
        }
    }

    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8">
                    {links.map((link, key) => (
                        link.url === null ? (
                            <div key={key}
                                className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                                >
                                    {link.label}
                                </div>) : (
                                <Link key={key}
                                    className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:text-black hover:border-blue-700 focus:border-primary focus:text-primary ` + getClassName(link.active)}
                                    href={ link.url }
                                >
                                    {link.label}
                                </Link>
                            )
                        )
                    )}
                </div>
            </div>
        )
    );

}

