import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import useEvents from '../hooks/useEvents';
import RoutineList from '../components/RoutineList';
import useSetup from '../hooks/useSetup';
import WeekDaysMenu from '../components/WeekDaysMenu';
import Label from '../components/Label';
import TimeLabels from '../components/TimeLabels';

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
    const timerToUpdateIndex = setInterval(() => {
      setCurrentIndex(getCurrentIndex());
    }, 1000 * 60);
    return () => {
      clearInterval(timerToUpdateIndex);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: 0,
        y: currentIndex > 10 ? currentIndex * 20 : 0,
        animated: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
