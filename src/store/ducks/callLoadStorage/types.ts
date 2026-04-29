import { CallLoadStorageModel } from '../../../models/CallLoadStorageModel';
/*
 * actiontpes
 */
export enum CallLoadStorageTypes {
  CREATE_CALLLOADSTORAGE_REQUEST = '@callLoadStorage/CREATE_CALLLOADSTORAGE_REQUEST',
  UPDATE_CALLLOADSTORAGE_REQUEST = '@callLoadStorage/UPDATE_CALLLOADSTORAGE_REQUEST',
  DELETE_CALLLOADSTORAGE_REQUEST = '@callLoadStorage/DELETE_CALLLOADSTORAGE_REQUEST',
}

/*
 * state types
 */
export interface CallLoadStorageState {
  readonly data: CallLoadStorageModel;
}

// export const CREATE_CALLLOADSTORAGE_REQUEST = '@callLoadStorage/CREATE_CALLLOADSTORAGE_REQUEST';
interface CreateCallLoadStorageRequest {
  type: CallLoadStorageTypes.CREATE_CALLLOADSTORAGE_REQUEST; // typeof CREATE_CALLLOADSTORAGE_REQUEST;
  payload: { callLoadStorage: CallLoadStorageModel };
}

// export const UPDATE_CALLLOADSTORAGE_REQUEST = '@callLoadStorage/UPDATE_CALLLOADSTORAGE_REQUEST';
interface UpdateCallLoadStorageRequest {
  type: CallLoadStorageTypes.UPDATE_CALLLOADSTORAGE_REQUEST;
  payload: { callLoadStorage: CallLoadStorageModel };
}
// export const DELETE_CALLLOADSTORAGE_REQUEST = '@callLoadStorage/DELETE_CALLLOADSTORAGE_REQUEST';
interface DeleteCallLoadStorageRequest {
  type: CallLoadStorageTypes.DELETE_CALLLOADSTORAGE_REQUEST;
  payload: { callLoadStorage: CallLoadStorageModel };
}

export type CallLoadStorageActionsTypes =
  | CreateCallLoadStorageRequest
  | UpdateCallLoadStorageRequest
  | DeleteCallLoadStorageRequest;
