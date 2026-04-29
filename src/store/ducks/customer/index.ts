import { CustomerModel } from '../../../models/CustomerModel';
import { CustomerState, CustomerActionsTypes, CustomerTypes } from './types';

const INITIAL_STATE: CustomerState = {
  data: {} as CustomerModel,
};

export default function CustomerReducer(
  state = INITIAL_STATE,
  action: CustomerActionsTypes,
): CustomerState {
  switch (action.type) {
    case CustomerTypes.CREATE_CUSTOMER_REQUEST:
      return {
        data: action.payload.customer,
      };
    case CustomerTypes.UPDATE_CUSTOMER_REQUEST: {
      const data = action.payload.customer;
      return { data };
    }
    case CustomerTypes.DELETE_CUSTOMER_REQUEST: {
      const data = {} as CustomerModel;
      return { data };
    }
    default:
      return state;
  }
}
