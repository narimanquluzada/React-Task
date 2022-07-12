import { actionType} from "../actions/actionType/actionType";


const initialState ={
    tablemeals:[]
}

const tableMealsReducer =(state = initialState,{type,payload})=>{
    switch(type){
        case actionType.Get_Meals_Table:
            return {...state,tablemeals:payload}

            default:
                return state
        
    }


}


export default tableMealsReducer