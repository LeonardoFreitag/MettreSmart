export default class ProductsSchema {
    static schema = {
        name: 'Products',
        primaryKey: 'id',
        properties: {
            id: {type: 'string', indexed: true } ,
            code: 'string',
            product: 'string',
            unity: 'string',
            cost: 'double',
            price: 'double',
            group: 'string',
            printOut: 'bool',
            printPlace: 'string'
        }
    }
}