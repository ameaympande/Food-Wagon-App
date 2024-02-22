import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {Text} from 'react-native';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </>
  );
};

export default App;
