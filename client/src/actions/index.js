
import axios from 'axios';
import { browserHistory } from 'react-router';
import { UNAUTH_USER,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_POLLS,
  FETCH_POLLS_BY_ID,
  FETCH_POLL,
  SEND_VOTE,
  NEW_POLL,
  DELETE_POLL,
  FETCH_IP
} from './types';

const ROOT_URL = 'https://fcc-voting-app-pedropalomo.c9users.io:8081';

export function signinUser({ email, password }) {
    return function(dispatch) {

        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER, payload: {user: email} });
                localStorage.setItem('token', response.data.token);
                var parameters = { email, password };
                localStorage.setItem('user', parameters.email);
                browserHistory.push('/feature');
            })
            .catch(() => {
                dispatch(authError('bad login info'));
            })
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {

        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                
                dispatch({ type: AUTH_USER, payload: {user: email} });
                localStorage.setItem('token', response.data.token);
                var parameters = { email, password };
                localStorage.setItem('user', parameters.email);
                browserHistory.push('/feature');
            })
            .catch(response => {
                dispatch(authError(response.data.error))}
            )
    }
}

export function authError(error) {
    
 return {
     type: AUTH_ERROR,
     payload: error
 }
}

export function signoutUser() {
 localStorage.removeItem('token');
 localStorage.removeItem('user');
 return { type: UNAUTH_USER };
}

export function fetchMessage() {
      return function(dispatch) {

        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                
                dispatch({ 
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                });
                
            })
    } 
}

export function fetchPolls () {
    
    return function(dispatch) {
        axios.post(`${ROOT_URL}/fetch_polls`)
            .then(response => {
                dispatch({ type: FETCH_POLLS,
                           payload: response.data});
            })
            .catch(() => {
                dispatch(authError('error: fetch_polls'));
            })
    }
}

export function fetchPollsById (id) {
    
    return function(dispatch) {
        axios.post(`${ROOT_URL}/fetch_polls_by_id`, {user: id})
            .then(response => {
                dispatch({ type: FETCH_POLLS,
                           payload: response.data});
            })
            .catch(() => {
                dispatch(authError('error: fetch_polls'));
            })
    }
}

export function fetchPoll (id) {

    return function(dispatch) {
       axios.post(`${ROOT_URL}/fetch_poll`, {id: id})
            .then(response => {
                dispatch({ type: FETCH_POLL,
                           payload: response.data.docs[0]});
            })
            .catch(() => {
                dispatch(authError('error: fetch_polls'));
            })
    }
}

export function sendVote (id, option, user) {

   return function(dispatch) {
        axios.post(`${ROOT_URL}/vote_poll`, {id: id, option: option, user: user})
            .then(response => {
                dispatch({ type: SEND_VOTE,
                           payload: response.data.poll[0]});
            })
            .catch(() => {
                dispatch(authError('error: sendVote'));
            })
    }
}

export function newPoll (user, option) {
    
  console.log("newPoll: ",user, option);    

  var options_array = option.options.split(',');

  return function(dispatch) {

        axios.post(`${ROOT_URL}/create_poll`, {title: option.title, options: options_array, user: user})
            .then(response => {
                dispatch({ type: NEW_POLL,
                          payload: response.data});
                browserHistory.push('/polls');
            })
            .catch(() => {
                dispatch(authError('error: newPoll'));
            })
    }
}

export function deletePoll (user, id) {

    return function(dispatch) {
       axios.post(`${ROOT_URL}/delete_poll`, {id: id})
            .then(response => {
                dispatch({ type: DELETE_POLL,
                           payload: response.data});

                browserHistory.push('/polls');
            })
            .catch(() => {
                dispatch(authError('error: delete_poll'));
            })
    }
}

export function fetchIP () {

    return function(dispatch) {
       axios.post(`${ROOT_URL}/fetch_ip`)
            .then(response => {
                dispatch({ type: FETCH_IP,
                           payload: response.data.result});
            })
            .catch(() => {
                dispatch(authError('error: fetch_IP'));
            })
    }
}