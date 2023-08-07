import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';

export default function Home(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        label="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 10,
  },
});
