'use client';

export type InfoCardProps = {
  cardType: 'totalSales' | 'totalOrders' | 'totalExpenses';
  label: string;
  value: string;
};

export function MostSelled() {
  return (
    <div
      className={`flex h-full w-full flex-col items-center rounded-xl border border-color-5-500 bg-color-5-500 font-bold text-white shadow-m`}
    >
      <div className="my-1 ">5 más vendidos</div>
      <div
        className={`z-10 flex h-full w-full items-center rounded-xl border border-color-5-500 bg-white`}
      ></div>
    </div>
  );
}
