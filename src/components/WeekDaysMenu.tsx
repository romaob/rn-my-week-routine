import React from 'react';
import {View, StyleSheet} from 'react-native';
import {getWeekDays} from '../utils/dateUtils';
import Button, {ButtonColorType, ButtonSize} from './Button';
import {sizes} from '../values/sizes';
import {useString} from '../context/useStringContext';

export interface WeekDaysMenuProps {
  selectedIndexes?: number[];
  disabled?: boolean;
  size?: ButtonSize;
  onPress?: (day: string, index: number) => void;
  highlightToday?: boolean;
}

export default function WeekDaysMenu({
  selectedIndexes = [],
  disabled,
  size = ButtonSize.MEDIUM_2,
  onPress,
  highlightToday = false,
}: WeekDaysMenuProps) {
  const {language} = useString();
  const weekDays = getWeekDays(language);
  function isToday(index: number): boolean {
    return new Date().getDay() === index && highlightToday;
  }

  function getColorType(day: string, index: number) {
    if (selectedIndexes.includes(index)) {
      return ButtonColorType.ACCENT;
    }
    if (isToday(index)) {
      return ButtonColorType.PRIMARY;
    }
    return ButtonColorType.SECONDARY;
  }

  function handleOnPress(day: string, index: number) {
    onPress && onPress(day, index);
  }

  return (
    <View testID="weekdays-menu" style={styles.container}>
      {weekDays.map((day, index) => (
        <Button
          key={index}
          colorType={getColorType(day, index)}
          size={size}
          label={day.slice(0, 2)}
          flex
          rounded
          onPress={() => handleOnPress(day, index)}
          disabled={disabled}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    maxWidth: 400,
    flexDirection: 'row',
    gap: sizes.margin.sm,
    paddingHorizontal: sizes.padding.sm,
    paddingVertical: sizes.padding.md,
  },
});
