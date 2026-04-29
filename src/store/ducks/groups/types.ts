import { GroupModel } from '../../../models/GroupModel';
/*
 * actiontpes
 */
export enum GroupTypes {
  CREATE_GROUP_REQUEST = '@group/CREATE_GROUP_REQUEST',
  UPDATE_GROUP_REQUEST = '@group/UPDATE_GROUP_REQUEST',
  DELETE_GROUP_REQUEST = '@group/DELETE_GROUP_REQUEST',
  CLEAN_GROUP_REQUEST = '@group/CLEAN_GROUP_REQUEST',
}

/*
 * state types
 */
export interface GroupState {
  readonly data: GroupModel[];
}

// export const CREATE_GROUP_REQUEST = '@group/CREATE_GROUP_REQUEST';
interface CreateGroupRequest {
  type: GroupTypes.CREATE_GROUP_REQUEST; // typeof CREATE_GROUP_REQUEST;
  payload: { group: GroupModel };
}

// export const UPDATE_GROUP_REQUEST = '@group/UPDATE_GROUP_REQUEST';
interface UpdateGroupRequest {
  type: GroupTypes.UPDATE_GROUP_REQUEST;
  payload: { group: GroupModel };
}
// export const DELETE_GROUP_REQUEST = '@group/DELETE_GROUP_REQUEST';
interface DeleteGroupRequest {
  type: GroupTypes.DELETE_GROUP_REQUEST;
  payload: { group: GroupModel };
}

interface CleanGroupRequest {
  type: GroupTypes.CLEAN_GROUP_REQUEST;
  payload: { group: GroupModel };
}

export type GroupActionsTypes =
  | CreateGroupRequest
  | UpdateGroupRequest
  | DeleteGroupRequest
  | CleanGroupRequest;
