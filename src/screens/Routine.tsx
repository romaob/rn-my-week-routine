import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {sizes} from '../values/sizes';
import {useNavigation, useRoute} from '@react-navigation/native';
import Label, {FontSize} from '../components/Label';
import {Event, ITEM_MINUTES} from '../values/appDefaults';
import InputText from '../components/InputText';
import {colors} from '../values/colors';
import useString from '../hooks/useString';
import WeekDaysMenu from '../components/WeekDaysMenu';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Button, {ButtonColorType, ButtonSize} from '../components/Button';
import useEvents from '../hooks/useEvents';
import {
  getTimeFilteredByMinutes,
  getTimeStringFromDate,
} from '../utils/dateUtils';
import Space from '../components/Space';
import ButtonCancel from '../components/ButtonCancel';
import DialogAlert from '../components/DialogAlert';

export default function Routine() {
  const {getString} = useString();
  const route = useRoute();
  const navigation = useNavigation();
  const {event} = route.params || ({} as {event: Event});
  const IS_ANDROID = Platform.OS === 'android';
  const {loading, events, updateEventsData} = useEvents();

  const [name, setName] = useState<string>(event?.name || '');
  const [description, setDescription] = useState<string>(
    event?.description || '',
  );
  const [selectedDays, setSelectedDays] = useState<number[]>(
    event?.indexes.length > 0 ? event?.indexes : [new Date().getDay()],
  );
  const [startDateTime, setStartDateTime] = useState<Date>(
    new Date(
      event?.startAt ||
        getTimeFilteredByMinutes(new Date(), ITEM_MINUTES).getTime(),
    ),
  );
  const [endDateTime, setEndDateTime] = useState<Date>(
    new Date(
      event?.endAt ||
        getTimeFilteredByMinutes(new Date(), ITEM_MINUTES).getTime() +
          60 * 60 * 1000,
    ),
  );
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  function handleOnDaySelected(day: string, index: number) {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter(i => i !== index));
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  }

  async function handleOnSave() {
    const newEvent: Event = {
      id: event?.id || Date.now().toString(),
      name,
      description,
      indexes: selectedDays,
      startAt: startDateTime.toISOString(),
      endAt: endDateTime.toISOString(),
      alertEnabled: false,
      alertSent: false,
      alertConfirmed: false,
      added: event?.added || new Date().toISOString(),
      updated: new Date().toISOString(),
    };

    const newEvents = [...events];
    if (event?.id) {
      const eventIndex = newEvents.findIndex(e => e.id === event.id);
      newEvents[eventIndex] = newEvent;
    } else {
      newEvents.push(newEvent);
    }
    await updateEventsData(newEvents);
    navigation.goBack();
  }

  async function handleOnDelete() {
    const newEvents = events.filter(e => e.id !== event?.id);
    await updateEventsData(newEvents);
    navigation.goBack();
  }
/*
  useEffect(() => {
    setShowEnd(false);
  }, [endDateTime]);

  useEffect(() => {
    setShowStart(false);
  }, [startDateTime]);
*/
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Label
          text={event?.name || getString('routine_new')}
          size={FontSize.LARGE}
          color={colors.light.accent}
        />
        <Space />
        {event?.id && (
          <ButtonCancel onPress={() => setShowDeleteDialog(true)} />
        )}
      </View>
      <InputText
        text={name}
        onTextChange={setName}
        label={getString('routine_name')}
        required
        disabled={loading}
      />
      <Label text={getString('routine_days_select')} size={FontSize.SMALL} />
      <WeekDaysMenu
        selectedIndexes={selectedDays}
        onPress={handleOnDaySelected}
        disabled={loading}
      />
      <View style={styles.timeSelectionContaier}>
        <View style={styles.timeSelection}>
          <Label text={getString('routine_start_time')} size={FontSize.SMALL} />
          {IS_ANDROID && (
            <TouchableOpacity
              onPress={() => setShowStart(true)}
              style={styles.timeTouchable}>
              <Label
                text={getTimeStringFromDate(startDateTime)}
                size={FontSize.LARGE}
              />
            </TouchableOpacity>
          )}
          {(!IS_ANDROID || showStart) && (
            <RNDateTimePicker
              mode="time"
              display="spinner"
              disabled={loading}
              value={startDateTime}
              onChange={(event, selectedDate) => {
                setShowStart(!IS_ANDROID);
                const currentDate = selectedDate || startDateTime;
                setStartDateTime(currentDate);
              }}
              minuteInterval={ITEM_MINUTES}
            />
          )}
        </View>
        <View style={styles.timeSelection}>
          <Label text={getString('routine_end_time')} size={FontSize.SMALL} />
          {IS_ANDROID && (
            <TouchableOpacity
              onPress={() => setShowEnd(true)}
              style={styles.timeTouchable}>
              <Label
                text={getTimeStringFromDate(endDateTime)}
                size={FontSize.LARGE}
              />
            </TouchableOpacity>
          )}
          {(!IS_ANDROID || showEnd) && (
            <RNDateTimePicker
              mode="time"
              display="spinner"
              disabled={loading}
              value={endDateTime}
              onChange={(event, selectedDate) => {
                setShowEnd(!IS_ANDROID);
                const currentDate = selectedDate || endDateTime;
                setEndDateTime(currentDate);
              }}
              minuteInterval={ITEM_MINUTES}
            />
          )}
        </View>
      </View>
      <InputText
        text={description}
        disabled={loading}
        onTextChange={setDescription}
        label={getString('routine_description')}
        textArea
      />
      <View style={styles.bottomContainer}>
        <Button
          label={getString('save')}
          colorType={ButtonColorType.ACCENT}
          size={ButtonSize.LARGE}
          flex
          onPress={handleOnSave}
          disabled={loading}
        />
      </View>
      <DialogAlert
        show={showDeleteDialog}
        title={getString('routine_delete_title')}
        message={getString('routine_delete_message')}
        onCancel={() => {
          setShowDeleteDialog(false);
        }}
        onConfirm={() => {
          setShowDeleteDialog(false);
          handleOnDelete();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.padding.sm,
  },
  timeSelectionContaier: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: sizes.margin.sm,
  },
  timeSelection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: sizes.margin.md,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: sizes.margin.md,
    paddingHorizontal: sizes.padding.lg,
  },
  timeTouchable: {
    padding: sizes.padding.sm,
    paddingHorizontal: sizes.padding.md,
    borderRadius: 10,
    backgroundColor: colors.light.secondary + 50,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
