import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Event} from '../values/appDefaults';
import Label from './Label';

export interface EventListItemProps {
  event: Event;
  onPress: () => void;
}

export function EventListItem({event, onPress}: EventListItemProps) {
  return (
    <View>
      <Label text={event.name} />
    </View>
  );
}

export interface RoutineListProps {
  events: Event[];
}

export default function RoutineList({events}: RoutineListProps) {
  const listRef = React.useRef<FlatList>(null);

  function handleOnPress(event: Event) {
    console.log(event);
  }

  return (
    <>
      {events.length > 0 ? (
        <FlatList
          style={styles.container}
          data={events}
          renderItem={({item}) => (
            <EventListItem event={item} onPress={() => handleOnPress(item)} />
          )}
          keyExtractor={item => item.id}
          ref={listRef}
        />
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
    backgroundColor: "#0FF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
