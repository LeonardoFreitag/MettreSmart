import { EdgeModel } from '../../../models/EdgeModel';
import { EdgeActionsTypes, EdgeTypes } from './types';

export function createEdge(edge: EdgeModel): EdgeActionsTypes {
  return {
    type: EdgeTypes.CREATE_EDGE_REQUEST,
    payload: { edge },
  };
}

export function updateEdge(edge: EdgeModel): EdgeActionsTypes {
  return {
    type: EdgeTypes.UPDATE_EDGE_REQUEST,
    payload: { edge },
  };
}

export function deleteEdge(edge: EdgeModel): EdgeActionsTypes {
  return {
    type: EdgeTypes.DELETE_EDGE_REQUEST,
    payload: { edge },
  };
}

export function cleanEdge(edge: EdgeModel): EdgeActionsTypes {
  return {
    type: EdgeTypes.CLEAN_EDGE_REQUEST,
    payload: { edge },
  };
}
