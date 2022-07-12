import { actionType } from "./actionType/actionType";
import axios from "axios";


const tableAction = (data)=>{
    return {
        type:actionType.Get_Tables,
        payload:data
    }

}

const getTables =()=>{
    return async dispatch => {
        const {data} = await axios.get('http://localhost:3006/tables')
        dispatch (tableAction(data))

    }
}


export default getTables;