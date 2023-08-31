import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Event, ITEM_MINUTES} from '../values/appDefaults';
import Label, {FontSize} from './Label';
import {sizes} from '../values/sizes';
import {colors} from '../values/colors';
import routineListBuilder, {
  ColumnEventSlot,
  EventSlot,
  TimeBlock,
} from '../utils/routineListBuilder';
import {getDayTimesForMinutes, getSlotIndexOfDate} from '../utils/dateUtils';
import {useCurrentSlot} from '../context/currentSlotContext';

function EventGroup({
  eventSlot,
  onLongPress,
}: {
  eventSlot: EventSlot;
  onLongPress: (event: Event) => void;
}): JSX.Element {
  const {currentIndex: nowIndex} = useCurrentSlot();
  const eventStartIndex = getSlotIndexOfDate(
    new Date(eventSlot.event.startAt),
    ITEM_MINUTES,
  );
  const eventEndIndex = getSlotIndexOfDate(
    new Date(eventSlot.event.endAt),
    ITEM_MINUTES,
  );
  const [isActive, setIsActive] = useState(
    nowIndex >= eventStartIndex && nowIndex < eventEndIndex,
  );
  const isEmpty = !eventSlot.event.id;

  useEffect(() => {
    setIsActive(nowIndex >= eventStartIndex && nowIndex < eventEndIndex);
  }, [eventEndIndex, eventStartIndex, nowIndex]);

  return (
    <View
      style={{
        ...styles.eventGroup,
        ...(isEmpty ? styles.eventGroupEmpty : {}),
      }}>
      <TouchableOpacity
        onLongPress={() => onLongPress && onLongPress(eventSlot.event)}>
        {eventSlot.timeSlots.map((timeSlot, index) => {
          const isTop = index === 0;
          const isBottom = index === eventSlot.timeSlots.length - 1;
          return (
            <View
              key={index}
              style={{
                ...styles.eventSlot,
                ...(isTop && !isEmpty ? styles.eventSlotTop : {}),
                ...(isBottom && !isEmpty ? styles.eventSlotBottom : {}),
                ...(!isEmpty ? styles.eventSlotFilled : {}),
                ...(isEmpty ? styles.eventSlotEmpty : {}),
                ...(!isEmpty && isActive ? styles.eventSlotActive : {}),
              }}>
              {index === 0 && (
                <Label text={eventSlot.event.name} size={FontSize.SMALL} />
              )}
            </View>
          );
        })}
      </TouchableOpacity>
    </View>
  );
}

function BlockColumn({
  column,
  onEventSelected,
}: {
  column: ColumnEventSlot;
  onEventSelected: (event: Event) => void;
}): JSX.Element {
  return (
    <View style={styles.routineBlockColumn}>
      {column.eventSlots.map((eventSlot, index) => (
        <EventGroup
          key={index}
          eventSlot={eventSlot}
          onLongPress={onEventSelected}
        />
      ))}
    </View>
  );
}

function RoutineListBlock({
  routineBlock,
  onEventSelected,
}: {
  routineBlock: TimeBlock;
  onEventSelected: (event: Event) => void;
}): JSX.Element {
  return (
    <View style={styles.routineBlock}>
      {routineBlock.columns.map((column, index) => (
        <BlockColumn
          key={index}
          column={column}
          onEventSelected={onEventSelected}
        />
      ))}
    </View>
  );
}

export interface RoutineListProps {
  events: Event[];
  onEventSelected: (event: Event) => void;
}

export default function RoutineList({
  events,
  onEventSelected,
}: RoutineListProps) {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const slots = getDayTimesForMinutes(ITEM_MINUTES);
  const {currentIndex} = useCurrentSlot();

  function handleOnPress(event: Event) {
    onEventSelected && onEventSelected(event);
  }
  useEffect(() => {
    const res = routineListBuilder(events);
    setTimeBlocks(res.timeBlocks);
  }, [events]);

  return (
    <View style={styles.container}>
      <View style={styles.fixedContainerBackground}>
        {slots.map((slot, index) => {
          const contrast = index % 2 === 0;
          const active =
            getSlotIndexOfDate(slot, ITEM_MINUTES) === currentIndex;
          return (
            <View
              key={index}
              style={{
                ...styles.backgroundItem,
                ...(contrast ? styles.backgroundItemContrast : {}),
                ...(active ? styles.backgroundItemActive : {}),
              }}
            />
          );
        })}
      </View>
      <View style={styles.itemsContainer}>
        {timeBlocks.map((routineBlock, index) => (
          <RoutineListBlock
            key={index}
            routineBlock={routineBlock}
            onEventSelected={handleOnPress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  fixedContainerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  backgroundItem: {
    height: sizes.appValues.timeSlotHeight,
    backgroundColor: colors.light.textSecondary + 30,
  },
  backgroundItemContrast: {
    backgroundColor: colors.light.textSecondary + 60,
  },
  backgroundItemActive: {
    backgroundColor: colors.light.accent,
  },
  itemsContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routineBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
  routineBlockColumn: {
    display: 'flex',
    flex: 1,
  },
  eventGroup: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.light.cardBackground + 90,
  },
  eventGroupEmpty: {
    backgroundColor: 'transparent',
  },
  eventSlot: {
    height: sizes.appValues.timeSlotHeight,
    display: 'flex',
    padding: sizes.padding.sm,
    marginHorizontal: 4,
  },
  eventSlotFilled: {
    backgroundColor: colors.light.secondary,
  },
  eventSlotEmpty: {
    backgroundColor: colors.light.cardBackground + 90,
    marginHorizontal: 0,
  },
  eventSlotActive: {
    backgroundColor: colors.light.accent,
  },
  eventSlotTop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventSlotBottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
