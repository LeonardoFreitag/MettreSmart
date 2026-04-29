import { RequestModel } from '../../../models/RequestModel';
import { RequestState, RequestActionsTypes, RequestTypes } from './types';

const INITIAL_STATE: RequestState = {
  data: {} as RequestModel,
};

export default function CustomerReducer(
  state = INITIAL_STATE,
  action: RequestActionsTypes,
): RequestState {
  switch (action.type) {
    case RequestTypes.CREATE_REQUEST_REQUEST:
      return {
        data: action.payload.request,
      };
    case RequestTypes.UPDATE_REQUEST_REQUEST: {
      const data = action.payload.request;
      return { data };
    }
    case RequestTypes.DELETE_REQUEST_REQUEST: {
      const data = {} as RequestModel;
      return { data };
    }
    default:
      return state;
  }
}
