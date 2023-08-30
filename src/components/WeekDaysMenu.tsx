import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WEEK_DAYS, getWeekDays} from '../utils/dateUtils';
import Button, {ButtonColorType, ButtonSize} from './Button';
import {sizes} from '../values/sizes';
import useString from '../hooks/useString';
import {colors} from '../values/colors';

export interface WeekDaysMenuProps {
  selectedIndexes: number[];
  disabled?: boolean;
  onPress?: (day: string, index: number) => void;
  highlightToday?: boolean;
}

export default function WeekDaysMenu({
  selectedIndexes = [],
  disabled,
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
          size={ButtonSize.MEDIUM_2}
          label={day.slice(0, 1)}
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
