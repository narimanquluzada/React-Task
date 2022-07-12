import { actionType } from "../actions/actionType/actionType";


const initialState ={
    meals :[]
}


const mealReducer =(state=initialState,{type,payload})=>{
    switch (type) {
        case actionType.Get_Meals:  
        return {...state,meals:payload}
            
        default:
          return state
    }

}


export default mealReducer