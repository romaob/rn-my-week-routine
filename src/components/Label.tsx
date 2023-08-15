import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {sizes} from '../values/sizes';
import { colors } from '../values/colors';

export type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export interface LabelProps {
  text: string;
  size?: FontSize;
  children?: React.ReactNode;
  childrenBefore?: boolean;
  childrenAfter?: boolean;
}

export default function Label({
  text,
  size = 'md',
  children,
  childrenBefore,
  childrenAfter,
}: LabelProps) {
  return (
    <Text style={{...styles.container, ...{fontSize: sizes.font[size]}}}>
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
