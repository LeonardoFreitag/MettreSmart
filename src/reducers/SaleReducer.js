const initialState = {
    id: '',
    idCashier: '',
    date: 0,
    subtotal: 0,
    discount: 0,
    total: 0,
    status: 'OPEN', //CLOSE / STANDBY
    customer: ''
};

function SaleReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_SALE':
            return {
                ...state,
                id: action.id,
                idCashier: action.idCashier,
                date: action.date,
                subtotal: action.subtotal,
                discount: action.discount,
                total: action.total,
                status: action.status,
                customer: action.customer
            };
        case 'CLEAR_SALE':
            return state = {
                id: '',
                idCashier: '',
                date: 0,
                subtotal: 0,
                discount: 0,
                total: 0,
                status: 'OPEN', //CLOSE / STANDBY
                customer: ''
            };
        default:
            return state;
    }
};

export default SaleReducer;