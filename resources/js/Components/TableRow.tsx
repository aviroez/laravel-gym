import { HTMLAttributes, ReactNode } from 'react';

interface TableRowProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    className?: string;
    children?: ReactNode;
    about?: string; // Add this for custom behavior (e.g., header or normal row)
}

export default function TableRow({
    className = '',
    children,
    about,
    ...props
}: TableRowProps) {
  return (
    <>
        {props && about === "header" ? 
            <th scope="col" className={'p-2 ' + className} {...props}>
                {children}
            </th> : 
            <td className={'p-2 ' + className} {...props}>
                {children}
            </td>
        }
    </>
  )
}
