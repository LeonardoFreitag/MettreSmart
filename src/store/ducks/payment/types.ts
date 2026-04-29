import { PaymentModel } from '../../../models/PaymentModel';
/*
 * actiontpes
 */
export enum PaymentTypes {
  CREATE_PAYMENT_REQUEST = '@payment/CREATE_PAYMENT_REQUEST',
  UPDATE_PAYMENT_REQUEST = '@payment/UPDATE_PAYMENT_REQUEST',
  DELETE_PAYMENT_REQUEST = '@payment/DELETE_PAYMENT_REQUEST',
  CLEAN_PAYMENT_REQUEST = '@payment/CLEAN_PAYMENT_REQUEST',
}

/*
 * state types
 */
export interface PaymentState {
  readonly data: PaymentModel[];
}

// export const CREATE_PAYMENT_REQUEST = '@payment/CREATE_PAYMENT_REQUEST';
interface CreatePaymentRequest {
  type: PaymentTypes.CREATE_PAYMENT_REQUEST; // typeof CREATE_PAYMENT_REQUEST;
  payload: { payment: PaymentModel };
}

// export const UPDATE_PAYMENT_REQUEST = '@payment/UPDATE_PAYMENT_REQUEST';
interface UpdatePaymentRequest {
  type: PaymentTypes.UPDATE_PAYMENT_REQUEST;
  payload: { payment: PaymentModel };
}
// export const DELETE_PAYMENT_REQUEST = '@payment/DELETE_PAYMENT_REQUEST';
interface DeletePaymentRequest {
  type: PaymentTypes.DELETE_PAYMENT_REQUEST;
  payload: { payment: PaymentModel };
}

interface CleanPaymentRequest {
  type: PaymentTypes.CLEAN_PAYMENT_REQUEST;
  payload: { payment: PaymentModel };
}

export type PaymentActionsTypes =
  | CreatePaymentRequest
  | UpdatePaymentRequest
  | DeletePaymentRequest
  | CleanPaymentRequest;
