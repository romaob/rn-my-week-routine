import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/screens/Splash';

export type RootStackParamList = {
  Splash: {} | undefined;
  Home: {} | undefined;
  Profile: {} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.appContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
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
