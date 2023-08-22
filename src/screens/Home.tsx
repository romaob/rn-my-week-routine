import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import useEvents from '../hooks/useEvents';
import RoutineList from '../components/RoutineList';
import useSetup from '../hooks/useSetup';
import WeekDaysMenu from '../components/WeekDaysMenu';
import Label from '../components/Label';
import TimeLabels from '../components/TimeLabels';

export default function Home(): JSX.Element {
  const {events} = useEvents();
  const {loading: setupLoading} = useSetup();

  return (
    <View style={styles.container}>
      <WeekDaysMenu />
      <ScrollView style={styles.timesScrollContainer}>
        <View style={styles.timeContainer}>
          <TimeLabels />
          <RoutineList events={events} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  timesScrollContainer: {
    width: '100%',
    flex: 1,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
