export default class GroupsSchema {
    static schema = {
        name: 'Groups',
        primaryKey: 'id',
        properties: {
            id: {type: 'string', indexed: true } ,
            group: 'string',
        }
    }
}