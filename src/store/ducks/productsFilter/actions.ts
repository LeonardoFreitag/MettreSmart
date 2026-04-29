import { ProductModel } from '../../../models/ProductModel';
import { ProductFilterActionsTypes, ProductFilterTypes } from './types';

export function createProductFilter(
  productFilter: ProductModel,
): ProductFilterActionsTypes {
  return {
    type: ProductFilterTypes.CREATE_PRODUCTFILTER_REQUEST,
    payload: { productFilter },
  };
}

export function updateProductFilter(
  productFilter: ProductModel,
): ProductFilterActionsTypes {
  return {
    type: ProductFilterTypes.UPDATE_PRODUCTFILTER_REQUEST,
    payload: { productFilter },
  };
}

export function deleteProductFilter(
  productFilter: ProductModel,
): ProductFilterActionsTypes {
  return {
    type: ProductFilterTypes.DELETE_PRODUCTFILTER_REQUEST,
    payload: { productFilter },
  };
}

export function cleanProductFilter(
  productFilter: ProductModel,
): ProductFilterActionsTypes {
  return {
    type: ProductFilterTypes.CLEAN_PRODUCTFILTER_REQUEST,
    payload: { productFilter },
  };
}
