import { actionType} from "./actionType/actionType";
import axios from 'axios'


const tableMealsAction =(data)=>{
    return{
        type:actionType.Get_Meals_Table,
        payload:data
    }

}


const getTableMeals = (id)=>{
    return async dispatch =>{
        const {data} = await axios.get(`http://localhost:3006/M${id}`);
        dispatch(tableMealsAction(data))
        
    }
   
}


export default getTableMeals