import { GroupModel } from '../../../models/GroupModel';
/*
 * actiontpes
 */
export enum GroupSelectedTypes {
  CREATE_GROUPSELECTED_REQUEST = '@groupSelected/CREATE_GROUPSELECTED_REQUEST',
  UPDATE_GROUPSELECTED_REQUEST = '@groupSelected/UPDATE_GROUPSELECTED_REQUEST',
  DELETE_GROUPSELECTED_REQUEST = '@groupSelected/DELETE_GROUPSELECTED_REQUEST',
}

/*
 * state types
 */
export interface GroupSelectedState {
  readonly data: GroupModel;
}

// export const CREATE_GROUPSELECTED_REQUEST = '@groupSelected/CREATE_GROUPSELECTED_REQUEST';
interface CreateGroupSelectedRequest {
  type: GroupSelectedTypes.CREATE_GROUPSELECTED_REQUEST; // typeof CREATE_GROUPSELECTED_REQUEST;
  payload: { groupSelected: GroupModel };
}

// export const UPDATE_GROUPSELECTED_REQUEST = '@groupSelected/UPDATE_GROUPSELECTED_REQUEST';
interface UpdateGroupSelectedRequest {
  type: GroupSelectedTypes.UPDATE_GROUPSELECTED_REQUEST;
  payload: { groupSelected: GroupModel };
}
// export const DELETE_GROUPSELECTED_REQUEST = '@groupSelected/DELETE_GROUPSELECTED_REQUEST';
interface DeleteGroupSelectedRequest {
  type: GroupSelectedTypes.DELETE_GROUPSELECTED_REQUEST;
  payload: { groupSelected: GroupModel };
}

export type GroupSelectedActionsTypes =
  | CreateGroupSelectedRequest
  | UpdateGroupSelectedRequest
  | DeleteGroupSelectedRequest;
