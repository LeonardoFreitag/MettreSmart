export default class AcSalesItemsSchema {
    static schema = {
        name: 'AcSalesItems',
        primaryKey: 'id',
        properties: {
            id: {type: 'string', indexed: true } ,
            idCashier: 'string',
            idSale: 'string',
            code: 'string',
            product: 'string',
            unity: 'string',
            amount: 'double',
            price: 'double',
            total: 'double',
            comments: 'string'
        }
    }
}