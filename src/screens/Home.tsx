import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import useEvents from '../hooks/useEvents';
import RoutineList from '../components/RoutineList';
import useSetup from '../hooks/useSetup';
import WeekDaysMenu from '../components/WeekDaysMenu';
import TimeLabels from '../components/TimeLabels';
import {colors} from '../values/colors';
import {Event, ITEM_MINUTES, getEmptyEvent} from '../values/appDefaults';
import Button, {ButtonColorType} from '../components/Button';
import {useCurrentSlot} from '../context/currentSlotContext';
import {useNavigation} from '@react-navigation/native';
import {getTimeFilteredByMinutes} from '../utils/dateUtils';

export default function Home(): JSX.Element {
  //Get current time slot from the context
  const navigation = useNavigation();
  const {currentIndex} = useCurrentSlot();
  const [initialScroll, setInitialScroll] = useState(false);
  const {events, refresh} = useEvents();
  const [currentSelectedDay, setCurrentSelectedDay] = useState<number[]>([
    new Date().getDay(),
  ]);
  const [renderEvents, setRenderEvents] = useState<Event[]>([]);
  const {loading: setupLoading} = useSetup();

  const scrollRef = React.useRef<ScrollView>(null);

  function handleOnMenuPress(day: string, index: number) {
    setCurrentSelectedDay([index]);
  }

  function handleOnEventSelected(event: Event) {
    if (!event?.id) {
      //Add the current day to the event
      event.indexes = currentSelectedDay;
    }
    navigation.navigate('Routine', {event});
  }

  function handleAddPress() {
    const emptyEvent = getEmptyEvent();
    //Set current time as start time and add 1 hour
    emptyEvent.startAt = getTimeFilteredByMinutes(
      new Date(),
      ITEM_MINUTES,
    ).toISOString();
    emptyEvent.endAt = new Date(
      getTimeFilteredByMinutes(new Date(), ITEM_MINUTES).getTime() +
        ITEM_MINUTES * 60 * 1000,
    ).toISOString();
    emptyEvent.indexes = currentSelectedDay;

    navigation.navigate('Routine', {event: emptyEvent});
  }

  const scrollToCurrentTime = useCallback(() => {
    scrollRef?.current?.scrollTo({
      x: 0,
      y: currentIndex * 20,
      animated: true,
    });
  }, [currentIndex]);

  useEffect(() => {
    if (!initialScroll && scrollRef.current) {
      scrollToCurrentTime();
      setInitialScroll(true);
    }
  }, [currentIndex, scrollRef, initialScroll, scrollToCurrentTime]);

  useEffect(() => {
    if (events.length > 0) {
      const res = events.filter(event => {
        return event.indexes.includes(currentSelectedDay[0]);
      });
      setRenderEvents(res);
    }
  }, [events, currentSelectedDay]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      scrollToCurrentTime();
      refresh();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  return (
    <View style={styles.container}>
      <WeekDaysMenu
        onPress={handleOnMenuPress}
        selectedIndexes={currentSelectedDay}
        highlightToday
      />
      <ScrollView style={styles.timesScrollContainer} ref={scrollRef}>
        <View style={styles.timeContainer}>
          <TimeLabels />
          <RoutineList
            events={renderEvents}
            onEventSelected={handleOnEventSelected}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonFloatContainer}>
        <Button
          rounded
          colorType={ButtonColorType.ACCENT}
          onPress={handleAddPress}>
          <Text style={styles.addButtonlabel}>+</Text>
        </Button>
      </View>
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
  buttonFloatContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonlabel: {
    fontSize: 30,
    color: colors.light.textContrast,
  },
});
