import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {sizes} from '../values/sizes';
import Label from './Label';
import RadioButton from './RadioButton';

export interface RadioGroupProps {
  label?: string;
  size?: number;
  itemSelected: string;
  items: string[];
  labels?: string[];
  onPress: (item: string) => void;
}

export default function RadioGroup({
  label,
  size = sizes.font.md,
  itemSelected,
  items,
  labels,
  onPress,
}: RadioGroupProps): JSX.Element {
  return (
    <View style={styles.container}>
      {label && <Label text={label} />}
      {items.map((item, index) => (
        <RadioButton
          key={item}
          label={labels ? labels[index] : item}
          size={size}
          selected={itemSelected === item}
          onPress={() => onPress(item)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: sizes.padding.md,
    paddingVertical: sizes.padding.md,
  },
});
