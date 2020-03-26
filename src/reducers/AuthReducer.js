const initialState = {
    id: '',
    name: '',
}

function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_USER':
            return { ...state, 
                    id: action.id, name: action.name
                };
        default:
            return state;
    }
};

export default AuthReducer;