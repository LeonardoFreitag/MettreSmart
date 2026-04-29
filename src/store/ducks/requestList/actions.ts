import { RequestModel } from '../../../models/RequestModel';
import { RequestListActionsTypes, RequestListTypes } from './types';

export function createRequestList(
  requestList: RequestModel,
): RequestListActionsTypes {
  return {
    type: RequestListTypes.CREATE_REQUESTLIST_REQUEST,
    payload: { requestList },
  };
}

export function updateRequestList(
  requestList: RequestModel,
): RequestListActionsTypes {
  return {
    type: RequestListTypes.UPDATE_REQUESTLIST_REQUEST,
    payload: { requestList },
  };
}

export function deleteRequestList(
  requestList: RequestModel,
): RequestListActionsTypes {
  return {
    type: RequestListTypes.DELETE_REQUESTLIST_REQUEST,
    payload: { requestList },
  };
}
