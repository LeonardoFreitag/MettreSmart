import { EdgeModel } from '../../../models/EdgeModel';
import { EdgeState, EdgeActionsTypes, EdgeTypes } from './types';

const INITIAL_STATE: EdgeState = {
  data: [],
};

export default function EdgeReducer(
  state = INITIAL_STATE,
  action: EdgeActionsTypes,
): EdgeState {
  switch (action.type) {
    case EdgeTypes.CREATE_EDGE_REQUEST:
      return {
        data: [...state.data, action.payload.edge],
      };
    case EdgeTypes.UPDATE_EDGE_REQUEST: {
      const data = state.data.map(edge =>
        edge.codeEdge === action.payload.edge.codeEdge
          ? action.payload.edge
          : edge,
      );
      return { data };
    }
    case EdgeTypes.DELETE_EDGE_REQUEST: {
      const data = state.data.filter(
        edge => edge.codeEdge !== action.payload.edge.codeEdge,
      );
      return { data };
    }
    case EdgeTypes.CLEAN_EDGE_REQUEST: {
      const data = [] as EdgeModel[];
      return { data };
    }
    default:
      return state;
  }
}
