import {View, Text, StyleSheet, FlatList, Touchable, TouchableOpacity} from 'react-native';
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
    const newTimeSlots: TimeSlot[] = [];
    const timeOptions = getDayTimesForMinutes(ITEM_MINUTES);
    for (const option of timeOptions) {
      newTimeSlots.push({
        date: option,
        events: [getEmptyEvent()],
        active: checkIsActive(option),
      });
    }
    /*
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
    */
    newTimeSlots[12].events.push({
      id: '1',
      name: 'Teste',
      indexes: [0, 1, 2, 3, 4, 5, 6],
      description: 'Teste',
      startAt: '2021-08-10T06:00:00.000Z',
      endAt: '2021-08-10T06:30:00.000Z',
      alertEnabled: false,
      alertSent: false,
      alertConfirmed: false,
      added: '2021-08-10T06:00:00.000Z',
      updated: '2021-08-10T06:00:00.000Z',
    });
    setTimeSlots(newTimeSlots);
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
  slotItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: sizes.padding.sm,
  },
  slotItemContrast: {
    backgroundColor: colors.light.grey + 20,
  },
  slotItemActive: {
    backgroundColor: colors.light.accent + 33,
  },
  eventItem: {
    padding: sizes.padding.sm,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventItemSet: {
    backgroundColor: colors.light.accent,
    borderRadius: 10,
  },
});
