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

export enum ColorType {
  PRIMARY = 'text',
  SECONDARY = 'textSecondary',
}
export interface LabelProps {
  text: string;
  size?: FontSize;
  children?: React.ReactNode;
  childrenBefore?: boolean;
  childrenAfter?: boolean;
  testID?: string;
  colorType?: ColorType;
}

export default function Label({
  text,
  size = FontSize.MEDIUM,
  children,
  childrenBefore = true,
  childrenAfter,
  testID,
  colorType = ColorType.PRIMARY,
  ...props
}: LabelProps) {
  return (
    <Text
      testID={testID || 'label'}
      style={{
        ...styles.container,
        ...{fontSize: sizes.font[size], color: colors.light[colorType]},
        ...(props.style || {}),
      }}>
      {childrenBefore && children}
      {text}
      {childrenAfter && children}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});
