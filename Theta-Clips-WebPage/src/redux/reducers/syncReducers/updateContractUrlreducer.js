import { SET_CONTRACTURL } from "../../actions/syncActions/updateContractUrlaction";

const default_state = {
    contracturl:"",
    extra_data:"Hello World!"
}

export const my_contracturl = (state = default_state, action) => {
    switch (action.type) {
        case SET_CONTRACTURL: {
            return {
                ...state, // Keep all state and olny modify counter
                contracturl: action.payload
            }        
        }
        default: return state;
    }
}