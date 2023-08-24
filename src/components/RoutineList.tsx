import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
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
import {TEST_INDEX, checkIsActive} from './TimeLabels';

function EventGroup({eventSlot}: {eventSlot: EventSlot}): JSX.Element {
  const nowIndex = TEST_INDEX; //getSlotIndexOfDate(new Date(), ITEM_MINUTES);
  const eventStartIndex = getSlotIndexOfDate(
    new Date(eventSlot.event.startAt),
    ITEM_MINUTES,
  );
  const eventEndIndex = getSlotIndexOfDate(
    new Date(eventSlot.event.endAt),
    ITEM_MINUTES,
  );
  const isActive = nowIndex >= eventStartIndex && nowIndex < eventEndIndex;
  const isEmpty = !eventSlot.event.id;

  return (
    <View
      style={{
        ...styles.eventGroup,
        ...(isEmpty ? styles.eventGroupEmpty : {}),
      }}>
      <TouchableOpacity>
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
                <Label style={styles.eventLabel} text={eventSlot.event.name} size={FontSize.SMALL} />
              )}
            </View>
          );
        })}
      </TouchableOpacity>
    </View>
  );
}

function BlockColumn(column: ColumnEventSlot): JSX.Element {
  return (
    <View style={styles.routineBlockColumn}>
      {column.eventSlots.map((eventSlot, index) => (
        <EventGroup key={index} eventSlot={eventSlot} />
      ))}
    </View>
  );
}

function RoutineListBlock(routineBlock: TimeBlock): JSX.Element {
  return (
    <View style={styles.routineBlock}>
      {routineBlock.columns.map((column, index) => (
        <BlockColumn key={index} {...column} />
      ))}
    </View>
  );
}

export interface RoutineListProps {
  events: Event[];
}

export default function RoutineList({events}: RoutineListProps) {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([]);
  const slots = getDayTimesForMinutes(ITEM_MINUTES);

  function handleOnPress(event: Event) {
    console.log(event);
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
          const active = checkIsActive(slot);
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
      {events.length > 0 ? (
        <View style={styles.itemsContainer}>
          {timeBlocks.map((routineBlock, index) => (
            <RoutineListBlock key={index} {...routineBlock} />
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
    //backgroundColor: colors.light.cardBackground + 90,
    // borderTopColor: colors.light.textSecondary,
    // borderTopWidth: 2,
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
  eventLabel: {
    overflow: 'hidden',
  },
});
