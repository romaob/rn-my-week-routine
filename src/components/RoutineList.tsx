import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Event, ITEM_MINUTES} from '../values/appDefaults';
import Label from './Label';
import {sizes} from '../values/sizes';
import {colors} from '../values/colors';
import {getDayTimesForMinutes} from '../utils/dateUtils';

export type TimeSlot = {
  date: Date;
  events: Event[];
};
export interface EventListItemProps {
  event: Event;
  onPress: () => void;
}
export interface SlotListItemProps {
  timeSlot: TimeSlot;
  onEventSelect: (event: Event) => void;
}

export function SlotListItem({timeSlot}: SlotListItemProps) {


  return (
    <View style={styles.eventItem}>
      <Label text={(timeSlot?.events?.length || 0) + ''} />
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
    const slotsSize = getDayTimesForMinutes(ITEM_MINUTES).length;
    // Array of slots
    const newTimeSlots: TimeSlot[] = [];

    for (let i = 0; i < slotsSize; i++) {
      const date = new Date(
        new Date().setHours(Math.floor(i / 2), i % 2 === 0 ? 0 : 30),
      );
      newTimeSlots.push({date, events: []});
    }

    if (events?.length > 0) {
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const eventDayIndex = event.indexes.some(index => index === dayIndex);
        if (eventDayIndex) {
          //Find the initial slot, using the startAt time (e.g. 8:00, the slot key is 8*2 and if the minutes are > 30, the slot key is 8*2+1)
          const initialSlot =
            new Date(event.startAt).getHours() * 2 +
            (new Date(event.startAt).getMinutes() > 30 ? 1 : 0);
          //Find the end slot based on the endAt time, following the same logic as above
          const endSlot =
            new Date(event.endAt).getHours() * 2 +
            (new Date(event.endAt).getMinutes() > 30 ? 1 : 0);
          //Add the event to the slots between the initial and end slot
          for (let j = initialSlot; j <= endSlot; j++) {
            newTimeSlots[j].events.push(event);
          }
        }
      }
    }
    setTimeSlots(Array.from(newTimeSlots.values()));
  }, [dayIndex, events]);

  return (
    <>
      {events.length > 0 ? (
        <View style={styles.container}>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: colors.light.textSecondary,
    borderTopWidth: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventItem: {
    padding: sizes.padding.sm,
  },
});
