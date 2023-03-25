import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import userInfoSlice from "./Slices/userInfoSlice"
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
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
    },
    middleware:getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
})
export const persistor = persistStore(store)