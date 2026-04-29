import { ProviderModel } from '../../../models/ProviderModel';
import { ProviderState, ProviderActionsTypes, ProviderTypes } from './types';

const INITIAL_STATE: ProviderState = {
  data: {} as ProviderModel,
};

export default function ProviderReducer(
  state = INITIAL_STATE,
  action: ProviderActionsTypes,
): ProviderState {
  switch (action.type) {
    case ProviderTypes.CREATE_PROVIDER_REQUEST:
      return {
        data: action.payload.provider,
      };
    case ProviderTypes.UPDATE_PROVIDER_REQUEST: {
      const data = action.payload.provider;
      return { data };
    }
    case ProviderTypes.DELETE_PROVIDER_REQUEST: {
      const data = {} as ProviderModel;
      return { data };
    }
    default:
      return state;
  }
}
