import { actionType } from "../actions/actionType/actionType";

const initialstate ={
    tables:[]
}


const tableReducer =(state =initialstate,{type,payload})=>{
    switch (type) {
        case actionType.Get_Tables:
           return {...state,tables:payload}
    
        default:
         return state
    }

}

export default tableReducer;