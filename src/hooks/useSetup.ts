//useSetup hook

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {APP_KEYS} from '../values/appDefaults';

import testData from '../values/dbTest.json';
import {
  getDateIncreasedByMinutes,
  getTimeStringFromDate,
} from '../utils/dateUtils';

export interface useSetupReturn {
  loading: boolean;
}

export default function useSetup(): useSetupReturn {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkStorage() {
      try {
        setLoading(true);

        await AsyncStorage.clear();

        const onboarding = await AsyncStorage.getItem(APP_KEYS.ONBOARDING);
        if (!onboarding) {
          //Setup a default database
          await AsyncStorage.setItem(APP_KEYS.LANGUAGE, 'en');
          await AsyncStorage.setItem(APP_KEYS.ALERTS_ENABLED, 'true');
          await AsyncStorage.setItem(APP_KEYS.ONBOARDING, 'true');
          //await AsyncStorage.setItem(APP_KEYS.EVENTS, JSON.stringify([]));
          //Seting fake data
          /*

            "id": 5,
            "name": "Event 5",
            "indexes": [0,1,2,3,4,5,6],
            "description": "Event 5 description",
            "startAt": "04:00:00",
            "endAt": "05:00:00",
            "alertEnabled": true,
            "alertSent": false,
            "alertConfirmed": false,
            "added": "2015-01-01T00:00:00.000Z",
            "updated": "2015-01-01T00:00:00.000Z"

          */
          const events = [];
          events.push(
            {
              id: 1,
              name: 'Work',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Working time',
              startAt: new Date(new Date().setHours(8)).toISOString(),
              endAt: new Date(new Date().setHours(16)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 2,
              name: 'Exercise Break',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Small break for exercises',
              startAt: new Date(new Date().setHours(12)).toISOString(),
              endAt: new Date(new Date().setHours(12, 30, 0, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 3,
              name: 'Test Break',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Testing > 2 events',
              startAt: new Date(new Date().setHours(13)).toISOString(),
              endAt: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 3,
              name: 'Test Break 2',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Testing > 2 events',
              startAt: new Date(
                new Date().setHours(12, 30, 0, 0),
              ).toISOString(),
              endAt: new Date(new Date().setHours(16, 30, 0, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 5,
              name: 'Projects',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Projects time',
              startAt: new Date(
                new Date().setHours(16, 30, 0, 0),
              ).toISOString(),
              endAt: new Date(new Date().setHours(21, 30, 0, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 8,
              name: 'Sleep',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Sleeping time',
              startAt: new Date(new Date().setHours(22)).toISOString(),
              endAt: new Date(new Date().setHours(6)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
          );
          /*
          const date = new Date().setHours(0, 0, 0, 0);
          for (let i = 0; i < 48; i++) {
            events.push({
              id: i + 1,
              name: `Event ${i + 1}`,
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: `Description ${i + 1}`,
              startAt: new Date(
                new Date().setHours(
                  Math.floor(i / 2),
                  i % 2 === 0 ? 0 : 30,
                  0,
                  0,
                ),
              ).toISOString(),
              endAt: new Date(
                new Date().setHours(
                  Math.floor(i / 2) + 1,
                  i % 2 === 0 ? 0 : 30,
                  0,
                  0,
                ),
              ).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date(date).toISOString(),
              updated: new Date(date).toISOString(),
            });
          }
          */
          await AsyncStorage.setItem(APP_KEYS.EVENTS, JSON.stringify(events));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    checkStorage();
  }, []);

  return {loading};
}
