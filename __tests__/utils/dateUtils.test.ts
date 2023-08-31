//Testing the dateUtils functions

import {getDateIncreasedByMinutes, getDayTimesForMinutes, getSlotIndexOfDate, getTimeFilteredByMinutes, getTimeStringFromDate, getWeekDays} from '../../src/utils/dateUtils';

import strings from '../../src/values/strings.json';

describe('getWeekDays function tests', () => {
  it('should return the week days in English', () => {
    expect(getWeekDays()).toEqual([
      strings.week_day_sun.en,
      strings.week_day_mon.en,
      strings.week_day_tue.en,
      strings.week_day_wed.en,
      strings.week_day_thu.en,
      strings.week_day_fri.en,
      strings.week_day_sat.en,
    ]);
  });
  it('should return the week days in Spanish', () => {
    expect(getWeekDays('es')).toEqual([
      strings.week_day_sun.es,
      strings.week_day_mon.es,
      strings.week_day_tue.es,
      strings.week_day_wed.es,
      strings.week_day_thu.es,
      strings.week_day_fri.es,
      strings.week_day_sat.es,
    ]);
  });
  it('should return the week days in Portuguese', () => {
    expect(getWeekDays('pt')).toEqual([
      strings.week_day_sun.pt,
      strings.week_day_mon.pt,
      strings.week_day_tue.pt,
      strings.week_day_wed.pt,
      strings.week_day_thu.pt,
      strings.week_day_fri.pt,
      strings.week_day_sat.pt,
    ]);
  });
});

describe('getTimeStringFromDate function tests', () => {
  it('should return the time in the format HH:MM', () => {
    let date = new Date();
    date = new Date(date.setHours(7, 0, 0, 0));
    expect(getTimeStringFromDate(date)).toBe('07:00 AM');
  });
});

describe('getDateIncreasedByMinutes function tests', () => {
  it('should return the date increased by 30 minutes', () => {
    let date = new Date();
    date = new Date(date.setHours(7, 0, 0, 0));
    const result = new Date(date.getTime() + 30 * 60000);
    expect(getDateIncreasedByMinutes(date, 30)).toEqual(result);
  });
});

describe('getDayTimesForMinutes function tests', () => {
  it('should return the day times for 30 minutes', () => {
    const result = [];
    const date = new Date(new Date().setHours(0, 0, 0, 0));
    for (let i = 0; i < (24 * 60) / 30; i++) {
      result.push(new Date(date.getTime() + i * 30 * 60000));
    }
    expect(getDayTimesForMinutes(30)).toEqual(result);
  });
});

describe('getSlotIndexOfDate function tests', () => {
  it('should return the slot index of the date', () => {
    const date = new Date(new Date().setHours(7, 0, 0, 0));
    expect(getSlotIndexOfDate(date, 30)).toBe(14);
  });
});

describe('getTimeFilteredByMinutes function tests', () => {
  it('should return the time filtered by 30 minutes getting bellow 30', () => {
    const date = new Date(new Date().setHours(7, 15, 0, 0));
    const result = new Date(new Date().setHours(7, 0, 0, 0));
    expect(getTimeFilteredByMinutes(date, 30)).toEqual(result);
  });
  it('should return the time filtered by 30 minutes getting above 30', () => {
    const date = new Date(new Date().setHours(7, 45, 0, 0));
    const result = new Date(new Date().setHours(7, 30, 0, 0));
    expect(getTimeFilteredByMinutes(date, 30)).toEqual(result);
  });
});
