import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import useEvents from '../hooks/useEvents';
import RoutineList from '../components/RoutineList';
import useSetup from '../hooks/useSetup';
import WeekDaysMenu from '../components/WeekDaysMenu';
import Label from '../components/Label';
import TimeLabels from '../components/TimeLabels';
import { colors } from '../values/colors';

function getCurrentIndex(): number {
  const now = new Date();
  return now.getHours() * 2 + (now.getMinutes() >= 30 ? 1 : 0);
}

export default function Home(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(getCurrentIndex());
  const {events} = useEvents();
  const {loading: setupLoading} = useSetup();

  const scrollRef = React.useRef<ScrollView>(null);

  useEffect(() => {
    //console.log('scrolling to: ', currentIndex);
    /*
    scrollRef?.current?.scrollTo({
      x: 0,
      y: currentIndex * 20,
      animated: true,
    });
    */
  }, [currentIndex, scrollRef]);

  return (
    <View style={styles.container}>
      <WeekDaysMenu />
      <ScrollView style={styles.timesScrollContainer} ref={scrollRef}>
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
    backgroundColor: colors.light.background,
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
