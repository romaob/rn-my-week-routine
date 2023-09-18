// Context to store the current time slot, updating every minute.

import React, {createContext, useContext, useEffect, useState} from 'react';
import {getSlotIndexOfDate} from '../utils/dateUtils';
import {Event, ITEM_MINUTES} from '../values/appDefaults';
import useEvents from '../hooks/useEvents';
import {NotifyEvent} from '../notifications/NotificationCenter';
import {useString} from './useStringContext';

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
  const {events, refresh} = useEvents();
  const {getString} = useString();

  function getCurrentIndex(): number {
    const now = new Date();
    return now.getHours() * 2 + (now.getMinutes() >= 30 ? 1 : 0);
    //For testing return a random index
    //return Math.floor(Math.random() * 20);
  }

  function checkNotifications(currentIndex: number) {

    events?.forEach((event: Event) => {
      const eventStartIndex = getSlotIndexOfDate(
        new Date(event.startAt),
        ITEM_MINUTES,
      );
      const hasToday = event.indexes.includes(new Date().getDay());
      if (event.alertEnabled && hasToday && eventStartIndex === currentIndex) {
        const title = getString('notification_title');
        const body = getString('notification_body') + ': ' + event.name;
        //NotifyEvent(title, body);
      }
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const nowIndex = getCurrentIndex();
      setCurrentIndex(nowIndex);
    }, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    if (events && events.length > 0) {
      checkNotifications(currentIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  return (
    <CurrentSlotContext.Provider value={{currentIndex}}>
      {children}
    </CurrentSlotContext.Provider>
  );
}
