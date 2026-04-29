import { FlavorModel } from '../../../models/FlavorModel';
import { FlavorSelectedActionsTypes, FlavorSelectedTypes } from './types';

export function createFlavorSelected(
  flavorSelected: FlavorModel,
): FlavorSelectedActionsTypes {
  return {
    type: FlavorSelectedTypes.CREATE_FLAVORSELECTED_REQUEST,
    payload: { flavorSelected },
  };
}

export function updateFlavorSelected(
  flavorSelected: FlavorModel,
): FlavorSelectedActionsTypes {
  return {
    type: FlavorSelectedTypes.UPDATE_FLAVORSELECTED_REQUEST,
    payload: { flavorSelected },
  };
}

export function deleteFlavorSelected(
  flavorSelected: FlavorModel,
): FlavorSelectedActionsTypes {
  return {
    type: FlavorSelectedTypes.DELETE_FLAVORSELECTED_REQUEST,
    payload: { flavorSelected },
  };
}
