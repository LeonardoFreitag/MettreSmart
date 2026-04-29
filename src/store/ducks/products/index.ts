import { ProductModel } from '../../../models/ProductModel';
import { ProductState, ProductActionsTypes, ProductTypes } from './types';

const INITIAL_STATE: ProductState = {
  data: [],
};

export default function ProductReducer(
  state = INITIAL_STATE,
  action: ProductActionsTypes,
): ProductState {
  switch (action.type) {
    case ProductTypes.CREATE_PRODUCT_REQUEST:
      return {
        data: [...state.data, action.payload.product],
      };
    case ProductTypes.UPDATE_PRODUCT_REQUEST: {
      const data = state.data.map(product =>
        product.id === action.payload.product.id
          ? action.payload.product
          : product,
      );
      return { data };
    }
    case ProductTypes.DELETE_PRODUCT_REQUEST: {
      const data = state.data.filter(
        product => product.id !== action.payload.product.id,
      );
      return { data };
    }
    case ProductTypes.CLEAN_PRODUCT_REQUEST: {
      const data = [] as ProductModel[];
      return { data };
    }
    default:
      return state;
  }
}
