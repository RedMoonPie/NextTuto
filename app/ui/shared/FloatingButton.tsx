'use client';

import Link from 'next/link';
import { Button } from '../button';

export type FloatingButtonPros = {
  icon: React.ReactElement;
  href: string;
};

export const FloatingButton = ({
  icon,
  href
}: FloatingButtonPros) => {
  return (
    <Link
      href={href}
      className="fixed bottom-4 right-4 h-16 w-16 rounded-2xl bg-secondary-500 p-4 text-white hover:bg-secondary-450"
    >
      {icon}
    </Link>
  );
};
