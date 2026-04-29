import { ProductModel } from '../../../models/ProductModel';
import { ProductActionsTypes, ProductTypes } from './types';

export function createProduct(product: ProductModel): ProductActionsTypes {
  return {
    type: ProductTypes.CREATE_PRODUCT_REQUEST,
    payload: { product },
  };
}

export function updateProduct(product: ProductModel): ProductActionsTypes {
  return {
    type: ProductTypes.UPDATE_PRODUCT_REQUEST,
    payload: { product },
  };
}

export function deleteProduct(product: ProductModel): ProductActionsTypes {
  return {
    type: ProductTypes.DELETE_PRODUCT_REQUEST,
    payload: { product },
  };
}

export function cleanProduct(product: ProductModel): ProductActionsTypes {
  return {
    type: ProductTypes.CLEAN_PRODUCT_REQUEST,
    payload: { product },
  };
}
