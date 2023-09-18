import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import Button from './Button';

export default function ButtonBack() {
  const navigation = useNavigation();
  return (
    <Button onPress={() => navigation.goBack()} transparent>
      <Image
        style={StyleSheet.icon}
        source={require('../assets/images/back-arrow.png')}
      />
    </Button>
  );
}

const StyleSheet = {
  icon: {
    width: 24,
    height: 24,
  },
};
