import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import StringsProvider, {useString} from '../../src/context/useStringContext';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';

import strings from '../../src/values/strings.json';

function TestComponent(): JSX.Element {
  const {language, getString, setLanguage} = useString();

  function updateLanguage(language: string) {
    setLanguage(language as 'en' | 'es' | 'pt');
  }

  return (
    <View testID="test-component">
      <Text testID="test-language">{language}</Text>
      <Text testID="test-string">{getString('test')}</Text>
      <TouchableOpacity
        testID="test-button-pt"
        onPress={() => updateLanguage('pt')}
      />
      <TouchableOpacity
        testID="test-button-es"
        onPress={() => updateLanguage('es')}
      />
    </View>
  );
}

describe('useStringContext tests', () => {
  it('should return the default language', () => {
    const {getByTestId} = render(
      <StringsProvider>
        <TestComponent />
      </StringsProvider>,
    );
    expect(getByTestId('test-language').children[0]).toBe('en');
  });

  it('should return the transalted string using the key', () => {
    const {getByTestId} = render(
      <StringsProvider>
        <TestComponent />
      </StringsProvider>,
    );
    expect(getByTestId('test-string').children[0]).toBe(strings.test.en);
  });

  it('should update the app language', async () => {
    const {getByTestId} = render(
      <StringsProvider>
        <TestComponent />
      </StringsProvider>,
    );
    expect(getByTestId('test-language').children[0]).toBe('en');
    expect(getByTestId('test-string').children[0]).toBe(strings.test.en);
    await act(async () => {
      fireEvent.press(getByTestId('test-button-pt'));
      await waitFor(() => {
        expect(getByTestId('test-language').children[0]).toBe('pt');
        expect(getByTestId('test-string').children[0]).toBe(strings.test.pt);
      });
    });
    await act(async () => {
      fireEvent.press(getByTestId('test-button-es'));
      await waitFor(() => {
        expect(getByTestId('test-language').children[0]).toBe('es');
        expect(getByTestId('test-string').children[0]).toBe(strings.test.es);
      });
    });
  });
});
