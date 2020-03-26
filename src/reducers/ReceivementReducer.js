const initialState = {
    id: '',
    idCashier: '',
    idSale: '',
    paymentForm: '',
    value: 0,
};

function ReceivementReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_RECEIVEMENT':
            return [
                ...state,
                {
                    id: action.id,
                    idCashier: action.idCashier,
                    idSale: action.idSale,
                    paymentForm: action.paymentForm,
                    value: action.value
                }];
        case 'CLEAR_RECEIVEMENT':
            return state = [];
        default:
            return state;
    }
};

export default ReceivementReducer;