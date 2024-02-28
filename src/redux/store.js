// initializeStore.js
import {configureStore} from '@reduxjs/toolkit';
import profileReducer from './features/profile/profileSlice';
import {loadState, saveState} from './localStorage';

const initializeStore = async () => {
  try {
    const preloadedState = await loadState();

    const store = configureStore({
      reducer: {
        profile: profileReducer,
      },
      preloadedState,
    });

    store.subscribe(() => {
      saveState(store.getState());
    });

    return store;
  } catch (error) {
    console.error('Error initializing store:', error);
    throw error;
  }
};

export default initializeStore;
