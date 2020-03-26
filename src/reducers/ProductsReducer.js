const initialState = [];

function ProductsReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_PRODUCTS':
            return [...state,
            {
                id: action.id,
                code: action.code,
                product: action.product,
                unity: action.unity,
                cost: action.cost,
                price: action.price,
                group: action.group,
                printOut: action.printOut,
                printPlace: action.printPlace,
            }];
        case 'CLEAR_PRODUCTS':
            return state = [];
        default:
            return state;
    }
};

export default ProductsReducer;