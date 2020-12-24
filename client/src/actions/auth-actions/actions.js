/*
@
 This file contains the actions creators
@
*/

import {
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_EXPERT_SUCCESS,
  SIGNUP_ERROR,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILURE,
  GET_AUTH_REQUEST,
  LOGOUT_REQUEST,
  CONNECT_THE_USER,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GET_USER,
  GET_USER_BY_ID
} from "./types";

import AuthServices from "./service";
export function getAuthUser() {
  return async dispatch => {
    await dispatch({
      type: GET_AUTH_REQUEST
    });
    try {
      const response = await AuthServices.getAuthUserRequest();
      console.log(response.data)
      await dispatch({
        type: GET_AUTH_SUCCESS,
        payload: {
          user: response.data.user,
          isLoggedIn: true
        }
      });
    } catch (e) {
      dispatch({
        type: GET_AUTH_FAILURE
      });
    }
  };
}

export const signin = (values) => {
  return async dispatch => {
    dispatch({ type: SIGNIN_REQUEST });
    try {
      const response = await AuthServices.signinRequest(values);
      await dispatch({ type: SIGNIN_SUCCESS, payload: response.data });
      localStorage.setItem("token", response.data.access_token);
    } catch (e) {
      dispatch({ type: SIGNIN_FAILURE });
      console.log(e.response.data.message, e);
      throw new Error(e.response.data.message);
    }
  };
}

export function signup(body) {
  return async dispatch => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
      const response = await AuthServices.signupRequest(body);
      console.log(response.data);
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
      localStorage.setItem("token", response.data.access_token);
    } catch (e) {
      dispatch({ type: SIGNUP_ERROR });
    }
  };
}
export function signupExpert(body) {
  return async dispatch => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
      const response = await AuthServices.signupExpertRequest(body);
      dispatch({ type: SIGNUP_EXPERT_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({ type: SIGNUP_ERROR });
    }
  };
}

export function logout() {
  return async dispatch => {
    dispatch({ type: LOGOUT_REQUEST });
    try {
      // await AuthServices.logoutRequest();
      localStorage.removeItem("token");
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (e) {
      dispatch({ type: LOGOUT_FAILURE });
    }
  };
}

export function connectTheUser(token) {
  return async dispatch => {
    localStorage.setItem("token", token);
    dispatch({
      type: CONNECT_THE_USER,
      payload: {
        token: token
      }
    });
  };
}

export function getUser() {
  return async dispatch => {
    dispatch({
      type: GET_USER
    })
  }
}
