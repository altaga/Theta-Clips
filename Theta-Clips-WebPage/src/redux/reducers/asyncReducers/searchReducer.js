import { SEARCH_REQUEST, SEARCH_REQUEST_SUCCESS, SEARCH_REQUEST_ERROR } from "../../actions/asyncActions/searchAction";

const default_state = {
    loading: false,
    result:'',
    error:'',
    extra_data:"Hello World!"
}

const search = (state = default_state, action) =>{
    switch (action.type) {
        case SEARCH_REQUEST: {
            return{
                ...state, // Keep all state and olny modify counter
                loading:true
            }
        }
        case SEARCH_REQUEST_SUCCESS: {
            return{
                ...state, // Keep all state and olny modify counter
                loading:false,
                result:action.payload,
                error:''
            }
        }
        case SEARCH_REQUEST_ERROR: {
            return{
                ...state, // Keep all state and olny modify counter
                loading:false,
                result:'',
                error:action.payload
            }
        }
        default: return state;
    }
}

export default search;