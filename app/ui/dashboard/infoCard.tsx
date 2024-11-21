import {
  PiCoinsDuotone,
  PiUsersThreeDuotone,
  PiTelegramLogoDuotone,
} from 'react-icons/pi';

export type InfoCardProps = {
  cardType: 'totalSales' | 'totalOrders' | 'totalExpenses';
  label: string;
  value: string;
};

const cardColors = {
  totalSales: {
    border: 'border-color-5-500',
    bgColor: 'bg-color-5-500',
    icon: <PiCoinsDuotone className="h-full w-full text-color-3-200" />,
  },
  totalExpenses: {
    border: 'border-secondary-500',
    bgColor: 'bg-secondary-500',
    icon: <PiTelegramLogoDuotone className="h-full w-full text-color-3-200" />,
  },
  totalOrders: {
    border: 'border-primary-500',
    bgColor: 'bg-primary-500',
    icon: <PiUsersThreeDuotone className="h-full w-full text-color-3-200" />,
  },
};

export function InfoCard({ cardType, label, value }: InfoCardProps) {
  const {border,bgColor,icon} = cardColors[cardType]
  return (
    <div
      className={`flex h-full w-full items-center rounded-xl border shadow-sm ${border} shadow-m`}
    >
      <div className={`h-full w-[3%] ${bgColor} rounded-l-xl`}></div>
      <div className="flex w-full items-center justify-evenly">
        <div
          className={`h-24 w-24 ${bgColor} rounded-xl border-color-3-200 p-5`}
        >
          {icon}
        </div>
        <div className="flex flex-col">
          <div className="text-4xl text-neutral-700">{value}</div>
          <div className=" text-lg text-neutral-500">{label}</div>
        </div>
      </div>
    </div>
  );
}
