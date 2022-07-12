import { actionType } from "./actionType/actionType";
import axios from "axios";



const waiterAction =(data)=>{
    return{
        type:actionType.Get_Waiters,
        payload:data
    }
}



const getWaiter = ()=>{
    return  async dispatch =>{
        const {data} =await axios.get('http://localhost:3006/employers');
       
     dispatch(waiterAction(data))
    }
   
}


export default getWaiter