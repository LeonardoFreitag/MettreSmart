import { FlavorModel } from '../../../models/FlavorModel';
import { FlavorState, FlavorActionsTypes, FlavorTypes } from './types';

const INITIAL_STATE: FlavorState = {
  data: [],
};

export default function FlavorReducer(
  state = INITIAL_STATE,
  action: FlavorActionsTypes,
): FlavorState {
  switch (action.type) {
    case FlavorTypes.CREATE_FLAVOR_REQUEST:
      return {
        data: [...state.data, action.payload.flavor],
      };
    case FlavorTypes.UPDATE_FLAVOR_REQUEST: {
      const data = state.data.map(flavor =>
        flavor.id === action.payload.flavor.id ? action.payload.flavor : flavor,
      );
      return { data };
    }
    case FlavorTypes.DELETE_FLAVOR_REQUEST: {
      const data = state.data.filter(
        flavor => flavor.id !== action.payload.flavor.id,
      );
      return { data };
    }
    case FlavorTypes.CLEAN_FLAVOR_REQUEST: {
      const data = [] as FlavorModel[];
      return { data };
    }
    default:
      return state;
  }
}
