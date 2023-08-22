import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Event, ITEM_MINUTES, getEmptyEvent} from '../values/appDefaults';
import Label from './Label';
import {sizes} from '../values/sizes';
import {colors} from '../values/colors';
import {getDayTimesForMinutes} from '../utils/dateUtils';
import {checkIsActive} from './TimeLabels';

export type TimeSlot = {
  date: Date;
  events: Event[];
  active?: boolean;
};
export interface EventListItemProps {
  event: Event;
  onPress?: () => void;
}

export function EventItem({event}: EventListItemProps) {
  return (
    <TouchableOpacity
      style={{...styles.eventItem, ...(event.id ? styles.eventItemSet : {})}}>
      <Label text={event?.name} />
    </TouchableOpacity>
  );
}
export interface SlotListItemProps {
  timeSlot: TimeSlot;
  onEventSelect: (event: Event) => void;
}

export function SlotListItem({timeSlot}: SlotListItemProps) {
  const index =
    timeSlot.date.getHours() * 2 + (timeSlot.date.getMinutes() >= 30 ? 1 : 0);
  return (
    <View
      style={{
        ...styles.slotItem,
        ...(timeSlot?.active ? styles.slotItemActive : {}),
        ...(index % 2 !== 0 ? styles.slotItemContrast : {}),
      }}>
      {timeSlot.events.map((event, index) => (
        <EventItem event={event} key={index + '' + (event?.id || 0)} />
      ))}
    </View>
  );
}

export interface RoutineListProps {
  events: Event[];
  dayIndex: number;
}

export default function RoutineList({
  events,
  dayIndex = new Date().getDay(),
}: RoutineListProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  function handleOnPress(event: Event) {
    console.log(event);
  }
  useEffect(() => {
    // Array of slots
    const newTimeSlots = new Map<number, TimeSlot>();
    const timeOptions = getDayTimesForMinutes(ITEM_MINUTES);
    for (const option of timeOptions) {
      const optionIndex =
        option.getHours() * 2 + (option.getMinutes() >= 30 ? 1 : 0);
      newTimeSlots.set(optionIndex, {
        date: option,
        events: [],
        active: checkIsActive(option),
      });
    }

    for (const event of events) {
      const eventStartIndex =
        new Date(event.startAt).getHours() * 2 +
        (new Date(event.startAt).getMinutes() >= 30 ? 1 : 0) -
        1;
      const eventEndIndex =
        new Date(event.endAt).getHours() * 2 +
        (new Date(event.endAt).getMinutes() >= 30 ? 1 : 0) -
        1;
      for (let i = eventStartIndex; i <= eventEndIndex; i++) {
        const slot = newTimeSlots.get(i);
        if (slot) {
          slot.events.push(event);
        }
      }
    }

    setTimeSlots(Array.from(newTimeSlots.values()));
  }, [dayIndex, events]);

  return (
    <View style={styles.container}>
      {events.length > 0 ? (
        <View style={styles.itemsContainer}>
          {timeSlots.map((slot, i) => (
            <SlotListItem
              key={i}
              timeSlot={slot}
              onEventSelect={handleOnPress}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Label text="No events" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  itemsContainer: {
    flex: 1,
    borderTopColor: colors.light.textSecondary,
    borderTopWidth: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotItem: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    minHeight: sizes.appValues.timeSlotHeight,
  },
  slotItemContrast: {
    backgroundColor: colors.light.grey + 20,
  },
  slotItemActive: {
    backgroundColor: colors.light.accent + 33,
  },
  eventItem: {
    width: 100,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  eventItemSet: {
    backgroundColor: colors.light.primary + 33,
  },
});
