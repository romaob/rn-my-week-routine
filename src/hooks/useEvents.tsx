import {useCallback, useEffect, useState} from 'react';
import {APP_KEYS, Event} from '../values/appDefaults';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface useEventsReturn {
  loading: boolean;
  error: Error | null;
  events: Event[];
  updateEventsData: (data: Event[]) => Promise<void>;
  refresh: () => void;
}

export default function useEvents(): useEventsReturn {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [events, setEvents] = useState<Event[] | null>(null);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await AsyncStorage.getItem(APP_KEYS.EVENTS);
      setEvents(res ? JSON.parse(res) : []);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEventsData = async (data: Event[]) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        setLoading(true);
        await AsyncStorage.setItem(APP_KEYS.EVENTS, JSON.stringify(data));
        setEvents(data);
        resolve();
      } catch (error: any) {
        setError(error);
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    loading,
    error,
    events,
    updateEventsData,
    refresh: getData,
  };
}
