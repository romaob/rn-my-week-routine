import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Button, {ButtonColorType} from './Button';

export interface ButtonCancelProps {
  onPress: () => void;
  colorType?: ButtonColorType;
}

export default function ButtonCancel({
  onPress,
  colorType = ButtonColorType.DANGER,
}: ButtonCancelProps) {
  return (
    <Button onPress={onPress} colorType={colorType} rounded>
      <Image
        style={styles.image}
        source={require('../assets/images/cancel.png')}
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
  },
});
