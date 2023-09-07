import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import CurrentSlotProvider from './src/context/currentSlotContext';
import {colors} from './src/values/colors';
import Router from './src/Router';
import StringsProvider from './src/context/useStringContext';

function App(): JSX.Element {
  //const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.appContainer}>
      <StringsProvider>
        <CurrentSlotProvider>
          <Router />
        </CurrentSlotProvider>
      </StringsProvider>
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
