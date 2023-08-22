import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {sizes} from '../values/sizes';
import {colors} from '../values/colors';

export enum FontSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
  EXTRA_LARGE = 'xl',
}

export interface LabelProps {
  text: string;
  size?: FontSize;
  children?: React.ReactNode;
  childrenBefore?: boolean;
  childrenAfter?: boolean;
  testID?: string;
}

export default function Label({
  text,
  size = FontSize.MEDIUM,
  children,
  childrenBefore = true,
  childrenAfter,
  testID,
}: LabelProps) {
  return (
    <Text
      testID={testID || 'label'}
      style={{...styles.container, ...{fontSize: sizes.font[size]}}}>
      {childrenBefore && children}
      {text}
      {childrenAfter && children}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    color: colors.light.text,
    display: 'flex',
    flexDirection: 'row',
  },
});
