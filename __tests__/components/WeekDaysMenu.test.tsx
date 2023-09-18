import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import WeekDaysMenu from '../../src/components/WeekDaysMenu';
import {colors} from '../../src/values/colors';
import {getWeekDays} from '../../src/utils/dateUtils';

describe('WeekDaysMenu render and behavior tests', () => {
  it('should render correctly', async () => {
    const result = render(<WeekDaysMenu />);
    expect(result.getByTestId('weekdays-menu')).toBeDefined();
    expect(result.getByTestId('weekdays-menu').children.length).toBe(7);
    const qtd = result.getAllByTestId('button').length;
    expect(qtd).toBe(7);
    const weekDays = getWeekDays('en');
    for (let i = 0; i < qtd; i++) {
      expect(
        result.getAllByTestId('button')[i].props.style.backgroundColor,
      ).toBe(colors.light.secondary);
      expect(
        result.getAllByTestId('buttonLabel')[i].props.children ===
          weekDays[i].slice(0, 2),
      ).toBeTruthy();
    }
  });

  it('should highlight the current day when provided highlightToday with the right color', async () => {
    const result = render(<WeekDaysMenu highlightToday />);
    expect(result.getByTestId('weekdays-menu')).toBeDefined();
    expect(result.getByTestId('weekdays-menu').children.length).toBe(7);
    const qtd = result.getAllByTestId('button').length;
    expect(qtd).toBe(7);
    const todayIndex = new Date().getDay();
    expect(
      result.getAllByTestId('button')[todayIndex].props.style.backgroundColor,
    ).toBe(colors.light.primary);
    for (let i = 0; i < qtd; i++) {
      if (i === todayIndex) {
        continue;
      }
      expect(
        result.getAllByTestId('button')[i].props.style.backgroundColor,
      ).toBe(colors.light.secondary);
    }
  });

  it('should render with the selected days in the right color', async () => {
    const selected = [0, 1, 3];
    const result = render(
      <WeekDaysMenu highlightToday selectedIndexes={selected} />,
    );
    expect(result.getByTestId('weekdays-menu')).toBeDefined();
    expect(result.getByTestId('weekdays-menu').children.length).toBe(7);
    const qtd = result.getAllByTestId('button').length;
    expect(qtd).toBe(7);
    const todayIndex = new Date().getDay();
    for (let i = 0; i < qtd; i++) {
      const isSelected = selected.includes(i);
      if (i === todayIndex && !isSelected) {
        expect(
          result.getAllByTestId('button')[i].props.style.backgroundColor,
        ).toBe(colors.light.primary);
        continue;
      }
      if (isSelected) {
        expect(
          result.getAllByTestId('button')[i].props.style.backgroundColor,
        ).toBe(colors.light.accent);
        continue;
      }
      expect(
        result.getAllByTestId('button')[i].props.style.backgroundColor,
      ).toBe(colors.light.secondary);
    }
  });

  it('should call the onPress function when a button is pressed', async () => {
    const onPress = jest.fn();
    const result = render(<WeekDaysMenu onPress={onPress} />);
    expect(onPress).not.toHaveBeenCalled();
    const qtd = result.getAllByTestId('button').length;
    for (let i = 0; i < qtd; i++) {
      fireEvent.press(result.getAllByTestId('button')[i]);
      expect(onPress).toHaveBeenCalledTimes(i + 1);
    }
  });

  it('should change selected button background on press', async () => {
    const onPress = jest.fn();
    const result = render(<WeekDaysMenu onPress={onPress} />);
    expect(onPress).not.toHaveBeenCalled();
    const btnIndex = new Date().getDay() === 0 ? 1 : 0;
    const btn = result.getAllByTestId('button')[btnIndex];
    expect(btn.props.style.backgroundColor).toBe(colors.light.secondary);
    fireEvent.press(btn);
    expect(btn.props.style.backgroundColor).toBe(colors.light.secondary);
    expect(onPress).toHaveBeenCalled();
    const todayBtn = result.getAllByTestId('button')[new Date().getDay()];
    expect(todayBtn.props.style.backgroundColor).toBe(colors.light.secondary);
  });
});
