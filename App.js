import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DrawerContent from './src/navigation/DrawerContent';
import initializeStore from './src/redux/store';

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={AppNavigator} />
    </Drawer.Navigator>
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
        <NavigationContainer>
          <DrawerNav />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
