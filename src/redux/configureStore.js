// import { configureStore } from "@reduxjs/toolkit";
// import profileReducer from "./features/profile/profileSlice";
// import { loadState, saveState } from "./localStorage";

// const configureAppStore = async () => {
//   const preloadedState = await loadState();
//   const store = configureStore({
//     reducer: {
//       profile: profileReducer,
//     },
//     preloadedState,
//   });

//   store.subscribe(() => {
//     saveState(store.getState());
//   });

//   return store;
// };

// export default configureAppStore;
