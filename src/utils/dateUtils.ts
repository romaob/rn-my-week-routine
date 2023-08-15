import strings from '../values/strings.json';

export const WEEK_DAYS = [
  'week_day_mon',
  'week_day_tue',
  'week_day_wed',
  'week_day_thu',
  'week_day_fri',
  'week_day_sat',
  'week_day_sun',
];

export function getWeekDays(language: string = 'en'): string[] {
  return WEEK_DAYS.map(day => strings[day][language]);
}
