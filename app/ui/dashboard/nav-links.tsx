'use client';

import {
  UserGroupIcon,
  HomeIcon,
  CurrencyDollarIcon,
  TruckIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Ventas',
    href: '/dashboard/invoices',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Productos',
    href: '/dashboard/invoices',
    icon: TagIcon,
  },
  {
    name: 'Clientes',
    href: '/dashboard/invoices',
    icon: UserGroupIcon,
  },
  {
    name: 'Proveedores',
    href: '/dashboard/invoices',
    icon: TruckIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'text-neutral-100 flex h-[48px] grow items-center justify-center gap-4 rounded-xl bg-color-4-500 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-6',
              {
                'bg-primary-500': pathname === link.href,
              },
            )}          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
