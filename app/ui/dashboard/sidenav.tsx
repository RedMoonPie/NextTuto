import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col rounded-xl bg-neutral-50 md:px-2">
      <Link
        className="mb-6 flex h-Sz20 flex-col items-center justify-center rounded-md bg-secondary-500 p-4 align-middle md:h-Sz20"
        href="/"
      >
        <div className="flex mb-2 h-32 w-32 items-center justify-center rounded-full relative bg-color-4-500 md:w-32">
          <Image
            src={
              'https://images.pexels.com/photos/5359802/pexels-photo-5359802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }
            fill
            style={{objectFit:"cover"}}
            alt="Dummy Image"
            className="p-3 aspect-square rounded-full object-cover"
          />
        </div>
        <p className='text-neutral-100'>Logo Title</p>
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
