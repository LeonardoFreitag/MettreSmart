import { ProviderModel } from '../../../models/ProviderModel';
import { ProviderActionsTypes, ProviderTypes } from './types';

export function createProvider(provider: ProviderModel): ProviderActionsTypes {
  return {
    type: ProviderTypes.CREATE_PROVIDER_REQUEST,
    payload: { provider },
  };
}

export function updateProvider(provider: ProviderModel): ProviderActionsTypes {
  return {
    type: ProviderTypes.UPDATE_PROVIDER_REQUEST,
    payload: { provider },
  };
}

export function deleteProvider(provider: ProviderModel): ProviderActionsTypes {
  return {
    type: ProviderTypes.DELETE_PROVIDER_REQUEST,
    payload: { provider },
  };
}
