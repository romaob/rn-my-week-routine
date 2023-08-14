import {useState} from 'react';

import strings from '../values/strings.json';

type Language = 'en' | 'es' | 'pt';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = strings;

const defaultLanguage: Language = 'en';

export interface useStringReturn {
  language: Language;
  getString: (key: string) => string;
  setLanguage: (language: Language) => void;
}

export default function useString(): useStringReturn {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const getString = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found`);
      return '';
    }
    return translations[key][language];
  };

  return {
    language,
    getString,
    setLanguage,
  };
}
