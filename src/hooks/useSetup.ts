//useSetup hook

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {APP_KEYS} from '../values/appDefaults';

import testData from '../values/dbTest.json';

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
          await AsyncStorage.setItem(
            APP_KEYS.EVENTS,
            JSON.stringify(testData.events),
          );
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
