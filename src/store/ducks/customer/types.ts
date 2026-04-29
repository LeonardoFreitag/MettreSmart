import { CustomerModel } from '../../../models/CustomerModel';
/*
 * actiontpes
 */
export enum CustomerTypes {
  CREATE_CUSTOMER_REQUEST = '@customer/CREATE_CUSTOMER_REQUEST',
  UPDATE_CUSTOMER_REQUEST = '@customer/UPDATE_CUSTOMER_REQUEST',
  DELETE_CUSTOMER_REQUEST = '@customer/DELETE_CUSTOMER_REQUEST',
}

/*
 * state types
 */
export interface CustomerState {
  readonly data: CustomerModel;
}

// export const CREATE_CUSTOMER_REQUEST = '@customer/CREATE_CUSTOMER_REQUEST';
interface CreateCustomerRequest {
  type: CustomerTypes.CREATE_CUSTOMER_REQUEST; // typeof CREATE_CUSTOMER_REQUEST;
  payload: { customer: CustomerModel };
}

// export const UPDATE_CUSTOMER_REQUEST = '@customer/UPDATE_CUSTOMER_REQUEST';
interface UpdateCustomerRequest {
  type: CustomerTypes.UPDATE_CUSTOMER_REQUEST;
  payload: { customer: CustomerModel };
}
// export const DELETE_CUSTOMER_REQUEST = '@customer/DELETE_CUSTOMER_REQUEST';
interface DeleteCustomerRequest {
  type: CustomerTypes.DELETE_CUSTOMER_REQUEST;
  payload: { customer: CustomerModel };
}

export type CustomerActionsTypes =
  | CreateCustomerRequest
  | UpdateCustomerRequest
  | DeleteCustomerRequest;
