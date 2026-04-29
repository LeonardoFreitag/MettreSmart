import { ItemModel } from '../../../models/ItemModel';
import { ItemSelectedActionsTypes, ItemSelectedTypes } from './types';

export function createItemSelected(
  itemSelected: ItemModel,
): ItemSelectedActionsTypes {
  return {
    type: ItemSelectedTypes.CREATE_ITEMSELECTED_REQUEST,
    payload: { itemSelected },
  };
}

export function updateItemSelected(
  itemSelected: ItemModel,
): ItemSelectedActionsTypes {
  return {
    type: ItemSelectedTypes.UPDATE_ITEMSELECTED_REQUEST,
    payload: { itemSelected },
  };
}

export function deleteItemSelected(
  itemSelected: ItemModel,
): ItemSelectedActionsTypes {
  return {
    type: ItemSelectedTypes.DELETE_ITEMSELECTED_REQUEST,
    payload: { itemSelected },
  };
}
