import { GroupModel } from '../../../models/GroupModel';
import { GroupSelectedActionsTypes, GroupSelectedTypes } from './types';

export function createGroupSelected(
  groupSelected: GroupModel,
): GroupSelectedActionsTypes {
  return {
    type: GroupSelectedTypes.CREATE_GROUPSELECTED_REQUEST,
    payload: { groupSelected },
  };
}

export function updateGroupSelected(
  groupSelected: GroupModel,
): GroupSelectedActionsTypes {
  return {
    type: GroupSelectedTypes.UPDATE_GROUPSELECTED_REQUEST,
    payload: { groupSelected },
  };
}

export function deleteGroupSelected(
  groupSelected: GroupModel,
): GroupSelectedActionsTypes {
  return {
    type: GroupSelectedTypes.DELETE_GROUPSELECTED_REQUEST,
    payload: { groupSelected },
  };
}
