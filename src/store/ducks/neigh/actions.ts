import { NeighModel } from '../../../models/NeighModel';
import { NeighActionsTypes, NeighTypes } from './types';

export function createNeigh(neigh: NeighModel): NeighActionsTypes {
  return {
    type: NeighTypes.CREATE_NEIGH_REQUEST,
    payload: { neigh },
  };
}

export function updateNeigh(neigh: NeighModel): NeighActionsTypes {
  return {
    type: NeighTypes.UPDATE_NEIGH_REQUEST,
    payload: { neigh },
  };
}

export function deleteNeigh(neigh: NeighModel): NeighActionsTypes {
  return {
    type: NeighTypes.DELETE_NEIGH_REQUEST,
    payload: { neigh },
  };
}

export function cleanNeigh(neigh: NeighModel): NeighActionsTypes {
  return {
    type: NeighTypes.CLEAN_NEIGH_REQUEST,
    payload: { neigh },
  };
}
