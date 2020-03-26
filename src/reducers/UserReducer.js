const initialState = {
    id: '',
    name: '',
    cnpj: '',
    idCustomer: '',
    rg: '',
    cpf: '',
    birth: 0,
    phone: '',
    cellphone: '',
    email: '',
    password: '',
    address: '',
    number: '',
    neigh: '', // neighborhood
    complement: '',
    zipcode: '',
    city: '',
    state: '',
    dtreg: 0, // date register
    printerName: ''
};

function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'STORE_USER':
            return {
                ...state,
                id: action.id,
                name: action.name,
                cnpj: action.cnpj,
                idCustomer: action.idCustomer,
                rg: action.rg,
                cpf: action.cpf,
                birth: action.birth,
                phone: action.phone,
                cellphone: action.cellphone,
                email: action.email,
                password: action.password,
                address: action.address,
                number: action.number,
                neigh: action.neigh, // neighborhood
                complement: action.complement,
                zipcode: action.zipcode,
                city: action.city,
                state: action.state,
                dtreg: action.dtreg, // date register
                printerName: action.printerName
            };
        case 'CLEAR_USER':
            return state = {
                id: '',
                name: '',
                cnpj: '',
                idCustomer: '',
                rg: '',
                cpf: '',
                birth: 0,
                phone: '',
                cellphone: '',
                email: '',
                password: '',
                address: '',
                number: '',
                neigh: '', // neighborhood
                complement: '',
                zipcode: '',
                city: '',
                state: '',
                dtreg: 0, // date register
                printerName: ''
            };
        default:
            return state;
    }
};

export default UserReducer;