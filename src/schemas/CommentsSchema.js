export default class CommentsSchema {
    static schema = {
        name: 'Comments',
        primaryKey: 'id',
        properties: {
            id: {type: 'string', indexed: true } ,
            comment: 'string',
            group: 'string',
        }
    }
}