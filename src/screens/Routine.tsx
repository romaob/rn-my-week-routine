import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {sizes} from '../values/sizes';
import {useRoute} from '@react-navigation/native';
import Label, {FontSize} from '../components/Label';
import {Event} from '../values/appDefaults';
import InputText from '../components/InputText';
import {colors} from '../values/colors';

export default function Routine() {
  const route = useRoute();
  const {event} = route.params || ({} as {event: Event});

  const [name, setName] = useState<string>('');

  return (
    <View style={styles.container}>
      <Label
        text={event?.name || 'New Routine'}
        size={FontSize.LARGE}
        color={colors.light.accent}
      />
      <InputText text={name} onTextChange={setName} label="Name" />
      <InputText text={name} onTextChange={setName} label="Name" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.padding.sm,
  },
});
