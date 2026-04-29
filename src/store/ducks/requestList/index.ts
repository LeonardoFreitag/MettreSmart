import {
  RequestListState,
  RequestListActionsTypes,
  RequestListTypes,
} from './types';

const INITIAL_STATE: RequestListState = {
  data: [],
};

export default function RequestListReducer(
  state = INITIAL_STATE,
  action: RequestListActionsTypes,
): RequestListState {
  switch (action.type) {
    case RequestListTypes.CREATE_REQUESTLIST_REQUEST:
      return {
        data: [...state.data, action.payload.requestList],
      };
    case RequestListTypes.UPDATE_REQUESTLIST_REQUEST: {
      const data = state.data.map(requestList =>
        requestList.id === action.payload.requestList.id
          ? action.payload.requestList
          : requestList,
      );
      return { data };
    }
    case RequestListTypes.DELETE_REQUESTLIST_REQUEST: {
      const data = state.data.filter(
        requestList => requestList.id !== action.payload.requestList.id,
      );
      return { data };
    }
    default:
      return state;
  }
}
