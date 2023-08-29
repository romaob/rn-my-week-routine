import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import CurrentSlotProvider from './src/hooks/currentSlotContext';
import Routine from './src/screens/Routine';

export type RootStackParamList = {
  Splash: {} | undefined;
  Home: {} | undefined;
  Routine: {} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.appContainer}>
      <CurrentSlotProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Routine" component={Routine} />
          </Stack.Navigator>
        </NavigationContainer>
      </CurrentSlotProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flex: 1,
  },
});

export default App;
