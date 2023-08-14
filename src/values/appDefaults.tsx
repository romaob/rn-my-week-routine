export enum APP_KEYS {
  LANGUAGE = '@myweekroutine.language',
  ALERTS_ENABLED = '@myweekroutine.alertsEnabled',
  ONBOARDING = '@myweekroutine.onboarding',
  EVENTS = '@myweekroutine.events',
}

export interface Event {
  id: string;
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
}
