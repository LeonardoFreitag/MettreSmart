import { combineReducers } from 'redux';
import AuthReducer from './reducers/AuthReducer';
import CommentsReducer from './reducers/CommentsReducer';
import GroupsReducer from './reducers/GroupsReducer';
import OperatorsReducer from './reducers/OperatorsReducer';
import PaymentFormsReducer from './reducers/PaymentFormsReducer';
import ProductsReducer from './reducers/ProductsReducer';
import CashierReducer from './reducers/CashierReducer';
import SaleReducer from './reducers/SaleReducer';
import SaleItemsReducer from './reducers/SaleItemsReduces';
import ReceivementReducer from './reducers/ReceivementReducer';
import UserReducer from './reducers/UserReducer';
import ShowReducer from './reducers/ShowReducer';

const combReducers = combineReducers( {

    auth: AuthReducer,
    comments: CommentsReducer,
    groups: GroupsReducer,
    operator: OperatorsReducer,
    paymentForms: PaymentFormsReducer,
    products: ProductsReducer,
    cashier: CashierReducer,
    sale: SaleReducer,
    saleItems: SaleItemsReducer,
    receivement: ReceivementReducer,
    user: UserReducer,
    show: ShowReducer,
    
});

export default combReducers;