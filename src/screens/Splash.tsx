import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_KEYS} from '../values/appDefaults';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

export default function Splash() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    async function checkStorage() {
      try {
        const onboarding = await AsyncStorage.getItem(APP_KEYS.ONBOARDING);
        if (onboarding) {
          //Setup a timeout and navigate to home without option to navigate back to splash
          setTimeout(() => {
            //Navigate to home
            navigation.navigate('Home');
          }, 2000);
        } else {
          //Setup a default database
          await AsyncStorage.setItem(APP_KEYS.LANGUAGE, 'en');
          await AsyncStorage.setItem(APP_KEYS.ALERTS_ENABLED, 'true');
          await AsyncStorage.setItem(APP_KEYS.ONBOARDING, 'true');
          await AsyncStorage.setItem(APP_KEYS.EVENTS, JSON.stringify([]));
          setTimeout(() => {
            //Navigate to home
            navigation.navigate('Home');
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkStorage();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
