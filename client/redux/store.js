import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherReducer';
import recordReducer from './recordReducer';
import userReducer from './userReducer';


const store = configureStore({
  reducer: {
    weather: weatherReducer,
    record: recordReducer,
    user: userReducer,
  },
});

export default store;