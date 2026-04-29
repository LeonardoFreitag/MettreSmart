import { combineReducers } from 'redux';
import CustomerReducer from './customer/index';
import RequestReducer from './request/index';
import RequestListReducer from './requestList/index';
import ProviderReducer from './provider/index';
import ProductReducer from './products/index';
import ProductFilterReducer from './productsFilter/index';
import PaymentReducer from './payment/index';
import NeighReducer from './neigh/index';
import ItemReducer from './items/index';
import ItemSelectedReducer from './itemSelected/index';
import GroupReducer from './groups/index';
import GroupSelectedReducer from './groupSelected/index';
import FlavorReducer from './flavors/index';
import FlavorSelectedReducer from './flavorSelected/index';
import CallNeighReducer from './callNeigh/index';
import CallLoadStorageReducer from './callLoadStorage/index';
import CoordsReducer from './coords/index';
import EdgeReducer from './edge/index';

const rootReducer = combineReducers({
  customer: CustomerReducer,
  request: RequestReducer,
  requestList: RequestListReducer,
  provider: ProviderReducer,
  product: ProductReducer,
  productFilter: ProductFilterReducer,
  payment: PaymentReducer,
  neigh: NeighReducer,
  item: ItemReducer,
  itemSelected: ItemSelectedReducer,
  groups: GroupReducer,
  groupSelected: GroupSelectedReducer,
  flavors: FlavorReducer,
  flavorSelected: FlavorSelectedReducer,
  callNeigh: CallNeighReducer,
  callLoadStorage: CallLoadStorageReducer,
  coords: CoordsReducer,
  edge: EdgeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
