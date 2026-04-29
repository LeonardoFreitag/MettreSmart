import { EdgeModel } from '../../../models/EdgeModel';
/*
 * actiontpes
 */
export enum EdgeTypes {
  CREATE_EDGE_REQUEST = '@edge/CREATE_EDGE_REQUEST',
  UPDATE_EDGE_REQUEST = '@edge/UPDATE_EDGE_REQUEST',
  DELETE_EDGE_REQUEST = '@edge/DELETE_EDGE_REQUEST',
  CLEAN_EDGE_REQUEST = '@edge/CLEAN_EDGE_REQUEST',
}

/*
 * state types
 */
export interface EdgeState {
  readonly data: EdgeModel[];
}

// export const CREATE_EDGE_REQUEST = '@edge/CREATE_EDGE_REQUEST';
interface CreateEdgeRequest {
  type: EdgeTypes.CREATE_EDGE_REQUEST; // typeof CREATE_EDGE_REQUEST;
  payload: { edge: EdgeModel };
}

// export const UPDATE_EDGE_REQUEST = '@edge/UPDATE_EDGE_REQUEST';
interface UpdateEdgeRequest {
  type: EdgeTypes.UPDATE_EDGE_REQUEST;
  payload: { edge: EdgeModel };
}
// export const DELETE_EDGE_REQUEST = '@edge/DELETE_EDGE_REQUEST';
interface DeleteEdgeRequest {
  type: EdgeTypes.DELETE_EDGE_REQUEST;
  payload: { edge: EdgeModel };
}

interface CleanEdgeRequest {
  type: EdgeTypes.CLEAN_EDGE_REQUEST;
  payload: { edge: EdgeModel };
}

export type EdgeActionsTypes =
  | CreateEdgeRequest
  | UpdateEdgeRequest
  | DeleteEdgeRequest
  | CleanEdgeRequest;
