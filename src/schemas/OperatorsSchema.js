export default class OperatorsSchema {
    static schema = {
        name: 'Operators',
        primaryKey: 'id',
        properties: {
            id: {type: 'string', indexed: true } ,
            nome: 'string',
            comments: 'bool',
            groups: 'bool',
            paymentForms: 'bool',
            products: 'bool',
            operators: 'bool'
        }
    }
}