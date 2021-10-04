import { createReducer, on } from '@ngrx/store';

export const initialState = [];

const _storageReducer = createReducer(initialState);

export function storageReducer(state, action) {
  return _storageReducer(state, action);
}
