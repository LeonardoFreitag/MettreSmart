const initialState = [];

function PaymentFormsReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_PAYMENTFORMS':
            return [ ...state, 
                {
                    id: action.id, 
                    paymentForm: action.paymentForm,
                }];
        case 'CLEAR_PAYMENTFORMS':
            return state = [];
        default:
            return state;
    }
};

export default PaymentFormsReducer;