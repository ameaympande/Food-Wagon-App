import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = async state => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('savestate error ' + err);
  }
};
