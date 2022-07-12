import { actionType } from "../actions/actionType/actionType";


const initialState = {
    waiters:[]
}



const waiterReducer =(state=initialState,{type,payload})=>{
    switch (type) {
        case actionType.Get_Waiters: 
            return {...state,waiters :payload};
        default:
          return  state;
    }

}


export default waiterReducer