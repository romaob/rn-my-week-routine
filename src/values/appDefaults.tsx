export enum APP_KEYS {
  LANGUAGE = '@myweekroutine.language',
  ALERTS_ENABLED = '@myweekroutine.alertsEnabled',
  ONBOARDING = '@myweekroutine.onboarding',
  EVENTS = '@myweekroutine.events',
}

export type LanguageSring = {
  [key: string]: {
    en: string;
    pt: string;
    es: string;
  };
};

export const ITEM_MINUTES = 30;

export interface Event {
  id: string | null;
  name: string;
  indexes: number[];
  description: string;
  startAt: string;
  endAt: string;
  alertEnabled: boolean;
  alertSent: boolean;
  alertConfirmed: boolean;
  added: string;
  updated: string;
  notificationIds?: string[];
}

export function getEmptyEvent(): Event {
  return {
    id: null,
    name: '',
    indexes: [],
    description: '',
    startAt: '',
    endAt: '',
    alertEnabled: false,
    alertSent: false,
    alertConfirmed: false,
    added: '',
    updated: '',
    notificationIds: [],
  };
}
