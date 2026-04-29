import { CallNeighModel } from '../../../models/CallNeighModel';
import { CallNeighActionsTypes, CallNeighTypes } from './types';

export function createItemSelected(
  callNeigh: CallNeighModel,
): CallNeighActionsTypes {
  return {
    type: CallNeighTypes.CREATE_CALLNEIGH_REQUEST,
    payload: { callNeigh },
  };
}

export function updateItemSelected(
  callNeigh: CallNeighModel,
): CallNeighActionsTypes {
  return {
    type: CallNeighTypes.UPDATE_CALLNEIGH_REQUEST,
    payload: { callNeigh },
  };
}

export function deleteItemSelected(
  callNeigh: CallNeighModel,
): CallNeighActionsTypes {
  return {
    type: CallNeighTypes.DELETE_CALLNEIGH_REQUEST,
    payload: { callNeigh },
  };
}
