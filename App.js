import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DrawerContent from './src/navigation/DrawerContent';
import initializeStore from './src/redux/store';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import {StatusBar, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon set

const toastConfig = {
  success: ({text1}) => (
    <View
      style={{
        backgroundColor: '#15de12',
        padding: 16,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons
        name="check"
        size={24}
        color="white"
        style={{marginRight: 10}}
      />
      <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
        {text1}
      </Text>
    </View>
  ),

  // Error Toast (Red & Exclamation Mark)
  error: ({text1}) => (
    <View
      style={{
        backgroundColor: '#F44336', // Material Red 500
        padding: 16,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons
        name="alert-circle"
        size={24}
        color="white"
        style={{marginRight: 10}}
      />
      <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
        {text1}
      </Text>
    </View>
  ),

  // Info Toast (Blue & Information Icon)
  info: ({text1}) => (
    <View
      style={{
        backgroundColor: '#2196F3', // Material Blue 500
        padding: 16,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons
        name="information"
        size={24}
        color="white"
        style={{marginRight: 10}}
      />
      <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
        {text1}
      </Text>
    </View>
  ),

  // Warning Toast (Orange & Caution Icon)
  warning: ({text1}) => (
    <View
      style={{
        backgroundColor: '#FF9800', // Material Orange 500
        padding: 16,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons
        name="alert-outline"
        size={24}
        color="white"
        style={{marginRight: 10}}
      />
      <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
        {text1}
      </Text>
    </View>
  ),
};

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
          <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />
          <DrawerNav />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
