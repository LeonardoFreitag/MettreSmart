import { CustomerModel } from '../../../models/CustomerModel';
import { CustomerActionsTypes, CustomerTypes } from './types';

export function createCustomer(customer: CustomerModel): CustomerActionsTypes {
  return {
    type: CustomerTypes.CREATE_CUSTOMER_REQUEST,
    payload: { customer },
  };
}

export function updateCustomer(customer: CustomerModel): CustomerActionsTypes {
  return {
    type: CustomerTypes.UPDATE_CUSTOMER_REQUEST,
    payload: { customer },
  };
}

export function deleteCustomer(customer: CustomerModel): CustomerActionsTypes {
  return {
    type: CustomerTypes.DELETE_CUSTOMER_REQUEST,
    payload: { customer },
  };
}
