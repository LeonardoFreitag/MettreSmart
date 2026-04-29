import { ItemModel } from '../../../models/ItemModel';
import {
  ItemSelectedState,
  ItemSelectedActionsTypes,
  ItemSelectedTypes,
} from './types';

const INITIAL_STATE: ItemSelectedState = {
  data: {} as ItemModel,
};

export default function CustomerReducer(
  state = INITIAL_STATE,
  action: ItemSelectedActionsTypes,
): ItemSelectedState {
  switch (action.type) {
    case ItemSelectedTypes.CREATE_ITEMSELECTED_REQUEST:
      return {
        data: action.payload.itemSelected,
      };
    case ItemSelectedTypes.UPDATE_ITEMSELECTED_REQUEST: {
      const data = action.payload.itemSelected;
      return { data };
    }
    case ItemSelectedTypes.DELETE_ITEMSELECTED_REQUEST: {
      const data = {} as ItemModel;
      return { data };
    }
    default:
      return state;
  }
}
