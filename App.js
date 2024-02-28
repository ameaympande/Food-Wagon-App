import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/screens/Login';
import DrawerContent from './src/navigation/DrawerContent';
import initializeStore from './src/redux/store';
import store from './src/redux/store';

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={AppNavigator} />
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const setupStore = async () => {
      const store = await initializeStore();
      setStore(store);
    };

    setupStore();
  }, []);

  if (!store) {
    return null;
  }
  return (
    <>
      <Provider store={store}>
        <DrawerNav />
      </Provider>
    </>
  );
};

export default App;
