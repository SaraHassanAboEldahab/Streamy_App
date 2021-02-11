import _ from "lodash"
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from "../actions/types";

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_STREAMS:
            //another way to convert array into object
            /* const p = payload.reduce((acc, cur) => {
                 return { ...acc, [cur.id]: { ...cur } }
             }, {})
             return { ...state, ...p }*/
            return { ...state, ..._.mapKeys(payload, "id") }//here we convert the array of streams into object 
        case FETCH_STREAM:
            return { ...state, [payload.id]: payload }
        case CREATE_STREAM:
            return { ...state, [payload.id]: payload }
        case EDIT_STREAM:
            return { ...state, [payload.id]: payload }
        case DELETE_STREAM:
            return _.omit(state, payload)
        default:
            return state;
    }
}