import Realm from 'realm';

import UserSchema from '../schemas/UserSchema';
import CommentsSchema from '../schemas/CommentsSchema';
import GroupsSchema from '../schemas/GroupsSchema';
import OperatorsSchema from '../schemas/OperatorsSchema';
import PaymentFormSchema from '../schemas/PaymentFormSchema';
import ProductsSchema from '../schemas/ProductsSchema';
import CashierSchema from '../schemas/CashierSchema';
import SalesSchema from '../schemas/SalesSchema';
import SalesItemsSchema from '../schemas/SalesItemsSchema';
import ReceivementShema from '../schemas/ReceivementSchema';
import AcSalesSchema from '../schemas/AcSalesSchema';
import AcSalesItemsSchema from '../schemas/AcSalesItemsSchema';
import AcReceivementShema from '../schemas/AcReceivementSchema';

export default function getRealm() {
    return Realm.open({schema: [UserSchema, CommentsSchema, GroupsSchema,
                    OperatorsSchema, PaymentFormSchema, ProductsSchema,
                    CashierSchema, SalesSchema, SalesItemsSchema,
                    ReceivementShema, AcSalesSchema, AcSalesItemsSchema,
                    AcReceivementShema], schemaVersion: 18})
}