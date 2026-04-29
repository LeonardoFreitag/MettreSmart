import { CallNeighModel } from '../../../models/CallNeighModel';
/*
 * actiontpes
 */
export enum CallNeighTypes {
  CREATE_CALLNEIGH_REQUEST = '@callNeigh/CREATE_CALLNEIGH_REQUEST',
  UPDATE_CALLNEIGH_REQUEST = '@callNeigh/UPDATE_CALLNEIGH_REQUEST',
  DELETE_CALLNEIGH_REQUEST = '@callNeigh/DELETE_CALLNEIGH_REQUEST',
}

/*
 * state types
 */
export interface CallNeighState {
  readonly data: CallNeighModel;
}

// export const CREATE_CALLNEIGH_REQUEST = '@callNeigh/CREATE_CALLNEIGH_REQUEST';
interface CreateCallNeighRequest {
  type: CallNeighTypes.CREATE_CALLNEIGH_REQUEST; // typeof CREATE_CALLNEIGH_REQUEST;
  payload: { callNeigh: CallNeighModel };
}

// export const UPDATE_CALLNEIGH_REQUEST = '@callNeigh/UPDATE_CALLNEIGH_REQUEST';
interface UpdateCallNeighRequest {
  type: CallNeighTypes.UPDATE_CALLNEIGH_REQUEST;
  payload: { callNeigh: CallNeighModel };
}
// export const DELETE_CALLNEIGH_REQUEST = '@callNeigh/DELETE_CALLNEIGH_REQUEST';
interface DeleteCallNeighRequest {
  type: CallNeighTypes.DELETE_CALLNEIGH_REQUEST;
  payload: { callNeigh: CallNeighModel };
}

export type CallNeighActionsTypes =
  | CreateCallNeighRequest
  | UpdateCallNeighRequest
  | DeleteCallNeighRequest;
