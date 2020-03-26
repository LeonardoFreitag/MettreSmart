const initialState = [];

function OperatorsReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_OPERATOR':
            return [...state,
            {
                id: action.id,
                nome: action.name,
                comments: action.comments,
                groups: action.groups,
                paymentForms: action.paymentForms,
                products: action.products,
                operators: action.operators
            }];
        default:
            return state;
    }
};

export default OperatorsReducer;