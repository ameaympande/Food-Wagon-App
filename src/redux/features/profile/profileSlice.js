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
    city: '',
    roles: 'customer',
  },
  reducers: {
    setProfile: (state, action) => {
      console.log(state + 'state inside slice');
      const {
        cartItems,
        userId,
        email,
        firstName,
        lastName,
        phoneNumber,
        address,
        city,
        roles,
      } = action.payload;
      state.cartItems = cartItems !== undefined ? cartItems : state.cartItems;
      state.userId = userId !== undefined ? userId : state.userId;
      state.email = email !== undefined ? email : state.email;
      state.firstName = firstName !== undefined ? firstName : state.firstName;
      state.lastName = lastName !== undefined ? lastName : state.lastName;
      state.phoneNumber =
        phoneNumber !== undefined ? phoneNumber : state.phoneNumber;
      state.address = address !== undefined ? address : state.address;
      state.city = city !== undefined ? city : state.city;
      state.roles = roles !== undefined ? roles : state.roles;
    },
    setCartItems: (state, action) => {
      const {_id} = action.payload;
      const existingItem = state.cartItems.find(item => item._id === _id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({...action.payload, quantity: 1});
      }
    },
    decrementCartItem: (state, action) => {
      const _id = action.payload;
      const existingItem = state.cartItems.find(item => item._id === _id);
      if (existingItem.quantity === 1)
        state.cartItems.splice(existingItemIndex, 1);
      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity -= 1;
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
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const {
  setProfile,
  decrementCartItem,
  replaceCartItems,
  setCartItems,
  setUserId,
  setEmail,
  setFirstName,
  setLastName,
  setPhoneNumber,
  setAddress,
  setCity,
  setRoles,
} = profileSlice.actions;

export const selectProfile = state => state.profile;

export default profileSlice.reducer;
