import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GetStartedScreen from '../screens/GetStartedScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import HomeScreen from '../screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState('Getstarted');

  useEffect(() => {
    async function checkLaunchAndToken() {
      try {
        const appLaunched = await AsyncStorage.getItem('@appLaunched');
        if (appLaunched === null) {
          setInitialRouteName('Getstarted');
          await AsyncStorage.setItem('@appLaunched', 'true');
        } else {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            setInitialRouteName('Home');
          } else {
            setInitialRouteName('Login');
          }
        }
      } catch (error) {
        console.error('Error checking app launch status:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkLaunchAndToken();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Getstarted" component={GetStartedScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
