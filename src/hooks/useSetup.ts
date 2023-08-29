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
         /*
          const events = [];
          events.push(
            {
              id: 'A',
              name: 'Event - Long text description to test the layout',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Event 1 description',
              startAt: new Date(new Date().setHours(4, 0)).toISOString(),
              endAt: new Date(new Date().setHours(6, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 'B',
              name: 'Event - Long text description to test the layout',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Event 2 description',
              startAt: new Date(new Date().setHours(6, 0)).toISOString(),
              endAt: new Date(new Date().setHours(7, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 'C',
              name: 'Event - Long text description to test the layout',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Event 3 description',
              startAt: new Date(new Date().setHours(5, 0)).toISOString(),
              endAt: new Date(new Date().setHours(6, 30)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 'D',
              name: 'Event - Long text description to test the layout',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Event 4 description',
              startAt: new Date(new Date().setHours(6, 0)).toISOString(),
              endAt: new Date(new Date().setHours(7, 30)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 'E',
              name: 'Event - Long text description to test the layout',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Event 5 description',
              startAt: new Date(new Date().setHours(7, 30)).toISOString(),
              endAt: new Date(new Date().setHours(8, 30)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 'F',
              name: 'Event - Long text description to test the layout',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Event 6 description',
              startAt: new Date(new Date().setHours(7, 30)).toISOString(),
              endAt: new Date(new Date().setHours(8, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 'G',
              name: 'Event - Long text description to test the layout',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Event 7 description',
              startAt: new Date(new Date().setHours(8, 0)).toISOString(),
              endAt: new Date(new Date().setHours(8, 30)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
          );

          /*
          events.push(
            {
              id: 1,
              name: 'Work',
              indexes: [0, 1, 2, 3, 4],
              description: 'Working time',
              startAt: new Date(new Date().setHours(8)).toISOString(),
              endAt: new Date(new Date().setHours(16)).toISOString(),
              alertEnabled: false,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 2,
              name: 'Exercise 1',
              indexes: [0, 1, 2, 3, 4],
              description: 'Small break for exercises',
              startAt: new Date(new Date().setHours(8)).toISOString(),
              endAt: new Date(new Date().setHours(8, 30, 0, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 3,
              name: 'Exercise 2',
              indexes: [0, 1, 2, 3, 4],
              description: 'Small break for exercises',
              startAt: new Date(new Date().setHours(10)).toISOString(),
              endAt: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 4,
              name: 'Exercise 3',
              indexes: [0, 1, 2, 3, 4],
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
              id: 5,
              name: 'Exercise 4',
              indexes: [0, 1, 2, 3, 4],
              description: 'Small break for exercises',
              startAt: new Date(new Date().setHours(14)).toISOString(),
              endAt: new Date(new Date().setHours(14, 30, 0, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 5,
              name: 'Exercise 5',
              indexes: [0, 1, 2, 3, 4],
              description: 'Small break for exercises',
              startAt: new Date(new Date().setHours(16)).toISOString(),
              endAt: new Date(new Date().setHours(16, 30, 0, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 6,
              name: 'Bike Ride',
              indexes: [0, 1, 2, 3, 4, 5, 6],
              description: 'Testing > 2 events',
              startAt: new Date(new Date().setHours(16)).toISOString(),
              endAt: new Date(new Date().setHours(17, 0, 0, 0)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 7,
              name: 'Projects A',
              indexes: [0, 1, 2],
              description: 'Develop projects type A',
              startAt: new Date(new Date().setHours(19)).toISOString(),
              endAt: new Date(new Date().setHours(23)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 8,
              name: 'Projects B',
              indexes: [3],
              description: 'Develop projects type B',
              startAt: new Date(new Date().setHours(19)).toISOString(),
              endAt: new Date(new Date().setHours(23)).toISOString(),
              alertEnabled: true,
              alertSent: false,
              alertConfirmed: false,
              added: new Date().toISOString(),
              updated: new Date().toISOString(),
            },
            {
              id: 8,
              name: 'Projects C',
              indexes: [4],
              description: 'Develop projects type C',
              startAt: new Date(new Date().setHours(19)).toISOString(),
              endAt: new Date(new Date().setHours(23)).toISOString(),
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
          //await AsyncStorage.setItem(APP_KEYS.EVENTS, JSON.stringify(events));
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
