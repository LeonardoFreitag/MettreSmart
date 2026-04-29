import { NeighModel } from '../../../models/NeighModel';
import { NeighState, NeighActionsTypes, NeighTypes } from './types';

const INITIAL_STATE: NeighState = {
  data: [],
};

export default function ProductReducer(
  state = INITIAL_STATE,
  action: NeighActionsTypes,
): NeighState {
  switch (action.type) {
    case NeighTypes.CREATE_NEIGH_REQUEST:
      return {
        data: [...state.data, action.payload.neigh],
      };
    case NeighTypes.UPDATE_NEIGH_REQUEST: {
      const data = state.data.map(product =>
        product.id === action.payload.neigh.id ? action.payload.neigh : product,
      );
      return { data };
    }
    case NeighTypes.DELETE_NEIGH_REQUEST: {
      const data = state.data.filter(
        product => product.id !== action.payload.neigh.id,
      );
      return { data };
    }
    case NeighTypes.CLEAN_NEIGH_REQUEST: {
      const data = [] as NeighModel[];
      return { data };
    }
    default:
      return state;
  }
}
