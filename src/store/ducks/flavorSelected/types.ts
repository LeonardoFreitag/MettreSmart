import { FlavorModel } from '../../../models/FlavorModel';
/*
 * actiontpes
 */
export enum FlavorSelectedTypes {
  CREATE_FLAVORSELECTED_REQUEST = '@flavorSelected/CREATE_FLAVORSELECTED_REQUEST',
  UPDATE_FLAVORSELECTED_REQUEST = '@flavorSelected/UPDATE_FLAVORSELECTED_REQUEST',
  DELETE_FLAVORSELECTED_REQUEST = '@flavorSelected/DELETE_FLAVORSELECTED_REQUEST',
}

/*
 * state types
 */
export interface FlavorSelectedState {
  readonly data: FlavorModel;
}

// export const CREATE_FLAVORSELECTED_REQUEST = '@flavorSelected/CREATE_FLAVORSELECTED_REQUEST';
interface CreateFlavorSelectedRequest {
  type: FlavorSelectedTypes.CREATE_FLAVORSELECTED_REQUEST; // typeof CREATE_FLAVORSELECTED_REQUEST;
  payload: { flavorSelected: FlavorModel };
}

// export const UPDATE_FLAVORSELECTED_REQUEST = '@flavorSelected/UPDATE_FLAVORSELECTED_REQUEST';
interface UpdateFlavorSelectedRequest {
  type: FlavorSelectedTypes.UPDATE_FLAVORSELECTED_REQUEST;
  payload: { flavorSelected: FlavorModel };
}
// export const DELETE_FLAVORSELECTED_REQUEST = '@flavorSelected/DELETE_FLAVORSELECTED_REQUEST';
interface DeleteFlavorSelectedRequest {
  type: FlavorSelectedTypes.DELETE_FLAVORSELECTED_REQUEST;
  payload: { flavorSelected: FlavorModel };
}

export type FlavorSelectedActionsTypes =
  | CreateFlavorSelectedRequest
  | UpdateFlavorSelectedRequest
  | DeleteFlavorSelectedRequest;
