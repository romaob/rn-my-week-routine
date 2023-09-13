import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import EventListItem from '../../src/components/EventListItem';
import {Event} from '../../src/values/appDefaults';
import {getTimeStringFromDate, getWeekDays} from '../../src/utils/dateUtils';
import {colors} from '../../src/values/colors';

import strings from '../../src/values/strings.json';
import StringsProvider from '../../src/context/useStringContext';

const testEvent: Event = {
  id: '1234',
  name: 'Test Name',
  description: 'Test Description',
  startAt: '2023-09-13T12:00:00.000',
  endAt: '2023-09-13T12:30:00.000',
  indexes: [2, 3, 4],
  alertEnabled: false,
  alertSent: false,
  alertConfirmed: false,
  added: new Date().toISOString(),
  updated: new Date().toISOString(),
};

describe('EventListItem render tests', () => {
  it('should render a Event item correctly', () => {
    const result = render(
      <StringsProvider>
        <EventListItem item={testEvent} />
      </StringsProvider>,
    );
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('eventListItem')).toBeDefined();
    //Testing event name
    expect(result.getByTestId('eventListItemName')).toBeDefined();
    expect(result.getByText(testEvent.name)).toBeDefined();
    expect(
      result
        .getByTestId('eventListItemName')
        .props.children.some((child: any) => child === testEvent.name),
    ).toBeTruthy();
    expect(result.getByTestId('eventListItemName').props.style.fontWeight).toBe(
      'bold',
    );
    expect(result.getByTestId('eventListItemName').props.style.color).toBe(
      colors.light.accent,
    );

    //Testing event description
    expect(result.getByTestId('eventListItemDescription')).toBeDefined();
    expect(result.getByText(testEvent.description)).toBeDefined();
    expect(
      result
        .getByTestId('eventListItemDescription')
        .props.children.some((child: any) => child === testEvent.description),
    ).toBeTruthy();
    //Testing event startAt
    expect(result.getByTestId('eventListItemStart')).toBeDefined();
    expect(
      result.getByText(
        strings.routine_start_at.en +
          ' ' +
          getTimeStringFromDate(new Date(testEvent.startAt)),
      ),
    ).toBeDefined();
    expect(
      result
        .getByTestId('eventListItemStart')
        .props.children.some(
          (child: any) =>
            child ===
            strings.routine_start_at.en +
              ' ' +
              getTimeStringFromDate(new Date(testEvent.startAt)),
        ),
    ).toBeTruthy();
    expect(
      result.getByTestId('eventListItemStart').props.style.fontWeight,
    ).toBe('bold');
    //Testing event endAt
    expect(result.getByTestId('eventListItemEnd')).toBeDefined();
    expect(
      result.getByText(
        strings.routine_end_at.en +
          ' ' +
          getTimeStringFromDate(new Date(testEvent.endAt)),
      ),
    ).toBeDefined();
    expect(
      result
        .getByTestId('eventListItemEnd')
        .props.children.some(
          (child: any) =>
            child ===
            strings.routine_end_at.en +
              ' ' +
              getTimeStringFromDate(new Date(testEvent.endAt)),
        ),
    ).toBeTruthy();
    expect(result.getByTestId('eventListItemEnd').props.style.fontWeight).toBe(
      'bold',
    );
    //Testing event weekDays
    const weekDaysItems = result.getAllByTestId('eventListItemWeekDay');
    const weekDaysTest = getWeekDays('en');
    expect(weekDaysItems).toBeDefined();
    expect(weekDaysItems.length).toBe(7);
    for (let i = 0; i < 7; i++) {
      expect(weekDaysItems[i]).toBeDefined();
      //Testing the text content
      const labelChild = weekDaysItems[i].props.children;
      expect(labelChild.props.text).toBe(
        weekDaysTest[i].charAt(0).toUpperCase(),
      );
      //Testing the style
      expect(weekDaysItems[i].props.style.backgroundColor).toBe(
        testEvent.indexes.includes(i)
          ? colors.light.accent + 70
          : colors.light.grey + 30,
      );
    }
  });
});

describe('EventListItem action tests', () => {
  it('should call the provided funcion on the long press', () => {
    const onLongPress = jest.fn();
    const result = render(
      <StringsProvider>
        <EventListItem item={testEvent} onLongPress={onLongPress} />
      </StringsProvider>,
    );

    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('eventListItem')).toBeDefined();
    //Testing the long press
    expect(onLongPress).not.toHaveBeenCalled();
    fireEvent(result.getByTestId('eventListItem'), 'longPress');
    expect(onLongPress).toHaveBeenCalled();
  });
});
