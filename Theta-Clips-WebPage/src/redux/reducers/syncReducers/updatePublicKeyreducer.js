import { SET_PUBKEY } from "../../actions/syncActions/updatePublicKeyaction";

const default_state = {
    pubkey:"",
    extra_data:"Hello World!"
}

function stringToLowerCase(str) {
    return str.toLowerCase();
  }

export const my_pubkey = (state = default_state, action) => {
    switch (action.type) {
        case SET_PUBKEY: {
            return {
                ...state, // Keep all state and olny modify counter
                pubkey: stringToLowerCase(action.payload)
            }        
        }
        default: return state;
    }
}