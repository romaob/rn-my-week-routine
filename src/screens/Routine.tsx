import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {sizes} from '../values/sizes';
import {useRoute} from '@react-navigation/native';
import Label, {FontSize} from '../components/Label';
import {Event, ITEM_MINUTES} from '../values/appDefaults';
import InputText from '../components/InputText';
import {colors} from '../values/colors';
import useString from '../hooks/useString';
import WeekDaysMenu from '../components/WeekDaysMenu';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Button, { ButtonColorType, ButtonSize } from '../components/Button';

export default function Routine() {
  const {getString} = useString();
  const route = useRoute();
  const {event} = route.params || ({} as {event: Event});

  const [name, setName] = useState<string>(event?.name || '');
  const [description, setDescription] = useState<string>(
    event?.description || '',
  );
  const [selectedDays, setSelectedDays] = useState<number[]>(
    event?.indexes || [new Date().getDay()],
  );
  const [startDateTime, setStartDateTime] = useState<Date>(
    new Date(event?.startAt || Date.now()),
  );
  const [endDateTime, setEndDateTime] = useState<Date>(
    new Date(event?.endAt || Date.now() + 60 * 60 * 1000),
  );

  function handleOnDaySelected(day: string, index: number) {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter(i => i !== index));
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  }

  return (
    <View style={styles.container}>
      <Label
        text={event?.name || getString('routine_new')}
        size={FontSize.LARGE}
        color={colors.light.accent}
      />
      <InputText
        text={description}
        onTextChange={setDescription}
        label={getString('routine_name')}
        required
      />
      <Label text={getString('routine_days_select')} size={FontSize.SMALL} />
      <WeekDaysMenu
        selectedIndexes={selectedDays}
        onPress={handleOnDaySelected}
      />
      <View style={styles.timeSelectionContaier}>
        <View style={styles.timeSelection}>
          <Label text={getString('routine_start_time')} size={FontSize.SMALL} />
          <RNDateTimePicker
            mode="time"
            value={startDateTime}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || startDateTime;
              setStartDateTime(currentDate);
            }}
            minuteInterval={ITEM_MINUTES}
          />
        </View>
        <View style={styles.timeSelection}>
          <Label text={getString('routine_end_time')} size={FontSize.SMALL} />
          <RNDateTimePicker
            mode="time"
            value={endDateTime}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || endDateTime;
              setEndDateTime(currentDate);
            }}
            minuteInterval={ITEM_MINUTES}
          />
        </View>
      </View>
      <InputText
        text={name}
        onTextChange={setName}
        label={getString('routine_description')}
        textArea
      />
      <View style={styles.bottomContainer}>
        <Button
          label={getString('save')}
          colorType={ButtonColorType.ACCENT}
          size={ButtonSize.LARGE}
          flex
          onPress={() => {}}
        />
      </View>
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
});
