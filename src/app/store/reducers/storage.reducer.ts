import { createReducer, on } from '@ngrx/store';
import { keepInStorage } from '../actions/storage.actions';

export const initialState = {
  scans: [],
};
// eslint-disable-next-line no-underscore-dangle
const _storageReducer = createReducer(
  initialState,
  // eslint-disable-next-line ngrx/on-function-explicit-return-type
  on(keepInStorage, (state, { payload }) => ({
    ...state,
    scans: [payload, ...state.scans],
  }))
);

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function storageReducer(state, action) {
  return _storageReducer(state, action);
}
