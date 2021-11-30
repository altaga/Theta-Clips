import { SET_NFT } from "../../actions/syncActions/setNFTaction";

const default_state = {
    nft: "" ,
    extra_data:"Hello World!"
}

export const my_nft = (state = default_state, action) => {
    switch (action.type) {
        case SET_NFT: {
            return {
                ...state, // Keep all state and olny modify counter
                nft: action.payload
            }        
        }
        default: return state;
    }
}