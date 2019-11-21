import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import reducer from './reducers/index';
import Login from './components/Startpage/Login';
import Start from './components/Main/Start';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware)
  );

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Login />
        </div>
      </Router>

    </Provider>
  );
}

export default App;