import { ItemModel } from '../../../models/ItemModel';
import { ItemActionsTypes, ItemTypes } from './types';

export function createItem(item: ItemModel): ItemActionsTypes {
  return {
    type: ItemTypes.CREATE_ITEM_REQUEST,
    payload: { item },
  };
}

export function updateItem(item: ItemModel): ItemActionsTypes {
  return {
    type: ItemTypes.UPDATE_ITEM_REQUEST,
    payload: { item },
  };
}

export function deleteItem(item: ItemModel): ItemActionsTypes {
  return {
    type: ItemTypes.DELETE_ITEM_REQUEST,
    payload: { item },
  };
}

export function cleanItem(item: ItemModel): ItemActionsTypes {
  return {
    type: ItemTypes.CLEAN_ITEM_REQUEST,
    payload: { item },
  };
}
