import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { featuredApi } from 'services/featured/featuredApi';
import { onThisDayApi } from 'services/onthisday/onThisDayApi';

export const store = configureStore({
  reducer: {
    [onThisDayApi.reducerPath]: onThisDayApi.reducer,
    [featuredApi.reducerPath]: featuredApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(onThisDayApi.middleware).concat(featuredApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { useAppDispatch as useDispatch };
export { useAppSelector as useSelector };
