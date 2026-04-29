import { ProductModel } from '../../../models/ProductModel';
/*
 * actiontpes
 */
export enum ProductTypes {
  CREATE_PRODUCT_REQUEST = '@product/CREATE_PRODUCT_REQUEST',
  UPDATE_PRODUCT_REQUEST = '@product/UPDATE_PRODUCT_REQUEST',
  DELETE_PRODUCT_REQUEST = '@product/DELETE_PRODUCT_REQUEST',
  CLEAN_PRODUCT_REQUEST = '@product/CLEAN_PRODUCT_REQUEST',
}

/*
 * state types
 */
export interface ProductState {
  readonly data: ProductModel[];
}

// export const CREATE_PRODUCT_REQUEST = '@product/CREATE_PRODUCT_REQUEST';
interface CreateProductRequest {
  type: ProductTypes.CREATE_PRODUCT_REQUEST; // typeof CREATE_PRODUCT_REQUEST;
  payload: { product: ProductModel };
}

// export const UPDATE_PRODUCT_REQUEST = '@product/UPDATE_PRODUCT_REQUEST';
interface UpdateProductRequest {
  type: ProductTypes.UPDATE_PRODUCT_REQUEST;
  payload: { product: ProductModel };
}
// export const DELETE_PRODUCT_REQUEST = '@product/DELETE_PRODUCT_REQUEST';
interface DeleteProductRequest {
  type: ProductTypes.DELETE_PRODUCT_REQUEST;
  payload: { product: ProductModel };
}

interface CleanProductRequest {
  type: ProductTypes.CLEAN_PRODUCT_REQUEST;
  payload: { product: ProductModel };
}

export type ProductActionsTypes =
  | CreateProductRequest
  | UpdateProductRequest
  | DeleteProductRequest
  | CleanProductRequest;
