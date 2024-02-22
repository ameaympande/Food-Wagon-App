import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async key => {
  const data = await AsyncStorage.getItem(key);
  if (!data) {
    throw new Error(`Failed to get Async Redux Data for key: ${key}`);
  } else {
    return data;
  }
};
