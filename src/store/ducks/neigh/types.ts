import { NeighModel } from '../../../models/NeighModel';
/*
 * actiontpes
 */
export enum NeighTypes {
  CREATE_NEIGH_REQUEST = '@neigh/CREATE_NEIGH_REQUEST',
  UPDATE_NEIGH_REQUEST = '@neigh/UPDATE_NEIGH_REQUEST',
  DELETE_NEIGH_REQUEST = '@neigh/DELETE_NEIGH_REQUEST',
  CLEAN_NEIGH_REQUEST = '@neigh/CLEAN_NEIGH_REQUEST',
}

/*
 * state types
 */
export interface NeighState {
  readonly data: NeighModel[];
}

// export const CREATE_NEIGH_REQUEST = '@neigh/CREATE_NEIGH_REQUEST';
interface CreateNeighRequest {
  type: NeighTypes.CREATE_NEIGH_REQUEST; // typeof CREATE_NEIGH_REQUEST;
  payload: { neigh: NeighModel };
}

// export const UPDATE_NEIGH_REQUEST = '@neigh/UPDATE_NEIGH_REQUEST';
interface UpdateNeighRequest {
  type: NeighTypes.UPDATE_NEIGH_REQUEST;
  payload: { neigh: NeighModel };
}
// export const DELETE_NEIGH_REQUEST = '@neigh/DELETE_NEIGH_REQUEST';
interface DeleteNeighRequest {
  type: NeighTypes.DELETE_NEIGH_REQUEST;
  payload: { neigh: NeighModel };
}

interface CleanNeighRequest {
  type: NeighTypes.CLEAN_NEIGH_REQUEST;
  payload: { neigh: NeighModel };
}

export type NeighActionsTypes =
  | CreateNeighRequest
  | UpdateNeighRequest
  | DeleteNeighRequest
  | CleanNeighRequest;
