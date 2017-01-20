/**
 * Created by ebinhon on 1/19/2017.
 */
'use strict';
import 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'
import {ID_TOKEN} from '../constants/TokenTypes'

export function checkStatus(response) {
  if (!response.ok) {   // (response.status < 200 || response.status > 300)
    const error = new Error(response.status, response.statusText);
    error.response = response;
    throw error
  }
  return response
}

export function parseJSON(response) {
  return response.json()
}

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
export function callAPI(url, config, request, onRequestSuccess, onRequestFailure) {
  return dispatch => {
    dispatch(request);
    return fetch(url, config)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        dispatch(onRequestSuccess(json))
      }).catch(error => {
        console.info(error)
        const response = error.response;
        if (response === undefined) {
          dispatch(onRequestFailure(error))
        } else {
          error.status = response.status;
          error.statusText = response.statusText;
          response.text().then(text => {
            try {
              const json = JSON.parse(text);
              error.message = json.message
            } catch (ex) {
              error.message = text
            }
            dispatch(onRequestFailure(error))
          })
        }
      })
  }
}

export function setIdToken(idToken) {
  sessionStorage.setItem(ID_TOKEN, idToken)
}

export function removeIdToken() {
  sessionStorage.removeItem(ID_TOKEN)
}

export function loadIdToken() {
  return sessionStorage.getItem(ID_TOKEN)
}

export function decodeUserProfile(idToken) {
  try {
    return jwtDecode(idToken)
  } catch (err) {
    return null
  }
}

export function loadUserProfile() {
  try {
    const idToken = sessionStorage.getItem(ID_TOKEN);
    const userProfile = jwtDecode(idToken);
    const now = new Date().getTime() / 1000;   // Date().getTime() returns milliseconds.
    // So divide by 1000 to get seconds
    if (now > userProfile.exp) {
      // user profile has expired.
      removeIdToken();
      return null
    }
    return userProfile
  } catch (err) {
    return null
  }
}
