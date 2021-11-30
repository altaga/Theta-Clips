import { combineReducers } from "redux"
import { my_contracturl } from "./syncReducers/updateContractUrlreducer";
import { my_pubkey } from "./syncReducers/updatePublicKeyreducer";
import {my_ipfslink} from "./syncReducers/updateIPFSreducer";
import { my_activetab } from "./syncReducers/setActiveTabreducer";
import { my_nft } from "./syncReducers/setNFTreducer";
import search from "./asyncReducers/searchReducer";

const rootReducers = combineReducers({
    my_contracturl,
    my_pubkey,
    my_activetab,
    my_ipfslink,
    my_nft,
    search
})

export default rootReducers;