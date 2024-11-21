'use client';

import { useFormState } from 'react-dom';
import { useSession } from "next-auth/react"
import Link from 'next/link';
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice } from '@/app/lib/actions';

export default function Form({ suppliers }: { suppliers: any[] }) {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(createInvoice, initialState);

  return (
    <form action={dispatch}>
      <div className="flex h-full w-full rounded-md bg-neutral-50 p-8">
        <div className="flow-root w-full rounded-3xl bg-white px-10 pt-20">
          <div className="mb-7 flex items-center justify-between px-3">
            <div className="text-2xl font-semibold text-secondary-500">
              Crear Producto
            </div>
          </div>

          <div className="bg-gray-50 rounded-md p-4 md:p-6">
            {/* product name */}
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Nombre producto
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ingresa el Nombre del producto"
                    className="border-gray-200 placeholder:text-gray-500 peer block w-full rounded-md border py-2 pl-10 text-sm outline-2"
                    aria-describedby="price-error"
                  />
                  <CurrencyDollarIcon className="text-gray-500 peer-focus:text-gray-900 pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                </div>
              </div>
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.amount &&
                  state.errors.amount.map((error: string) => (
                    <p className="text-red-500 mt-2 text-sm" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {/* description */}
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Description
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Ingresa la descripción del producto"
                    className="border-gray-200 placeholder:text-gray-500 peer block w-full rounded-md border py-2 text-sm outline-2"
                    aria-describedby="description-error"
                  />
                </div>
              </div>
              <div id="description-error" aria-live="polite" aria-atomic="true">
                {state.errors?.amount &&
                  state.errors.amount.map((error: string) => (
                    <p className="text-red-500 mt-2 text-sm" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {/* supplier Name */}
            <div className="mb-4">
              <label
                htmlFor="supplier_id"
                className="mb-2 block text-sm font-medium"
              >
                Proveedor
              </label>
              <div className="relative">
                <select
                  id="supplier_id"
                  name="supplier_id"
                  className="border-gray-200 placeholder:text-gray-500 peer block w-full cursor-pointer rounded-md border py-2 pl-10 text-sm outline-2"
                  defaultValue=""
                  aria-describedby="supplier-error"
                >
                  <option value="" disabled>
                    Selecciona un Proveedor
                  </option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.name} value={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
                <UserCircleIcon className="text-gray-500 pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
              </div>
              <div id="supplier-error" aria-live="polite" aria-atomic="true">
                {state.errors?.customerId &&
                  state.errors.customerId.map((error: string) => (
                    <p className="text-red-500 mt-2 text-sm" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {/* Base Amount */}
            <div className="mb-4">
              <label htmlFor="price" className="mb-2 block text-sm font-medium">
                Precio base
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Ingresa el precio base"
                    className="border-gray-200 placeholder:text-gray-500 peer block w-full rounded-md border py-2 pl-10 text-sm outline-2"
                    aria-describedby="price-error"
                  />
                  <CurrencyDollarIcon className="text-gray-500 peer-focus:text-gray-900 pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                </div>
              </div>
              <div id="price-error" aria-live="polite" aria-atomic="true">
                {state.errors?.amount &&
                  state.errors.amount.map((error: string) => (
                    <p className="text-red-500 mt-2 text-sm" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {/* final Amount */}
            <div className="mb-4">
              <label
                htmlFor="final_price"
                className="mb-2 block text-sm font-medium"
              >
                Precio Final
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="final_price"
                    name="final_price"
                    type="number"
                    step="0.01"
                    placeholder="Ingresa el precio final"
                    className="border-gray-200 placeholder:text-gray-500 peer block w-full rounded-md border py-2 pl-10 text-sm outline-2"
                    aria-describedby="final_price-error"
                  />
                  <CurrencyDollarIcon className="text-gray-500 peer-focus:text-gray-900 pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                </div>
              </div>
              <div id="final_price-error" aria-live="polite" aria-atomic="true">
                {state.errors?.amount &&
                  state.errors.amount.map((error: string) => (
                    <p className="text-red-500 mt-2 text-sm" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Link
                href="/dashboard/products"
                className="bg-neutral-100 text-gray-600 hover:bg-gray-200 flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors"
              >
                Cancel
              </Link>
              <Button className="bg-primary-400" type="submit">
                Create Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
