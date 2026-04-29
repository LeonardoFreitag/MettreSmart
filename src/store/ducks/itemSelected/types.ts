import { ItemModel } from '../../../models/ItemModel';
/*
 * actiontpes
 */
export enum ItemSelectedTypes {
  CREATE_ITEMSELECTED_REQUEST = '@itemSelected/CREATE_ITEMSELECTED_REQUEST',
  UPDATE_ITEMSELECTED_REQUEST = '@itemSelected/UPDATE_ITEMSELECTED_REQUEST',
  DELETE_ITEMSELECTED_REQUEST = '@itemSelected/DELETE_ITEMSELECTED_REQUEST',
}

/*
 * state types
 */
export interface ItemSelectedState {
  readonly data: ItemModel;
}

// export const CREATE_ITEMSELECTED_REQUEST = '@itemSelected/CREATE_ITEMSELECTED_REQUEST';
interface CreateItemSelectedRequest {
  type: ItemSelectedTypes.CREATE_ITEMSELECTED_REQUEST; // typeof CREATE_ITEMSELECTED_REQUEST;
  payload: { itemSelected: ItemModel };
}

// export const UPDATE_ITEMSELECTED_REQUEST = '@itemSelected/UPDATE_ITEMSELECTED_REQUEST';
interface UpdateItemSelectedRequest {
  type: ItemSelectedTypes.UPDATE_ITEMSELECTED_REQUEST;
  payload: { itemSelected: ItemModel };
}
// export const DELETE_ITEMSELECTED_REQUEST = '@itemSelected/DELETE_ITEMSELECTED_REQUEST';
interface DeleteItemSelectedRequest {
  type: ItemSelectedTypes.DELETE_ITEMSELECTED_REQUEST;
  payload: { itemSelected: ItemModel };
}

export type ItemSelectedActionsTypes =
  | CreateItemSelectedRequest
  | UpdateItemSelectedRequest
  | DeleteItemSelectedRequest;
