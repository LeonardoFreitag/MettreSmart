import { PaymentModel } from '../../../models/PaymentModel';
import { PaymentState, PaymentActionsTypes, PaymentTypes } from './types';

const INITIAL_STATE: PaymentState = {
  data: [],
};

export default function ProductReducer(
  state = INITIAL_STATE,
  action: PaymentActionsTypes,
): PaymentState {
  switch (action.type) {
    case PaymentTypes.CREATE_PAYMENT_REQUEST:
      return {
        data: [...state.data, action.payload.payment],
      };
    case PaymentTypes.UPDATE_PAYMENT_REQUEST: {
      const data = state.data.map(product =>
        product.id === action.payload.payment.id
          ? action.payload.payment
          : product,
      );
      return { data };
    }
    case PaymentTypes.DELETE_PAYMENT_REQUEST: {
      const data = state.data.filter(
        product => product.id !== action.payload.payment.id,
      );
      return { data };
    }
    case PaymentTypes.CLEAN_PAYMENT_REQUEST: {
      const data = [] as PaymentModel[];
      return { data };
    }
    default:
      return state;
  }
}
