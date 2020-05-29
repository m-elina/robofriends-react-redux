// Basis ist immer index.js
// react und index selbst importieren
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* import Card from './Card'; */ /* Component importieren, das nur einen return hat (in diesem Fall ein div), Modul unten einfügen, Modul-Datei erstellen (Card.js in diesem Fall) (wurde auskommentiert, weil in CardLIst uebertragen) */
import App from './containers/App' /* soll jetzt der Vater aller Components sein */
// import CardList from './CardList'; auskommentiert, weil wir jetzt die Vater-COmponent App haben
import * as serviceWorker from './serviceWorker'; /* hat den Hintergrund, dass native Apps im Web genutzt werden können */
import 'tachyons'; /* in diesem Fall installiertes css Toolkit, mit dem man einfache css-Abkürzungen benutzen kann*/
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import {searchRobots, requestRobots} from './reducers';
import thunkMiddleware from 'redux-thunk';

const logger= createLogger();

const rootReducer = combineReducers({searchRobots, requestRobots})

// actions go through middleware
// if there is a search term change:
/*  they go straight to reducer (no middleware)
/run there the function and update the store
/then make changes to our view */

// if there is a request: 
/* notice that its a function
/go through the middleware
/first just dispatch Pending to the reducer
/let you know when I'm done with the promise (and if there are any robots
/return: dispatch success, go through reducer, update store, make changes */
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
