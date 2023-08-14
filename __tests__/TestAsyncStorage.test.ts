import AsyncStorage from '@react-native-async-storage/async-storage';

it('checks if Async Storage is used', async () => {
  await AsyncStorage.getItem('myKey');

  expect(AsyncStorage.getItem).toBeCalledWith('myKey');
});
