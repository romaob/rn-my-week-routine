//Testing the TimeLabel function checkIsActive

import {checkIsActive} from '../../src/components/TimeLabels';

const nowDate = new Date('2023-01-01T07:00:00.000Z');

describe('checkIsActive function tests', () => {
  it('should return true when providing a date that is exaclty the same', () => {
    const active = checkIsActive(new Date('2023-01-01T07:00:00.000Z'), nowDate);
    expect(active).toBe(true);
  });

  it('should return true when providing a date that is within the range', () => {
    const active = checkIsActive(new Date('2023-01-01T07:29:00.000Z'), nowDate);
    expect(active).toBe(true);
  });

  it('should return false when providing a date that is bellow the current range', () => {
    const active = checkIsActive(new Date('2023-01-01T06:59:00.000Z'), nowDate);
    expect(active).toBe(false);
  });

  it('should return false when providing a date that is above the current range', () => {
    const active = checkIsActive(new Date('2023-01-01T07:30:00.000Z'), nowDate);
    expect(active).toBe(false);
  });
});
