import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadState = () => {
  try {
    const serializedState = AsyncStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    AsyncStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('savestate error ' + err);
  }
};
