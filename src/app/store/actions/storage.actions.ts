import { createAction, props } from '@ngrx/store';

export const keepInStorage = createAction(
  '[Storage] Add QR',
  props<{ payload: any }>()
);
