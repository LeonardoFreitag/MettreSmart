import { GroupModel } from '../../../models/GroupModel';
import {
  GroupSelectedState,
  GroupSelectedActionsTypes,
  GroupSelectedTypes,
} from './types';

const INITIAL_STATE: GroupSelectedState = {
  data: {} as GroupModel,
};

export default function GroupSelectedReducer(
  state = INITIAL_STATE,
  action: GroupSelectedActionsTypes,
): GroupSelectedState {
  switch (action.type) {
    case GroupSelectedTypes.CREATE_GROUPSELECTED_REQUEST:
      return {
        data: action.payload.groupSelected,
      };
    case GroupSelectedTypes.UPDATE_GROUPSELECTED_REQUEST: {
      const data = action.payload.groupSelected;
      return { data };
    }
    case GroupSelectedTypes.DELETE_GROUPSELECTED_REQUEST: {
      const data = {} as GroupModel;
      return { data };
    }
    default:
      return state;
  }
}
