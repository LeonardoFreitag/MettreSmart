export default class CashierSchema {
    static schema = {
        name: 'Cashier',
        primaryKey: 'id',
        properties: {
            id: {type: 'string', indexed: true } ,
            dateOpen: 'double',
            supply: 'double',
            bleed: 'double',
            dateClose: 'double',
            isOpen: 'bool',
        }
    }
}