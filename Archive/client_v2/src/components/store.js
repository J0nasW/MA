import { createStore } from "redux";
import containerReducer from "reducers/containerReducer";

function configureStore(state = { Container: true }) {
  return createStore(containerReducer,state);
}

export default configureStore;