import React from 'react';
import {createContext, useContext, useState} from 'react';

import strings from '../values/strings.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_KEYS} from '../values/appDefaults';

type Language = 'en' | 'es' | 'pt';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = strings;

export const defaultLanguage: Language = 'en';

export interface useStringReturn {
  language: Language;
  getString: (key: string) => string;
  setLanguage: (language: Language) => void;
}

const StringContext = createContext<useStringReturn>({
  language: defaultLanguage,
  getString: (key: string) => '',
  setLanguage: (language: Language) => {},
});

export function useString(): useStringReturn {
  return useContext(StringContext);
}

export default function StringsProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  async function loadLanguage() {
    try {
      const language = await AsyncStorage.getItem(APP_KEYS.LANGUAGE);
      if (language) {
        setLanguage(language as Language);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async function saveLanguage(language: Language) {
    try {
      await AsyncStorage.setItem(APP_KEYS.LANGUAGE, language);
      setLanguage(language);
    } catch (error) {
      console.warn(error);
    }
  }

  function getString(key: string): string {
    if (!translations[key]) {
      return '';
    }
    return translations[key][language];
  }

  loadLanguage();

  return (
    <StringContext.Provider
      value={{language, getString, setLanguage: saveLanguage}}>
      {children}
    </StringContext.Provider>
  );
}
