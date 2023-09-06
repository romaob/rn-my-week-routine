import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import CurrentSlotProvider from './src/context/currentSlotContext';
import Routine from './src/screens/Routine';
import {Event} from './src/values/appDefaults';
import Routines from './src/screens/Routines';
import ButtonBack from './src/components/ButtonBack';
import {colors} from './src/values/colors';
import Settings from './src/screens/Settings';
import About from './src/screens/About';
import useString from './src/hooks/useString';

export type RootStackParamList = {
  Splash: {} | undefined;
  Home: {} | undefined;
  Routine: {event: Event} | undefined;
};

const Drawer = createDrawerNavigator();

function DrawerHeaderBackButton() {
  return <ButtonBack />;
}

function App(): JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';

  const {getString} = useString();

  return (
    <SafeAreaView style={styles.appContainer}>
      <CurrentSlotProvider>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.light.secondary,
              },
              drawerStyle: {
                backgroundColor: colors.light.secondary,
              },
              headerTintColor: 'white',
              drawerActiveTintColor: 'white',
              drawerInactiveTintColor: 'white',
            }}>
            {/* Home should not appear on the drawer*/}
            <Drawer.Screen
              name={getString('app_name')}
              component={Home}
              options={{
                drawerItemStyle: {display: 'none'},
              }}
            />
            {/* Routine should not appear on the drawer, and should have the back button */}
            <Drawer.Screen
              name={getString('screen_routine')}
              component={Routine}
              options={{
                drawerItemStyle: {display: 'none'},
                headerLeft: DrawerHeaderBackButton,
              }}
            />
            <Drawer.Screen
              name={getString('screen_events')}
              component={Routines}
              options={{
                headerLeft: DrawerHeaderBackButton,
              }}
            />
            <Drawer.Screen
              name={getString('screen_settings')}
              component={Settings}
              options={{
                headerLeft: DrawerHeaderBackButton,
              }}
            />
            <Drawer.Screen
              name={getString('screen_about')}
              component={About}
              options={{
                headerLeft: DrawerHeaderBackButton,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </CurrentSlotProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.light.secondary,
  },
});

export default App;
