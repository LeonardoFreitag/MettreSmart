const initialState = [];

function CommentsReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_COMMENTS':
            return [ ...state, 
                {
                    id: action.id, 
                    comment: action.comment,
                    group: action.group
                }];
        case 'CLEAR_COMMENTS':
            return state = [];
        default:
            return state;
    }
};

export default CommentsReducer;