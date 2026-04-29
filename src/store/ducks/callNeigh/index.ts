import { CallNeighModel } from '../../../models/CallNeighModel';
import { CallNeighState, CallNeighActionsTypes, CallNeighTypes } from './types';

const INITIAL_STATE: CallNeighState = {
  data: {} as CallNeighModel,
};

export default function CustomerReducer(
  state = INITIAL_STATE,
  action: CallNeighActionsTypes,
): CallNeighState {
  switch (action.type) {
    case CallNeighTypes.CREATE_CALLNEIGH_REQUEST:
      return {
        data: action.payload.callNeigh,
      };
    case CallNeighTypes.UPDATE_CALLNEIGH_REQUEST: {
      const data = action.payload.callNeigh;
      return { data };
    }
    case CallNeighTypes.DELETE_CALLNEIGH_REQUEST: {
      const data = {} as CallNeighModel;
      return { data };
    }
    default:
      return state;
  }
}
