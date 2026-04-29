import { FlavorModel } from '../../../models/FlavorModel';
/*
 * actiontpes
 */
export enum FlavorTypes {
  CREATE_FLAVOR_REQUEST = '@flavor/CREATE_FLAVOR_REQUEST',
  UPDATE_FLAVOR_REQUEST = '@flavor/UPDATE_FLAVOR_REQUEST',
  DELETE_FLAVOR_REQUEST = '@flavor/DELETE_FLAVOR_REQUEST',
  CLEAN_FLAVOR_REQUEST = '@flavor/CLEAN_FLAVOR_REQUEST',
}

/*
 * state types
 */
export interface FlavorState {
  readonly data: FlavorModel[];
}

// export const CREATE_FLAVOR_REQUEST = '@flavor/CREATE_FLAVOR_REQUEST';
interface CreateFlavorRequest {
  type: FlavorTypes.CREATE_FLAVOR_REQUEST; // typeof CREATE_FLAVOR_REQUEST;
  payload: { flavor: FlavorModel };
}

// export const UPDATE_FLAVOR_REQUEST = '@flavor/UPDATE_FLAVOR_REQUEST';
interface UpdateFlavorRequest {
  type: FlavorTypes.UPDATE_FLAVOR_REQUEST;
  payload: { flavor: FlavorModel };
}
// export const DELETE_FLAVOR_REQUEST = '@flavor/DELETE_FLAVOR_REQUEST';
interface DeleteFlavorRequest {
  type: FlavorTypes.DELETE_FLAVOR_REQUEST;
  payload: { flavor: FlavorModel };
}

interface CleanFlavorRequest {
  type: FlavorTypes.CLEAN_FLAVOR_REQUEST;
  payload: { flavor: FlavorModel };
}

export type FlavorActionsTypes =
  | CreateFlavorRequest
  | UpdateFlavorRequest
  | DeleteFlavorRequest
  | CleanFlavorRequest;
