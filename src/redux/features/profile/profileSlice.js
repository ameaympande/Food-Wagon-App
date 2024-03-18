import {createSlice} from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    cartItems: [],
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    roles: 'customer',
  },
  reducers: {
    setCartItems: (state, action) => {
      const {_id} = action.payload;
      const existingItem = state.cartItems.find(item => item._id === _id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({...action.payload, quantity: 1});
      }
    },
    replaceCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const {
  replaceCartItems,
  setCartItems,
  setUserId,
  setEmail,
  setFirstName,
  setLastName,
  setPhoneNumber,
  setAddress,
  setRoles,
} = profileSlice.actions;

export const selectProfile = state => state.profile;

export default profileSlice.reducer;
