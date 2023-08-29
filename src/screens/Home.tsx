import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import useEvents from '../hooks/useEvents';
import RoutineList from '../components/RoutineList';
import useSetup from '../hooks/useSetup';
import WeekDaysMenu from '../components/WeekDaysMenu';
import TimeLabels from '../components/TimeLabels';
import {colors} from '../values/colors';
import {Event} from '../values/appDefaults';
import Button, {ButtonColorType} from '../components/Button';
import {useCurrentSlot} from '../hooks/currentSlotContext';

export default function Home(): JSX.Element {
  //Get current time slot from the context
  const {currentIndex} = useCurrentSlot();
  const [initialScroll, setInitialScroll] = useState(false);
  const {events} = useEvents();
  const [currentSelectedDay, setCurrentSelectedDay] = useState<number>(
    new Date().getDay(),
  );
  const [renderEvents, setRenderEvents] = useState<Event[]>([]);
  const {loading: setupLoading} = useSetup();

  const scrollRef = React.useRef<ScrollView>(null);

  function handleOnMenuPress(day: string, index: number) {
    setCurrentSelectedDay(index);
  }

  function handleOnEventSelected(event: Event) {
    console.log('event selected: ', event);
  }

  useEffect(() => {
    if (!initialScroll && scrollRef.current) {
      scrollRef?.current?.scrollTo({
        x: 0,
        y: currentIndex * 20,
        animated: true,
      });
      console.log('scrolling to: ', currentIndex * 20);
      setInitialScroll(true);
    }
  }, [currentIndex, scrollRef, initialScroll]);

  useEffect(() => {
    if (events.length > 0) {
      const res = events.filter(event => {
        return event.indexes.includes(currentSelectedDay);
      });
      setRenderEvents(res);
    }
  }, [events, currentSelectedDay]);

  return (
    <View style={styles.container}>
      <WeekDaysMenu
        onPress={handleOnMenuPress}
        selectedIndex={currentSelectedDay}
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
          onPress={() => console.log('add')}>
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
