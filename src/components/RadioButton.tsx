import React from 'react';
import {View, StyleSheet} from 'react-native';
import Label from './Label';
import {sizes} from '../values/sizes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../values/colors';

export interface RadioButtonProps {
  label?: string;
  size?: number;
  selected: boolean;
  onPress: () => void;
}

export default function RadioButton({
  label,
  size = sizes.font.md,
  selected,
  onPress,
}: RadioButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      testID="radioButton"
      style={styles.container}
      onPress={onPress}>
      <View
        testID="radioButtonCircle"
        style={{
          ...styles.radio,
          ...{padding: size / 4},
        }}>
        <View
          testID="radioButtonCircleInner"
          style={{
            ...styles.radioInner,
            ...(selected ? styles.radioSelected : {}),
            ...(size
              ? {width: size, height: size, borderRadius: size / 2}
              : {}),
          }}
        />
      </View>
      <Label
        testID="radioButtonLabel"
        text={label || ''}
        style={{
          ...styles.label,
          ...{fontSize: size},
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.padding.sm,
  },
  radio: {
    display: 'flex',
    borderWidth: 2,
    borderColor: colors.light.accent,
    backgroundColor: 'white',
    borderRadius: 999,
  },
  radioInner: {
    backgroundColor: 'transparent',
  },
  radioSelected: {
    backgroundColor: colors.light.accent,
    borderRadius: 999,
  },
  label: {},
});
