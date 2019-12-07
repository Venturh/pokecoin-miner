import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { history } from './constants/History'
import reducer from './reducers/index';
import Login from './components/Login';
import Start from './components/Start';
import Mine from './components/Mine';
import AllCards from './components/AllCards';
import Packages from './components/Packages';
import Mining from './components/Mining';
import UserCards from './components/UserCards';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware)
  );

function App() {
  return (
    <Provider store={store}>
      <Router  history={history}>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/start" component={Start}/>
          <Route path="/mine" component={Mining}/>
          <Route path="/allcards" component={AllCards}/>
          <Route path="/cardpackages" component={Packages}/>
          <Route path="/mycards" component={UserCards}/>
          <Route path="/" component={Login}/>
          
        </Switch>
      </Router>

    </Provider>
  );
}

export default App;