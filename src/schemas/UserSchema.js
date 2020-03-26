export default class UserSchema {
    static schema = {
        name: 'User',
        primaryKey: 'id',
        properties: {
            id: {type: 'string', indexed: true } ,
            name: 'string',
            cnpj: 'string',
            idCustomer: 'string?',
            rg: 'string',
            cpf: 'string',
            birth: 'double',
            phone: 'string',
            cellphone: 'string',
            email: 'string',
            password: 'string?',
            address: 'string',
            number: 'string',
            neigh: 'string', // neighborhood
            complement: 'string',
            zipcode: 'string',
            city: 'string',
            state: 'string',
            dtreg: 'double?', // date register
            printerName: 'string'
        }
    }
}