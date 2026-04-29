import { FlavorModel } from '../../../models/FlavorModel';
import {
  FlavorSelectedState,
  FlavorSelectedActionsTypes,
  FlavorSelectedTypes,
} from './types';

const INITIAL_STATE: FlavorSelectedState = {
  data: {} as FlavorModel,
};

export default function CustomerReducer(
  state = INITIAL_STATE,
  action: FlavorSelectedActionsTypes,
): FlavorSelectedState {
  switch (action.type) {
    case FlavorSelectedTypes.CREATE_FLAVORSELECTED_REQUEST:
      return {
        data: action.payload.flavorSelected,
      };
    case FlavorSelectedTypes.UPDATE_FLAVORSELECTED_REQUEST: {
      const data = action.payload.flavorSelected;
      return { data };
    }
    case FlavorSelectedTypes.DELETE_FLAVORSELECTED_REQUEST: {
      const data = {} as FlavorModel;
      return { data };
    }
    default:
      return state;
  }
}
