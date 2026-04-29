import { RequestModel } from '../../../models/RequestModel';
/*
 * actiontpes
 */
export enum RequestTypes {
  CREATE_REQUEST_REQUEST = '@request/CREATE_REQUEST_REQUEST',
  UPDATE_REQUEST_REQUEST = '@request/UPDATE_REQUEST_REQUEST',
  DELETE_REQUEST_REQUEST = '@request/DELETE_REQUEST_REQUEST',
}

/*
 * state types
 */
export interface RequestState {
  readonly data: RequestModel;
}

// export const CREATE_REQUEST_REQUEST = '@request/CREATE_REQUEST_REQUEST';
interface CreateRequestRequest {
  type: RequestTypes.CREATE_REQUEST_REQUEST; // typeof CREATE_REQUEST_REQUEST;
  payload: { request: RequestModel };
}

// export const UPDATE_REQUEST_REQUEST = '@request/UPDATE_REQUEST_REQUEST';
interface UpdateRequestRequest {
  type: RequestTypes.UPDATE_REQUEST_REQUEST;
  payload: { request: RequestModel };
}
// export const DELETE_REQUEST_REQUEST = '@request/DELETE_REQUEST_REQUEST';
interface DeleteRequestRequest {
  type: RequestTypes.DELETE_REQUEST_REQUEST;
  payload: { request: RequestModel };
}

export type RequestActionsTypes =
  | CreateRequestRequest
  | UpdateRequestRequest
  | DeleteRequestRequest;
