const initialState = {
    id: '',
    dateOpen: 0,
    supply: 0,
    bleed: 0,
    dateClose: 0,
    isOpen: false,
};

function CashierReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_CASHIER':
            return {
                ...state,
                id: action.id,
                dateOpen: action.dateOpen,
                supply: action.supply,
                bleed: action.bleed,
                dateClose: action.dateClose,
                isOpen: action.isOpen,
            };
        case 'CLEAR_CASHIER':
            return state = {
                id: '',
                dateOpen: 0,
                supply: 0,
                bleed: 0,
                dateClose: 0,
                isOpen: false,            
            };
        default:
            return state;
    }
};

export default CashierReducer;