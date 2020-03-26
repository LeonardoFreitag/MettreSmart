export default class SalesSchema {
    static schema = {
        name: 'Sales',
        primaryKey: 'id',
        properties: {
            id: {type: 'string', indexed: true } ,
            idCashier: 'string',
            date: 'double',
            subtotal: 'double',
            discount: 'double', 
            total: 'double',
            status: 'string',   // OPEN / CLOSE / STANDBY / CANCEL
            customer: 'string?'
        }
    }
}