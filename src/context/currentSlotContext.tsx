// Context to store the current time slot, updating every minute.

import React, {createContext, useContext, useEffect, useState} from 'react';
import {getSlotIndexOfDate} from '../utils/dateUtils';
import {ITEM_MINUTES} from '../values/appDefaults';

export interface CurrentSlotContextReturn {
  currentIndex: number;
  currentDayIndex?: number;
}

const CurrentSlotContext = createContext<CurrentSlotContextReturn>({
  currentIndex: getSlotIndexOfDate(new Date(), ITEM_MINUTES),
});

export function useCurrentSlot(): CurrentSlotContextReturn {
  return useContext(CurrentSlotContext);
}

export default function CurrentSlotProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(getCurrentIndex());

  function getCurrentIndex(): number {
    const now = new Date();
    return now.getHours() * 2 + (now.getMinutes() >= 30 ? 1 : 0);
    //For testing return a random index
    //return Math.floor(Math.random() * 20);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(getCurrentIndex());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CurrentSlotContext.Provider value={{currentIndex}}>
      {children}
    </CurrentSlotContext.Provider>
  );
}
