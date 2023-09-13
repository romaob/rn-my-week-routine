import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import useEvents from '../hooks/useEvents';
import {Event} from '../values/appDefaults';
import {colors} from '../values/colors';
import {sizes} from '../values/sizes';
import {useString} from '../context/useStringContext';
import {useNavigation} from '@react-navigation/native';
import EventListItem from '../components/EventListItem';

export default function Routines(): JSX.Element {
  const {events} = useEvents();
  const {language} = useString();
  const navigation = useNavigation();

  function handleItemSelect(event: Event) {
    navigation.navigate('Routine', {event});
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events || []}
        renderItem={({item}) => (
          <EventListItem
            item={item}
            language={language}
            onLongPress={() => handleItemSelect(item)}
          />
        )}
        keyExtractor={item => item.id || item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
    paddingVertical: sizes.padding.sm,
  },
});
