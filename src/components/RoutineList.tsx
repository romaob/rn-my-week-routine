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

function EventGroup({eventSlot}: {eventSlot: EventSlot}): JSX.Element {
  return (
    <TouchableOpacity style={styles.eventGroup}>
      {eventSlot.timeSlots.map((timeSlot, index) => {
        const isTop = index === 0;
        const isBottom = index === eventSlot.timeSlots.length - 1;
        const isEmpty = !eventSlot.event.id;
        return (
          <View
            key={index}
            style={{
              ...styles.eventSlot,
              ...(isTop && !isEmpty ? styles.eventSlotTop : {}),
              ...(isBottom && !isEmpty ? styles.eventSlotBottom : {}),
              ...(isEmpty ? styles.eventSlotEmpty : {}),
            }}>
            {index === 0 && (
              <Label text={eventSlot.event.name} size={FontSize.SMALL} />
            )}
          </View>
        );
      })}
    </TouchableOpacity>
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

  function handleOnPress(event: Event) {
    console.log(event);
  }
  useEffect(() => {
    const res = routineListBuilder(events);
    setTimeBlocks(res.timeBlocks);
  }, [events]);

  return (
    <View style={styles.container}>
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
    backgroundColor: colors.light.cardBackground,
    paddingHorizontal: 2,
  },
  eventSlot: {
    height: sizes.appValues.timeSlotHeight,
    display: 'flex',
    backgroundColor: colors.light.primary + 33,
    padding: sizes.padding.sm,
  },
  eventSlotEmpty: {
    backgroundColor: colors.light.cardBackground,
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
