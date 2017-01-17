import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route,  IndexRoute,  browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import reducers from './reducers';
import requireAuth from './components/require_auth';
import Welcome from './components/welcome';
import Polls from './components/poll_list';
import PollsID from './components/poll_list_id';
import Poll from './components/poll_show';
import NewPoll from './components/poll_new';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');


if (token) {
  store.dispatch({ type: AUTH_USER, payload: {user: user }});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="feature" component={requireAuth(Feature)} />
        <Route path="polls" component={Polls} />
        <Route path="polls_id/:id" component={PollsID} />
        <Route path="poll/:id" component={Poll} />
        <Route path="newpoll" component={NewPoll} />
      </Route>
    </Router>
  </Provider>, document.querySelector('.container'));

