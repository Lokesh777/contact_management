import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import dataReducer from '../features/Chart/dataSlice';
import contactReducer from '../features/contacts/contactSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedDataReducer = persistReducer(persistConfig, dataReducer);
const persistedContactReducer = persistReducer(persistConfig, contactReducer);

export const store = configureStore({
  reducer: {
    data: persistedDataReducer,
    contacts: persistedContactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['persist.persistedState'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
