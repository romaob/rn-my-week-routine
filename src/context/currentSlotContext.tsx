// Context to store the current time slot, updating every minute.

import React, {createContext, useContext, useEffect, useState} from 'react';
import {getSlotIndexOfDate} from '../utils/dateUtils';
import {Event, ITEM_MINUTES} from '../values/appDefaults';
import useEvents from '../hooks/useEvents';
import {NotifyEvent} from '../notifications/NotificationCenter';
import {useString} from './useStringContext';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import {NativeModules, Platform} from 'react-native';

const group = 'group.myweekroutine';

const SharedStorage = NativeModules.SharedStorage;
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

  async function saveWidgetSharedData() {
    if (Platform.OS === 'ios') {
      try {
        // iOS
        await SharedGroupPreferences.setItem(
          'myweekroutine_widget',
          {text: 'Current key: ' + currentIndex},
          group,
        );
      } catch (error) {
        console.log({error});
      }
    } else if (Platform.OS === 'android') {
      // Android
      SharedStorage.set(JSON.stringify({text: 'Current key: ' + currentIndex}));
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const nowIndex = getCurrentIndex();
      setCurrentIndex(nowIndex);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    refresh();
    saveWidgetSharedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <CurrentSlotContext.Provider value={{currentIndex}}>
      {children}
    </CurrentSlotContext.Provider>
  );
}
