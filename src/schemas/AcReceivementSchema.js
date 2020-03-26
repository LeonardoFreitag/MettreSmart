export default class AcReceivementSchema {
    static schema = {
        name: 'AcReceivement',
        primaryKey: 'id',
        properties: {
            id: {type: 'string', indexed: true } ,
            idCashier: 'string',
            idSale: 'string',
            paymentForm: 'string',
            value: 'double',
        }
    }
}