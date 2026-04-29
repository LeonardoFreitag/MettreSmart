import { GroupModel } from '../../../models/GroupModel';
import { GroupState, GroupActionsTypes, GroupTypes } from './types';

const INITIAL_STATE: GroupState = {
  data: [],
};

export default function GroupReducer(
  state = INITIAL_STATE,
  action: GroupActionsTypes,
): GroupState {
  switch (action.type) {
    case GroupTypes.CREATE_GROUP_REQUEST:
      return {
        data: [...state.data, action.payload.group],
      };
    case GroupTypes.UPDATE_GROUP_REQUEST: {
      const data = state.data.map(group =>
        group.id === action.payload.group.id ? action.payload.group : group,
      );
      return { data };
    }
    case GroupTypes.DELETE_GROUP_REQUEST: {
      const data = state.data.filter(
        group => group.id !== action.payload.group.id,
      );
      return { data };
    }
    case GroupTypes.CLEAN_GROUP_REQUEST: {
      const data = [] as GroupModel[];
      return { data };
    }
    default:
      return state;
  }
}
