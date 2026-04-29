import { GroupModel } from '../../../models/GroupModel';
import { GroupActionsTypes, GroupTypes } from './types';

export function createGroup(group: GroupModel): GroupActionsTypes {
  return {
    type: GroupTypes.CREATE_GROUP_REQUEST,
    payload: { group },
  };
}

export function updateGroup(group: GroupModel): GroupActionsTypes {
  return {
    type: GroupTypes.UPDATE_GROUP_REQUEST,
    payload: { group },
  };
}

export function deleteGroup(group: GroupModel): GroupActionsTypes {
  return {
    type: GroupTypes.DELETE_GROUP_REQUEST,
    payload: { group },
  };
}

export function cleanGroup(group: GroupModel): GroupActionsTypes {
  return {
    type: GroupTypes.CLEAN_GROUP_REQUEST,
    payload: { group },
  };
}
