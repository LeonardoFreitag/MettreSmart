const initialState = {
    selling: false,
    showGroups: false,
    showProducts: false,
    showComments: false,
    showAmount: false,
};

function ShowReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_SHOW':
            return {
                ...state,
                selling: action.selling,
                showGroups: action.showGroups,
                showProducts: action.showProducts,
                showComments: action.showComments,
                showAmount: action.showAmount,
                        };
        case 'CLEAR_SHOW':
            return state = {
                selling: false,
                showGroups: false,
                showProducts: false,
                showComments: false,
                showAmount: false,
                        };
        default:
            return state;
    }
};

export default ShowReducer;