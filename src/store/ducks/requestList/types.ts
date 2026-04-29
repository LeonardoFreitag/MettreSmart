import { RequestModel } from '../../../models/RequestModel';
/*
 * actiontpes
 */
export enum RequestListTypes {
  CREATE_REQUESTLIST_REQUEST = '@requestList/CREATE_REQUESTLIST_REQUEST',
  UPDATE_REQUESTLIST_REQUEST = '@requestList/UPDATE_REQUESTLIST_REQUEST',
  DELETE_REQUESTLIST_REQUEST = '@requestList/DELETE_REQUESTLIST_REQUEST',
  CLEAN_REQUESTLIST_REQUEST = '@requestList/CLEAN_REQUESTLIST_REQUEST',
}

/*
 * state types
 */
export interface RequestListState {
  readonly data: RequestModel[];
}

// export const CREATE_REQUESTLIST_REQUEST = '@requestList/CREATE_REQUESTLIST_REQUEST';
interface CreateRequestListRequest {
  type: RequestListTypes.CREATE_REQUESTLIST_REQUEST; // typeof CREATE_REQUESTLIST_REQUEST;
  payload: { requestList: RequestModel };
}

// export const UPDATE_REQUESTLIST_REQUEST = '@requestList/UPDATE_REQUESTLIST_REQUEST';
interface UpdateRequestListRequest {
  type: RequestListTypes.UPDATE_REQUESTLIST_REQUEST;
  payload: { requestList: RequestModel };
}
// export const DELETE_REQUESTLIST_REQUEST = '@requestList/DELETE_REQUESTLIST_REQUEST';
interface DeleteRequestListRequest {
  type: RequestListTypes.DELETE_REQUESTLIST_REQUEST;
  payload: { requestList: RequestModel };
}

interface CleanRequestListRequest {
  type: RequestListTypes.CLEAN_REQUESTLIST_REQUEST;
  payload: { requestList: RequestModel };
}

export type RequestListActionsTypes =
  | CreateRequestListRequest
  | UpdateRequestListRequest
  | DeleteRequestListRequest
  | CleanRequestListRequest;
