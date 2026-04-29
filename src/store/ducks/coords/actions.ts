import { CoordsModel } from '../../../models/CoordsModel';
import { CoordsActionsTypes, CoordsTypes } from './types';

export function createCoords(coords: CoordsModel): CoordsActionsTypes {
  return {
    type: CoordsTypes.CREATE_COORDS_REQUEST,
    payload: { coords },
  };
}

export function updateCoords(coords: CoordsModel): CoordsActionsTypes {
  return {
    type: CoordsTypes.UPDATE_COORDS_REQUEST,
    payload: { coords },
  };
}

export function deleteCoords(coords: CoordsModel): CoordsActionsTypes {
  return {
    type: CoordsTypes.DELETE_COORDS_REQUEST,
    payload: { coords },
  };
}
