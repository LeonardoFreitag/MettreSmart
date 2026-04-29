import { ItemModel } from '../../../models/ItemModel';
/*
 * actiontpes
 */
export enum ItemTypes {
  CREATE_ITEM_REQUEST = '@item/CREATE_ITEM_REQUEST',
  UPDATE_ITEM_REQUEST = '@item/UPDATE_ITEM_REQUEST',
  DELETE_ITEM_REQUEST = '@item/DELETE_ITEM_REQUEST',
  CLEAN_ITEM_REQUEST = '@item/CLEAN_ITEM_REQUEST',
}

/*
 * state types
 */
export interface ItemState {
  readonly data: ItemModel[];
}

// export const CREATE_ITEM_REQUEST = '@item/CREATE_ITEM_REQUEST';
interface CreateItemRequest {
  type: ItemTypes.CREATE_ITEM_REQUEST; // typeof CREATE_ITEM_REQUEST;
  payload: { item: ItemModel };
}

// export const UPDATE_ITEM_REQUEST = '@item/UPDATE_ITEM_REQUEST';
interface UpdateItemRequest {
  type: ItemTypes.UPDATE_ITEM_REQUEST;
  payload: { item: ItemModel };
}
// export const DELETE_ITEM_REQUEST = '@item/DELETE_ITEM_REQUEST';
interface DeleteItemRequest {
  type: ItemTypes.DELETE_ITEM_REQUEST;
  payload: { item: ItemModel };
}

interface CleanItemRequest {
  type: ItemTypes.CLEAN_ITEM_REQUEST;
  payload: { item: ItemModel };
}

export type ItemActionsTypes =
  | CreateItemRequest
  | UpdateItemRequest
  | DeleteItemRequest
  | CleanItemRequest;
