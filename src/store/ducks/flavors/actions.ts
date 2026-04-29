import { FlavorModel } from '../../../models/FlavorModel';
import { FlavorActionsTypes, FlavorTypes } from './types';

export function createFlavor(flavor: FlavorModel): FlavorActionsTypes {
  return {
    type: FlavorTypes.CREATE_FLAVOR_REQUEST,
    payload: { flavor },
  };
}

export function updateFlavor(flavor: FlavorModel): FlavorActionsTypes {
  return {
    type: FlavorTypes.UPDATE_FLAVOR_REQUEST,
    payload: { flavor },
  };
}

export function deleteFlavor(flavor: FlavorModel): FlavorActionsTypes {
  return {
    type: FlavorTypes.DELETE_FLAVOR_REQUEST,
    payload: { flavor },
  };
}

export function cleanFlavor(flavor: FlavorModel): FlavorActionsTypes {
  return {
    type: FlavorTypes.CLEAN_FLAVOR_REQUEST,
    payload: { flavor },
  };
}
