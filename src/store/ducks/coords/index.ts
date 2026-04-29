import { CoordsModel } from '../../../models/CoordsModel';
import { CoordsState, CoordsActionsTypes, CoordsTypes } from './types';

const INITIAL_STATE: CoordsState = {
  data: {} as CoordsModel,
};

export default function CustomerReducer(
  state = INITIAL_STATE,
  action: CoordsActionsTypes,
): CoordsState {
  switch (action.type) {
    case CoordsTypes.CREATE_COORDS_REQUEST:
      return {
        data: action.payload.coords,
      };
    case CoordsTypes.UPDATE_COORDS_REQUEST: {
      const data = action.payload.coords;
      return { data };
    }
    case CoordsTypes.DELETE_COORDS_REQUEST: {
      const data = {} as CoordsModel;
      return { data };
    }
    default:
      return state;
  }
}
