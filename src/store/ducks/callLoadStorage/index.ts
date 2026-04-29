import { CallLoadStorageModel } from '../../../models/CallLoadStorageModel';
import {
  CallLoadStorageState,
  CallLoadStorageActionsTypes,
  CallLoadStorageTypes,
} from './types';

const INITIAL_STATE: CallLoadStorageState = {
  data: {} as CallLoadStorageModel,
};

export default function CustomerReducer(
  state = INITIAL_STATE,
  action: CallLoadStorageActionsTypes,
): CallLoadStorageState {
  switch (action.type) {
    case CallLoadStorageTypes.CREATE_CALLLOADSTORAGE_REQUEST:
      return {
        data: action.payload.callLoadStorage,
      };
    case CallLoadStorageTypes.UPDATE_CALLLOADSTORAGE_REQUEST: {
      const data = action.payload.callLoadStorage;
      return { data };
    }
    case CallLoadStorageTypes.DELETE_CALLLOADSTORAGE_REQUEST: {
      const data = {} as CallLoadStorageModel;
      return { data };
    }
    default:
      return state;
  }
}
