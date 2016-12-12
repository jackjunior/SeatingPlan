import * as types from './actionTypes';
//import { CALL_API } from 'redux-api-middleware';

export function increment() {
  return {
    type: types.INCREMENT
  };
}

export function decrement() {
  return {
    type: types.DECREMENT
  };
}
