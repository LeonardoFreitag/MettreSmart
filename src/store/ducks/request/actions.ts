import { RequestModel } from '../../../models/RequestModel';
import { RequestActionsTypes, RequestTypes } from './types';

export function createRequest(request: RequestModel): RequestActionsTypes {
  return {
    type: RequestTypes.CREATE_REQUEST_REQUEST,
    payload: { request },
  };
}

export function updateRequest(request: RequestModel): RequestActionsTypes {
  return {
    type: RequestTypes.UPDATE_REQUEST_REQUEST,
    payload: { request },
  };
}

export function deleteRequest(request: RequestModel): RequestActionsTypes {
  return {
    type: RequestTypes.DELETE_REQUEST_REQUEST,
    payload: { request },
  };
}
