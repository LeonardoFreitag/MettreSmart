import { ProductModel } from '../../../models/ProductModel';
/*
 * actiontpes
 */
export enum ProductFilterTypes {
  CREATE_PRODUCTFILTER_REQUEST = '@productFilter/CREATE_PRODUCTFILTER_REQUEST',
  UPDATE_PRODUCTFILTER_REQUEST = '@productFilter/UPDATE_PRODUCTFILTER_REQUEST',
  DELETE_PRODUCTFILTER_REQUEST = '@productFilter/DELETE_PRODUCTFILTER_REQUEST',
  CLEAN_PRODUCTFILTER_REQUEST = '@productFilter/CLEAN_PRODUCTFILTER_REQUEST',
}

/*
 * state types
 */
export interface ProductFilterState {
  readonly data: ProductModel[];
}

// export const CREATE_PRODUCTFILTER_REQUEST = '@productFilter/CREATE_PRODUCTFILTER_REQUEST';
interface CreateProductFilterRequest {
  type: ProductFilterTypes.CREATE_PRODUCTFILTER_REQUEST; // typeof CREATE_PRODUCTFILTER_REQUEST;
  payload: { productFilter: ProductModel };
}

// export const UPDATE_PRODUCTFILTER_REQUEST = '@productFilter/UPDATE_PRODUCTFILTER_REQUEST';
interface UpdateProductFilterRequest {
  type: ProductFilterTypes.UPDATE_PRODUCTFILTER_REQUEST;
  payload: { productFilter: ProductModel };
}
// export const DELETE_PRODUCTFILTER_REQUEST = '@productFilter/DELETE_PRODUCTFILTER_REQUEST';
interface DeleteProductFilterRequest {
  type: ProductFilterTypes.DELETE_PRODUCTFILTER_REQUEST;
  payload: { productFilter: ProductModel };
}

interface CleanProductFilterRequest {
  type: ProductFilterTypes.CLEAN_PRODUCTFILTER_REQUEST;
  payload: { productFilter: ProductModel };
}

export type ProductFilterActionsTypes =
  | CreateProductFilterRequest
  | UpdateProductFilterRequest
  | DeleteProductFilterRequest
  | CleanProductFilterRequest;
