import { SET_ACTIVETAB } from "../../actions/syncActions/setActiveTabaction";

const default_state = {
    activetab: 0 ,
    extra_data:"Hello World!"
}

export const my_activetab = (state = default_state, action) => {
    switch (action.type) {
        case SET_ACTIVETAB: {
            return {
                ...state, // Keep all state and olny modify counter
                activetab: action.payload
            }        
        }
        default: return state;
    }
}