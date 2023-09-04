import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Button, {ButtonColorType} from './Button';

export interface ButtonDeleteProps {
  onPress: () => void;
  colorType?: ButtonColorType;
}

export default function ButtonDelete({
  onPress,
  colorType = ButtonColorType.DANGER,
}: ButtonDeleteProps) {
  return (
    <Button onPress={onPress} colorType={colorType} rounded>
      <Image
        style={styles.image}
        source={require('../assets/images/trash.png')}
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
