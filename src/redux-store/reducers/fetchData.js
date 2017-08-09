import {Types} from '../actions';

export default function (state = {}, action = {}) {

    switch (action.type) {
        case Types.FETCH_DATA: {
            const {name} = action.payload;
            let _state = state[name];
            return {
                ...state,
                [name]: {..._state, loading: true}
            };
        }
        case Types.SET_DATA: {
            const {name, result={}, error,append,resultKeyword,userProps} = action.payload;
            let _state = state[name] || {};
            let _data = _state.data || [];
            let data = resultKeyword ? result[resultKeyword]:result;
            if(append){
                /* to append data on more fetch like on scrolling list more records are fetched */
                data = [..._data, ...data];
            }
            return {
                ...state,
                [name]: {..._state, data,loading: false, result, error,next:result.next,userProps}
            };
        }
        default:
            return state;
    }
};

