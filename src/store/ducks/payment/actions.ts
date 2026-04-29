import { PaymentModel } from '../../../models/PaymentModel';
import { PaymentActionsTypes, PaymentTypes } from './types';

export function createPayment(payment: PaymentModel): PaymentActionsTypes {
  return {
    type: PaymentTypes.CREATE_PAYMENT_REQUEST,
    payload: { payment },
  };
}

export function updatePayment(payment: PaymentModel): PaymentActionsTypes {
  return {
    type: PaymentTypes.UPDATE_PAYMENT_REQUEST,
    payload: { payment },
  };
}

export function deletePayment(payment: PaymentModel): PaymentActionsTypes {
  return {
    type: PaymentTypes.DELETE_PAYMENT_REQUEST,
    payload: { payment },
  };
}

export function cleanPayment(payment: PaymentModel): PaymentActionsTypes {
  return {
    type: PaymentTypes.CLEAN_PAYMENT_REQUEST,
    payload: { payment },
  };
}
