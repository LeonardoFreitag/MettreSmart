import { CallLoadStorageModel } from '../../../models/CallLoadStorageModel';
import { CallLoadStorageActionsTypes, CallLoadStorageTypes } from './types';

export function createCallLoadStorage(
  callLoadStorage: CallLoadStorageModel,
): CallLoadStorageActionsTypes {
  return {
    type: CallLoadStorageTypes.CREATE_CALLLOADSTORAGE_REQUEST,
    payload: { callLoadStorage },
  };
}

export function updateCallLoadStorage(
  callLoadStorage: CallLoadStorageModel,
): CallLoadStorageActionsTypes {
  return {
    type: CallLoadStorageTypes.UPDATE_CALLLOADSTORAGE_REQUEST,
    payload: { callLoadStorage },
  };
}

export function deleteCallLoadStorage(
  callLoadStorage: CallLoadStorageModel,
): CallLoadStorageActionsTypes {
  return {
    type: CallLoadStorageTypes.DELETE_CALLLOADSTORAGE_REQUEST,
    payload: { callLoadStorage },
  };
}
