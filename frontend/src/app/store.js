import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import themeReducer from "./theme/themSlice.js";
import userReducer from "./user/userSlice.jsx";

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
