import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Image from 'next/image';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col rounded-xl bg-neutral-50 md:px-2">
      <Link
        className="mb-6 flex h-Sz20 flex-col items-center justify-center rounded-md bg-secondary-500 p-4 align-middle md:h-Sz20"
        href="/"
      >
        <div className="relative mb-2 flex h-32 w-32 items-center justify-center rounded-full bg-color-4-500 md:w-32">
          <Image
            src={
              'https://images.pexels.com/photos/5359802/pexels-photo-5359802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }
            layout="fill"
            objectFit="fill"
            alt="Dummy Image"
            className="aspect-square rounded-full object-cover p-3"
          />
        </div>
        <p className="text-neutral-100">Logo Title</p>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="bg-gray-50 hidden h-auto w-full grow rounded-md md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="bg-gray-50 hover:bg-sky-100 hover:text-blue-600 flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
