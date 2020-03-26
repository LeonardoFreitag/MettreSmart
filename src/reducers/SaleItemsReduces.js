const initialState = []

function SaleItemsReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_SALEITEMS':
            return [
                ...state,
                {
                    id: action.id,
                    idCashier: action.idCashier,
                    idSale: action.idSale,
                    code: action.code,
                    product: action.product,
                    unity: action.unity,
                    amount: action.amount,
                    price: action.price,
                    total: action.total,
                    comments: action.comments,
                    isCanceled: action.isCanceled
                }];
        case 'CLEAR_SALEITEMS':
            return state = [];
        default:
            return state;
    }
};

export default SaleItemsReducer;