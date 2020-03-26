export default class AcSalesSchema {
    static schema = {
        name: 'AcSales',
        primaryKey: 'id',
        properties: {
            id: {type: 'string', indexed: true } ,
            idCashier: 'string',
            date: 'double',
            subtotal: 'double',
            discount: 'double', 
            total: 'double',
            status: 'string',
            customer: 'string?' // OPEN / CLOSE / STANDBY
        }
    }
}