import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { loadState, saveState } from './localStorage';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const middleware = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

const persistedState = loadState();

// const store = createStore(rootReducers, enhancer);
const store = createStore(rootReducers, persistedState, enhancer);

store.subscribe(() => {
  const { getMyMovieListData, getTVGenres, getMovieGenres } = store.getState();

  saveState('state', {
    getMyMovieListData,
    getTVGenres,
    getMovieGenres
  });
})

// store.subscribe(() => {
//   const { getMyMovieListData } = store.getState();

//   saveState('getMyMovieListData', getMyMovieListData);
// });

export default store;
