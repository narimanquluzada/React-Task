import { actionType } from "./actionType/actionType";
import axios from 'axios'


const mealAction =(data)=>{
    return {
        type:actionType.Get_Meals,
        payload:data
    }

}

const getMenu =()=>{

    return async dispatch =>{
        const {data} =await axios.get('http://localhost:3006/meals')
        dispatch(mealAction(data))

    }

}


export default getMenu