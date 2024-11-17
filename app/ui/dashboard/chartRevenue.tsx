'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const revenueData = [
  { month: 'Enero', amount: 12000 },
  { month: 'Febrero', amount: 15000 },
  { month: 'Marzo', amount: 13000 },
  { month: 'Abril', amount: 17000 },
  { month: 'Mayo', amount: 20000 },
  { month: 'Junio', amount: 18000 },
  { month: 'Julio', amount: 22000 },
  { month: 'Agosto', amount: 21000 },
  { month: 'Septiembre', amount: 19000 },
  { month: 'Octubre', amount: 23000 },
  { month: 'Noviembre', amount: 25000 },
  { month: 'Diciemrbe', amount: 24000 },
];
type RevenueData = {
  month: string;
  amount: number;
};

interface RevenueChartProps {
  revenueData: RevenueData[];
}

export const RevenueChart: React.FC = () => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      background: '#FFFFFF', // Tailwind gray-100
      toolbar: { show: false },
    },
    colors: ['#ffa300'], // Tailwind blue-500 for bars
    xaxis: {
      categories: revenueData.map((data) => data.month),
      labels: {
        style: { colors: '#6B7280' }, // Tailwind gray-500 for x-axis labels
      },
      title: {
        text: 'Meses',
        style: { color: '#1f4761', fontSize: '14px' }, // Tailwind gray-900 for title text
      },
    },
    yaxis: {
      labels: {
        style: { colors: '#6B7280' }, // Tailwind gray-500 for y-axis labels
      },
      title: {
        text: 'Ganancias ($)',
        style: { color: '#1f4761', fontSize: '14px' }, // Tailwind gray-900 for y-axis title
      },
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    dataLabels: {
      style: { colors: ['#1f4761'] }, // Tailwind yellow-400 for data labels
    },
  };

  const series = [
    {
      name: 'Ganancia',
      data: revenueData.map((data) => data.amount),
    },
  ];

  return (
    <div className="h-full w-full rounded-xl border border-secondary-500 p-1">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={'100%'}
        width={'100%'}
      />
    </div>
  );
};
