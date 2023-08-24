import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {getDayTimesForMinutes, getSlotIndexOfDate} from '../utils/dateUtils';
import Label, { ColorType } from './Label';
import {sizes} from '../values/sizes';
import {colors} from '../values/colors';
import {ITEM_MINUTES} from '../values/appDefaults';

export interface TimeLabelItemProps {
  date: Date;
  active?: boolean;
}

export const TEST_INDEX = 16;

export function checkIsActive(date: Date): boolean {
  const now = getSlotIndexOfDate(new Date(), ITEM_MINUTES);
  const dateIx = getSlotIndexOfDate(date, ITEM_MINUTES);
  return TEST_INDEX === dateIx;
}

export function TimeLabelItem({date, active}: TimeLabelItemProps): JSX.Element {
  if (date.getMinutes() === 0) {
    return (
      <View
        testID="time-labels-item"
        style={
          active
            ? [styles.itemContainer, styles.itemContainerActive]
            : styles.itemContainer
        }>
        <View style={styles.timeLabelFull} />
        <Label testID="time-labels-item-hour" text={date.getHours() + ''} />
      </View>
    );
  } else {
    return (
      <View
        testID="time-labels-item"
        style={
          active
            ? [styles.itemContainer, styles.itemContainerActive]
            : styles.itemContainer
        }>
        <View style={styles.timeLabelHalf} />
        <Label text={''} />
      </View>
    );
  }
}

export default function TimeLabels(): JSX.Element {
  return (
    <View testID="time-labels" style={styles.container}>
      {getDayTimesForMinutes(ITEM_MINUTES).map((date, index) => (
        <TimeLabelItem key={index} date={date} active={checkIsActive(date)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 30,
  },
  itemContainer: {
    height: sizes.appValues.timeSlotHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: colors.light.textSecondary + 80,
    borderRightWidth: 1,
  },
  itemContainerActive: {
    backgroundColor: colors.light.accent,
  },
  timeLabelFull: {
    width: '100%',
    height: 2,
    backgroundColor: colors.light.textSecondary + 80,
  },
  timeLabelHalf: {
    width: 10,
    height: 2,
    backgroundColor: colors.light.textSecondary + 80,
    alignSelf: 'flex-end',
  },
});
