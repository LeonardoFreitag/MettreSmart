const initialState = [];

function GroupsReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_GRUOPS':
            return [ ...state, 
                {
                    id: action.id, 
                    group: action.group
                }];
        case 'CLEAR_GROUPS':
            return state = [];
        default:
            return state;
    }
};

export default GroupsReducer;