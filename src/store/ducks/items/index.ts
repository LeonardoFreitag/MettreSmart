import { ItemModel } from '../../../models/ItemModel';
import { ItemState, ItemActionsTypes, ItemTypes } from './types';

const INITIAL_STATE: ItemState = {
  data: [],
};

export default function ProductReducer(
  state = INITIAL_STATE,
  action: ItemActionsTypes,
): ItemState {
  switch (action.type) {
    case ItemTypes.CREATE_ITEM_REQUEST:
      return {
        data: [...state.data, action.payload.item],
      };
    case ItemTypes.UPDATE_ITEM_REQUEST: {
      const data = state.data.map(product =>
        product.id === action.payload.item.id ? action.payload.item : product,
      );
      return { data };
    }
    case ItemTypes.DELETE_ITEM_REQUEST: {
      const data = state.data.filter(
        product => product.id !== action.payload.item.id,
      );
      return { data };
    }
    case ItemTypes.CLEAN_ITEM_REQUEST: {
      const data = [] as ItemModel[];
      return { data };
    }
    default:
      return state;
  }
}
