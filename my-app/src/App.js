import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { createStore } from 'redux';

import reducer from './reducers/index';
import Login from './components/Startpage/Login';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Login />
      </div>
    </Provider>
  );
}

export default App;