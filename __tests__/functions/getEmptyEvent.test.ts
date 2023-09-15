import {Event, getEmptyEvent} from '../../src/values/appDefaults';

const emptyEventTest: Event = {
  id: null,
  name: '',
  indexes: [],
  description: '',
  notificationIds: [],
  startAt: '',
  endAt: '',
  alertEnabled: false,
  alertSent: false,
  alertConfirmed: false,
  added: '',
  updated: '',
};

describe('getEmptyEvent object function test', () => {
  it('should return an valid empty event object', () => {
    expect(getEmptyEvent()).toEqual(emptyEventTest);
  });
});
