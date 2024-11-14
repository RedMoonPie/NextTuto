'use client';
import { useState } from 'react';
import { getSurroundingDays } from './utils/calendarStripeCard';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6';
import { useQuote } from './hooks/useQuote';

export const QuoteOfTheDay = () => {
  const quote = useQuote();

  return (
    <div className=" relative flex h-full w-full flex-col justify-center rounded-xl border border-primary-500 px-5 pt-2">
      <div className="pb-5 text-neutral-400">Frase del día</div>
      <div className="flex h-full">
        <div className="">
          <FaQuoteLeft size={25} className="text-color-4-500" />
        </div>
        <div className="mx-6 text-justify italic">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta aut
          laudantium facere non at! Sed ipsam temporibus beatae, doloremque rem
          impedit deleniti molestiae, dolore at porro nostrum, placeat adipisci
          saepe!
        </div>
        <div className="mb-4 self-end">
          <FaQuoteRight size={25} className="text-color-4-500" />
        </div>
      </div>
    </div>
  );
};
