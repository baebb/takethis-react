import {
  GET_PRODUCTS,
  SELECT_PRODUCT,
  GET_RECOMMENDS,
  AWAIT_NEW_RECOMMEND_RESPONSE,
  RECEIVE_NEW_RECOMMEND_RESPONSE,
  RECOMMEND_DISPLAY_MESSAGE,
  RECOMMEND_DISPLAY_ERROR,
  ATTEMPT_AUTH,
  AUTH_USER,
  AUTH_ERROR,
  SIGN_OUT_USER
} from './types';
import {browserHistory} from 'react-router';
import axios from 'axios';
import Firebase from 'firebase';

const LOCAL_SERVER_URL = 'http://localhost:5000';
const SERVER_URL = 'https://takethis-server.herokuapp.com';
const FIREBASE_URL = 'https://takethis-93203.firebaseio.com/';


const firebaseConfig = {
  apiKey: "AIzaSyBonhzdkZ6DeQYhSqSNLVjGfWlWGM6h9yI",
  authDomain: "takethis-93203.firebaseapp.com",
  databaseURL: "https://takethis-93203.firebaseio.com",
  storageBucket: "takethis-93203.appspot.com",
  messagingSenderId: "1036649018270"
};

Firebase.initializeApp(firebaseConfig);

const recommendsRef = Firebase.database().ref('recommends/');

export function getProducts(props) {
  const request = axios({
    method: 'POST',
    url: `${SERVER_URL}/products`,
    data: {
      "keyword": props.keyword,
      "category": props.category
    }
  })

  return {
    type: GET_PRODUCTS,
    payload: request
  }
}

export function selectProduct(props) {
  // console.log('action hit');
  // console.log(props);
  return {
    type: SELECT_PRODUCT,
    payload: props
  }
}

export function addRecommend(props) {
  // console.log('addRecommend hit');
  // console.log(props);
  return (dispatch, getState) => {
    const state = getState();
    //console.log(state);
    dispatch({type: AWAIT_NEW_RECOMMEND_RESPONSE});
    recommendsRef.push(props, (error) => {
      dispatch({type: RECEIVE_NEW_RECOMMEND_RESPONSE})
      if (error) {
        dispatch({type: RECOMMEND_DISPLAY_ERROR, error: "Submission failed!" + error});
      } else {
        dispatch({type: RECOMMEND_DISPLAY_MESSAGE, message: "Submission posted!"});
        browserHistory.push('/')
      }
    })
  }
}

export function getRecommends() {
  return (dispatch, getState) => {
    recommendsRef.on("value", (snapshot) => {
      dispatch({
        type: GET_RECOMMENDS,
        payload: snapshot.val()
      })
    })
  }
}

export function createUser(props) {
  return (dispatch) => {
    Firebase.database().ref(`users/${props.uid}`).once("value")
      .then((snapshot) => {
        if (!snapshot.exists()) {
          // console.log('create user: user does not exist')
          // console.log(props);
          Firebase.database().ref(`users/${props.uid}`).set({
            username: props.displayName || null,
            email: props.email,
            photoURL: props.photoURL || null
          })
        } else {
          // console.log('create user: user exists')
        }
      })
      .catch(error => {
        console.log('create user err', error)
        console.log(error)
      })
  }
}

export function signInUserOauth(prov) {
  return (dispatch) => {
    let provider;
    prov == 'twitter' && (provider = new Firebase.auth.TwitterAuthProvider());
    prov == 'facebook' && (provider = new Firebase.auth.FacebookAuthProvider());
    dispatch({type: ATTEMPT_AUTH});
    Firebase.auth().signInWithPopup(provider)
      .then((response) => {
        //console.log(response.user);
        dispatch(createUser(response.user));
        dispatch(authUser(response.user));
        browserHistory.push('/');
      })
      .catch((error) => {
        //console.log('error got ', error)
        dispatch(authError(error));
      })
  }
}

export function signUpUserEmail(creds) {
  return (dispatch) => {
    Firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password)
      .then((response) => {
        // console.log(response);
        dispatch(authUser(response.user));
        browserHistory.push('/');
      })
      .catch((error) => {
        dispatch(authError(error));
      })
  }
}

export function signInUser(creds) {
  return (dispatch) => {
    dispatch({type: ATTEMPT_AUTH});
    Firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
      .then((response) => {
        // console.log(response);
        dispatch(authUser(response));
        browserHistory.push('/');
      })
      .catch((error) => {
        dispatch(authError(error));
      })
  }
}

export function authUser(props) {
  // console.log(props);
  return {
    type: AUTH_USER,
    payload: {
      username: props.displayName || null,
      email: props.email,
      photoURL: props.photoURL || null
    }
  }
}

export function authError(error) {
  // console.log(error);
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signOutUser() {
  Firebase.auth().signOut();
  browserHistory.push('/login');

  return {
    type: SIGN_OUT_USER
  }
}

export function verifyAuth() {
  return function (dispatch) {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}
