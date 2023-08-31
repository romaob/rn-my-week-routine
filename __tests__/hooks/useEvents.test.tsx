import {renderHook, waitFor} from '@testing-library/react';
import useEvents from '../../src/hooks/useEvents';

import '../../__mocks__/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_KEYS, Event} from '../../src/values/appDefaults';

import dbTest from '../../src/values/dbTest.json';
import {act} from 'react-dom/test-utils';

const testEvents = dbTest.events as unknown as Event[];

describe('useEvents hook test', () => {
  it('should retrive empty array initially', async () => {
    const {result} = renderHook(() => useEvents());
    await waitFor(() => {
      expect(AsyncStorage.getItem).toBeCalledWith(APP_KEYS.EVENTS);
      expect(result.current.loading).toBe(true);
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.events).toEqual([]);
    });
  });

  it('should update the data with the provided array', async () => {
    const {result} = renderHook(() => useEvents());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.events).toEqual([]);
    });
    await act(async () => {
      await result.current.updateEventsData(testEvents);
    });
    await waitFor(() => {
      expect(result.current.events).toEqual(testEvents);
    });
  });

  it('should retrive the data previously set', async () => {
    const {result} = renderHook(() => useEvents());
    await waitFor(() => {
      expect(AsyncStorage.getItem).toBeCalledWith(APP_KEYS.EVENTS);
      expect(result.current.loading).toBe(true);
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.events).toEqual(testEvents);
    });
  });

  it('should retrieve the data again when calling the refresh function', async () => {
    const {result} = renderHook(() => useEvents());
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(AsyncStorage.getItem).toBeCalledWith(APP_KEYS.EVENTS);
    });
    act(() => {
      result.current.refresh();
    });
    await waitFor(() => {
      expect(AsyncStorage.getItem).toBeCalledWith(APP_KEYS.EVENTS);
      expect(result.current.loading).toBe(false);
    });
  });
});
