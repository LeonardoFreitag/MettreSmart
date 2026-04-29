import { ProductModel } from '../../../models/ProductModel';
import {
  ProductFilterState,
  ProductFilterActionsTypes,
  ProductFilterTypes,
} from './types';

const INITIAL_STATE: ProductFilterState = {
  data: [],
};

export default function ProductReducer(
  state = INITIAL_STATE,
  action: ProductFilterActionsTypes,
): ProductFilterState {
  switch (action.type) {
    case ProductFilterTypes.CREATE_PRODUCTFILTER_REQUEST:
      return {
        data: [...state.data, action.payload.productFilter],
      };
    case ProductFilterTypes.UPDATE_PRODUCTFILTER_REQUEST: {
      const data = state.data.map(product =>
        product.id === action.payload.productFilter.id
          ? action.payload.productFilter
          : product,
      );
      return { data };
    }
    case ProductFilterTypes.DELETE_PRODUCTFILTER_REQUEST: {
      const data = state.data.filter(
        product => product.id !== action.payload.productFilter.id,
      );
      return { data };
    }
    case ProductFilterTypes.CLEAN_PRODUCTFILTER_REQUEST: {
      const data = [] as ProductModel[];
      return { data };
    }
    default:
      return state;
  }
}
