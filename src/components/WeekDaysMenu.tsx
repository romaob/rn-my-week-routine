import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WEEK_DAYS, getWeekDays} from '../utils/dateUtils';
import Button, {ButtonColorType, ButtonSize} from './Button';
import {sizes} from '../values/sizes';
import useString from '../hooks/useString';

export interface WeekDaysMenuProps {
  onPress?: (day: string, index: number) => void;
}

export default function WeekDaysMenu({onPress}: WeekDaysMenuProps) {
  const {language} = useString();
  const weekDays = getWeekDays(language);
  const [selected, setSelected] = useState(weekDays[new Date().getDay()]);
  function isToday(index: number): boolean {
    return new Date().getDay() === index;
  }

  function getColorType(day: string, index: number) {
    if (selected === day) {
      return ButtonColorType.ACCENT;
    }
    if (isToday(index)) {
      return ButtonColorType.PRIMARY;
    }
    return ButtonColorType.SECONDARY;
  }

  function handleOnPress(day: string, index: number) {
    setSelected(day);
    onPress && onPress(day, index);
}

  return (
    <View testID="weekdays-menu" style={styles.container}>
      {weekDays.map((day, index) => (
        <Button
          key={index}
          colorType={getColorType(day, index)}
          size={ButtonSize.EXTRA_LARGE}
          label={day.slice(0, 1)}
          flex
          rounded
          onPress={() => handleOnPress(day, index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 400,
    flexDirection: 'row',
    gap: sizes.margin.sm,
    padding: sizes.padding.sm,
  },
});
