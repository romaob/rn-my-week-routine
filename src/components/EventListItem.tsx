import React from 'react';
import {getTimeStringFromDate, getWeekDays} from '../utils/dateUtils';
import {StyleSheet, View} from 'react-native';
import Label, {FontSize} from './Label';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Event} from '../values/appDefaults';
import {colors} from '../values/colors';
import {sizes} from '../values/sizes';
import {useString} from '../context/useStringContext';

function WeekDaysListItem({
  day,
  selected,
}: {
  day: string;
  selected: boolean;
}): JSX.Element {
  return (
    <View
      style={{
        ...styles.weekDaysListItem,
        ...(selected ? styles.weekDaysListItemSelected : {}),
      }}
      testID="eventListItemWeekDay">
      <Label text={day.charAt(0).toUpperCase()} size={FontSize.SMALL} />
    </View>
  );
}

export default function EventListItem({
  item,
  onLongPress,
}: {
  item: Event;
  onLongPress?: (event: Event) => void;
}): JSX.Element {
  const {language, getString} = useString();
  const weekDays = getWeekDays(language);

  return (
    <TouchableOpacity
      testID="eventListItem"
      style={styles.listItem}
      onLongPress={() => onLongPress && onLongPress(item)}>
      <Label
        text={item.name}
        style={styles.title}
        color={colors.light.accent}
        testID="eventListItemName"
      />
      <Label
        text={item.description}
        size={FontSize.MEDIUM}
        color={colors.light.textSecondary}
        testID="eventListItemDescription"
      />
      <View style={styles.listItemTimes}>
        <Label
          text={
            getString('routine_start_at') +
            ' ' +
            getTimeStringFromDate(new Date(item.startAt))
          }
          size={FontSize.SMALL}
          color={colors.light.textSecondary}
          style={styles.listItemTimesText}
          testID="eventListItemStart"
        />
        <Label
          text={
            getString('routine_end_at') +
            ' ' +
            getTimeStringFromDate(new Date(item.endAt))
          }
          size={FontSize.SMALL}
          color={colors.light.textSecondary}
          style={styles.listItemTimesText}
          testID="eventListItemEnd"
        />
      </View>
      <View style={styles.listItemFooter}>
        {weekDays.map((day, index) => (
          <WeekDaysListItem
            key={index}
            day={day}
            selected={item.indexes.includes(index)}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
    paddingVertical: sizes.padding.sm,
  },
  listItem: {
    display: 'flex',
    margin: sizes.margin.sm,
    padding: sizes.padding.sm,
    minHeight: 40,
    backgroundColor: colors.light.cardBackground,
    gap: sizes.margin.sm,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.light.grey + '70',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  listItemTimes: {
    display: 'flex',
    flexDirection: 'row',
  },
  listItemTimesText: {
    fontWeight: 'bold',
    flex: 1,
  },
  listItemFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  weekDaysListItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: sizes.margin.sm,
    borderRadius: 999,
    padding: 3,
    width: 25,
    height: 25,
    backgroundColor: colors.light.grey + '30',
    borderWidth: 1,
    borderColor: colors.light.grey + '50',
  },
  weekDaysListItemSelected: {
    backgroundColor: colors.light.accent + '70',
  },
});
