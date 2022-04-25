import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: "enablers-nft",
      storage,
      whitelist: ["wallet"]
    },
    reducers
  );
  return persistedReducers;
};
