import { SET_IPFS } from "../../actions/syncActions/updateIPFSaction";

const default_state = {
    ipfslink:"",
    extra_data:"Hello World!"
}

export const my_ipfslink = (state = default_state, action) => {
    switch (action.type) {
        case SET_IPFS: {
            return {
                ...state, // Keep all state and olny modify counter
                ipfslink: action.payload
            }        
        }
        default: return state;
    }
}