import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import ButtonBack from './components/ButtonBack';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from './values/colors';
import Home from './screens/Home';
import Routine from './screens/Routine';
import Routines from './screens/Routines';
import Settings from './screens/Settings';
import About from './screens/About';
import {useString} from './context/useStringContext';

export enum SCREENS {
  HOME = 'Home',
  ROUTINE = 'Routine',
  ROUTINES = 'Routines',
  SETTINGS = 'Settings',
  ABOUT = 'About',
}

export type RootStackParamList = {
  Splash: {} | undefined;
  Home: {} | undefined;
  Routine: {event: Event} | undefined;
};

const Drawer = createDrawerNavigator();

function DrawerHeaderBackButton() {
  return <ButtonBack />;
}

export default function Router() {
  const {language, getString} = useString();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        backBehavior="history"
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
          name={SCREENS.HOME}
          component={Home}
          options={{
            drawerItemStyle: {display: 'none'},
            title: getString('app_name'),
          }}
        />
        {/* Routine should not appear on the drawer, and should have the back button */}
        <Drawer.Screen
          name={SCREENS.ROUTINE}
          component={Routine}
          options={{
            drawerItemStyle: {display: 'none'},
            headerLeft: DrawerHeaderBackButton,
            title: getString('screen_routine'),
          }}
        />
        <Drawer.Screen
          name={SCREENS.ROUTINES}
          component={Routines}
          options={{
            headerLeft: DrawerHeaderBackButton,
            title: getString('screen_events'),
          }}
        />
        <Drawer.Screen
          name={getString('screen_settings')}
          component={Settings}
          options={{
            headerLeft: DrawerHeaderBackButton,
            title: getString('screen_settings'),
          }}
        />
        <Drawer.Screen
          name={getString('screen_about')}
          component={About}
          options={{
            headerLeft: DrawerHeaderBackButton,
            title: getString('screen_about'),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
