// src/redux/reducers.ts
import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from '@/redux/features/themeSlice';


export const rootReducer = combineReducers({
  theme: themeReducer
});

export type RootReducer = ReturnType<typeof rootReducer>;