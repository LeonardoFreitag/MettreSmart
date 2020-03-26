export default class ReceivementSchema {
    static schema = {
        name: 'Receivement',
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