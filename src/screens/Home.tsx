import React from 'react';
import {View, StyleSheet} from 'react-native';
import useEvents from '../hooks/useEvents';
import RoutineList from '../components/RoutineList';
import useSetup from '../hooks/useSetup';
import WeekDaysMenu from '../components/WeekDaysMenu';

export default function Home(): JSX.Element {
  const {events} = useEvents();
  const {loading: setupLoading} = useSetup();

  return (
    <View style={styles.container}>
      <WeekDaysMenu />
      {/* 
      <RoutineList events={events} />
    */}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
});
