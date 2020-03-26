export default class PaymentFormSchema {
    static schema = {
        name: 'PaymentForms',
        primaryKey: 'id',
        properties: {
            id: {type: 'string', indexed: true } ,
            paymentForm: 'string',
        }
    }
}