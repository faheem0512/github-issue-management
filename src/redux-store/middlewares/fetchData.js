import {Types} from '../actions';
import axios from "axios";
import {setData} from "../actions"
const fetchData = ((store = {}) => {
    return function (next) {
        return function (action) {
            switch (action.type) {
                case Types.FETCH_DATA: {
                    const {name, url,...rest} = action.payload;
                    axios.get(url).then((result) => {
                        // console.log("fetched data >> >> ", result);
                        store.dispatch(setData({...rest,name,result:result.data}));
                    }).catch(error=>{
                        store.dispatch(setData({...rest,name,error}));
                    });
                    next(action);
                    break;
            }
                default:
                    next(action);
            }
        }
    }
});
export default fetchData;