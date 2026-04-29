import { ProviderModel } from '../../../models/ProviderModel';
/*
 * actiontpes
 */
export enum ProviderTypes {
  CREATE_PROVIDER_REQUEST = '@provider/CREATE_PROVIDER_REQUEST',
  UPDATE_PROVIDER_REQUEST = '@provider/UPDATE_PROVIDER_REQUEST',
  DELETE_PROVIDER_REQUEST = '@provider/DELETE_PROVIDER_REQUEST',
}

/*
 * state types
 */
export interface ProviderState {
  readonly data: ProviderModel;
}

// export const CREATE_PROVIDER_REQUEST = '@provider/CREATE_PROVIDER_REQUEST';
interface CreateProviderRequest {
  type: ProviderTypes.CREATE_PROVIDER_REQUEST; // typeof CREATE_PROVIDER_REQUEST;
  payload: { provider: ProviderModel };
}

// export const UPDATE_PROVIDER_REQUEST = '@provider/UPDATE_PROVIDER_REQUEST';
interface UpdateProviderRequest {
  type: ProviderTypes.UPDATE_PROVIDER_REQUEST;
  payload: { provider: ProviderModel };
}
// export const DELETE_PROVIDER_REQUEST = '@provider/DELETE_PROVIDER_REQUEST';
interface DeleteProviderRequest {
  type: ProviderTypes.DELETE_PROVIDER_REQUEST;
  payload: { provider: ProviderModel };
}

export type ProviderActionsTypes =
  | CreateProviderRequest
  | UpdateProviderRequest
  | DeleteProviderRequest;
