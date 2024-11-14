import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import { fetchRevenue } from '@/app/lib/data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChartsss() {
  const chartHeight = 350;
  // NOTE: comment in this code when you get to this point in the course
  const revenue = await fetchRevenue(); // Fetch data inside the component

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="text-gray-400 mt-4">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-neutral-50 p-4">
        <div
          className="sm:grid-cols-13 relative mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4"
          style={{ height: `${chartHeight}px` }}
        >
          {/* Líneas horizontales de guía alineadas al centro de cada label */}
          {yAxisLabels.map((label, index) => (
            <div
              key={label}
              className="border-gray-200 absolute left-0 w-full border-t"
              style={{
                top: `calc(${(index / (yAxisLabels.length - 1)) * 100}% + 0.5em)`,
              }}
            ></div>
          ))}

          {/* Eje Y con etiquetas */}
          <div
            className="text-gray-400 mb-6 hidden flex-col justify-between text-sm sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {/* Contenedor de las barras de ingresos */}
          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-primary-500"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="text-gray-400 -rotate-90 text-sm sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="text-gray-500 h-5 w-5" />
          <h3 className="text-gray-500 ml-2 text-sm ">Últimos 12 meses</h3>
        </div>
      </div>
    </div>
  );
}
