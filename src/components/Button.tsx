import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {sizes} from '../values/sizes';
import {colors} from '../values/colors';

export enum ButtonColorType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  ACCENT = 'accent',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  GREY = 'grey',
}

export enum ButtonSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  MEDIUM_2 = 'md2',
  LARGE = 'lg',
  EXTRA_LARGE = 'xl',
}

export interface ButtonProps {
  label?: string;
  rounded?: true;
  colorType?: ButtonColorType;
  transparent?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  disabled?: boolean;
  inactive?: boolean;
  contentVertical?: boolean;
  size?: ButtonSize;
  flex?: boolean;
  onPress: () => void;
  children?: React.ReactNode;
  testID?: string;
}

const pallete = colors.light;

export default function Button({
  label,
  rounded,
  colorType,
  transparent,
  disabled,
  inactive,
  contentVertical,
  size = ButtonSize.MEDIUM,
  flex,
  onPress,
  children,
  testID,
  ...props
}: ButtonProps): JSX.Element {
  function getProps() {
    return {
      ...props,
      style: {
        ...styles.container,
        ...styles[colorType || ButtonColorType.PRIMARY],
        ...(transparent ? {backgroundColor: 'transparent'} : {}),
        ...(rounded ? styles.rounded : {}),
        ...(disabled ? styles.disabled : {}),
        ...(contentVertical ? styles.contentVertical : {}),
        ...(flex ? styles.flex : {}),
      },
    };
  }

  function getChildren() {
    return (
      <>
        {children}
        {label && (
          <Text
            testID="buttonLabel"
            style={[styles.text, size && styles[`text-${size}`]]}>
            {label}
          </Text>
        )}
      </>
    );
  }

  if (inactive || disabled) {
    return (
      <View testID={testID || 'buttonInactive'} {...getProps()}>
        {getChildren()}
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        testID={testID || 'button'}
        {...getProps()}
        onPress={onPress}>
        {getChildren()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: sizes.padding.sm,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rounded: {
    borderRadius: 999,
    aspectRatio: 1,
  },
  contentVertical: {flexDirection: 'column'},
  primary: {backgroundColor: pallete.primary},
  secondary: {backgroundColor: pallete.secondary},
  accent: {backgroundColor: pallete.accent},
  success: {backgroundColor: pallete.success},
  danger: {backgroundColor: pallete.danger},
  warning: {backgroundColor: pallete.warning},
  info: {backgroundColor: pallete.info},
  grey: {backgroundColor: pallete.grey},
  'text-sm': {
    fontSize: sizes.font.sm,
  },
  'text-md': {
    fontSize: sizes.font.md,
  },
  'text-md2': {
    fontSize: sizes.font.md2,
  },
  'text-lg': {
    fontSize: sizes.font.lg,
  },
  'text-xl': {
    fontSize: sizes.font.xl,
  },
  disabled: {
    opacity: 0.5,
  },
  flex: {
    flex: 1,
  },
  text: {
    color: pallete.textContrast,
  },
});
