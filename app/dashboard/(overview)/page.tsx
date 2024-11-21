import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import CardWrapper from '@/app/ui/dashboard/cards';

import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { CalendarStripe } from '@/app/ui/dashboard/calendarStripeCard';
import { QuoteOfTheDay } from '@/app/ui/dashboard/quoteOfTheDay';
import { InfoCard } from '@/app/ui/dashboard/infoCard';
import { RevenueChart } from '@/app/ui/dashboard/chartRevenue';
import { MostSelled } from '@/app/ui/dashboard/mostSelled';
export const metadata: Metadata = {
  title: 'Home',
};
export default async function Page() {
  return (
    <>
      {/* actual grid */}
      <div
        className="grid h-full w-full gap-3"
        style={{
          gridTemplateColumns: '27% 33% 37%', // Columns in percentages
          gridTemplateRows: '3rem 12rem 12rem 12rem 13rem', // Rows in percentages
          gridTemplateAreas: `
      "head1    head2  head2"
      "side1    secondary  secondary"
      "side2 area9     area9"
      "side3 area9     area9"
      "footer1 footer2 footer3"
    `,
        }}
      >
        {/* Title area */}
        <div
          className="col-span-2 col-start-2 row-start-1"
          style={{ gridArea: 'head1' }}
        >
          <h4 className="flex h-full items-end justify-start text-lg font-extrabold text-secondary-500">
            Resumen de ventas
          </h4>
        </div>
        {/* dates */}
        <div
          className="relative col-span-2 col-start-2 row-start-1"
          style={{ gridArea: 'head2' }}
        >
          <CalendarStripe />
        </div>

        {/* Secondary area */}
        <div
          className="col-span-2 col-start-2 row-start-2"
          style={{ gridArea: 'secondary' }}
        >
          <QuoteOfTheDay />
        </div>

        {/* Side1 */}
        <div className="row-start-1" style={{ gridArea: 'side1' }}>
          <InfoCard
            cardType="totalSales"
            value="$110.000"
            label="Total del día"
          />
        </div>

        {/* Side2 */}
        <div className="col-start-1 row-start-2" style={{ gridArea: 'side2' }}>
          <InfoCard
            cardType="totalExpenses"
            value="$30.000"
            label="Egresos del día"
          />
        </div>

        {/* Side3 */}
        <div className="row-start-3" style={{ gridArea: 'side3' }}>
          <InfoCard cardType="totalOrders" value="54" label="Ordenes del día" />
        </div>

        {/* Footer areas */}
        <div
          className="col-start-1 row-start-4 bg-color-5-900"
          style={{ gridArea: 'footer1' }}
        >
          8
        </div>
        <div
          className="col-span-2 col-start-2 row-span-2 row-start-3"
          style={{ gridArea: 'area9' }}
        >
          <RevenueChart />
        </div>
        <div
          className="row-start-5 bg-secondary-400"
          style={{ gridArea: 'footer1' }}
        >
          10
        </div>
        <div
          className="row-start-5"
          style={{ gridArea: 'footer2' }}
        >
          <MostSelled />
        </div>
        <div
          className="row-start-5 bg-neutral-600"
          style={{ gridArea: 'footer3' }}
        >
          12
        </div>
      </div>
    </>
  );
}
