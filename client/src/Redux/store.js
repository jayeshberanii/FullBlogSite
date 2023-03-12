import { configureStore } from "@reduxjs/toolkit"
import userInfoSlice from "./Slices/userInfoSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userInfoSlice)

export const store = configureStore({
    reducer: {
        userInfo: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: [thunk]
    }
})
export const persistor = persistStore(store)