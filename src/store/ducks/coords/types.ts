import { CoordsModel } from '../../../models/CoordsModel';
/*
 * actiontpes
 */
export enum CoordsTypes {
  CREATE_COORDS_REQUEST = '@coords/CREATE_COORDS_REQUEST',
  UPDATE_COORDS_REQUEST = '@coords/UPDATE_COORDS_REQUEST',
  DELETE_COORDS_REQUEST = '@coords/DELETE_COORDS_REQUEST',
}

/*
 * state types
 */
export interface CoordsState {
  readonly data: CoordsModel;
}

// export const CREATE_COORDS_REQUEST = '@coords/CREATE_COORDS_REQUEST';
interface CreateCoordsRequest {
  type: CoordsTypes.CREATE_COORDS_REQUEST; // typeof CREATE_COORDS_REQUEST;
  payload: { coords: CoordsModel };
}

// export const UPDATE_COORDS_REQUEST = '@coords/UPDATE_COORDS_REQUEST';
interface UpdateCoordsRequest {
  type: CoordsTypes.UPDATE_COORDS_REQUEST;
  payload: { coords: CoordsModel };
}
// export const DELETE_COORDS_REQUEST = '@coords/DELETE_COORDS_REQUEST';
interface DeleteCoordsRequest {
  type: CoordsTypes.DELETE_COORDS_REQUEST;
  payload: { coords: CoordsModel };
}

export type CoordsActionsTypes =
  | CreateCoordsRequest
  | UpdateCoordsRequest
  | DeleteCoordsRequest;
