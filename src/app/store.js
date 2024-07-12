import { configureStore} from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';
import expensesSlice from './expenseSlice';

export default configureStore({
  reducer: {
    authenticationSlice: authenticationSlice,
    expensesSlice: expensesSlice

  }
});
