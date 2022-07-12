import axios from "axios";



//sifarisleri yazmaq ucun
export const PostOrder = async (orders, id) => {
  const data = await axios.post(`http://localhost:3006/M${id}`, orders);

  return data;
};

//sifarisi sonlandrimaq ucun
export const handleDeleteOrders = async (count, id) => {

  for (let i = 1; i <= count; i++) {
    await axios.delete(`http://localhost:3006/M${id}/${i}`);
  }

};

//stolun dolu ve ya bos olmaq ucun statusu update ucun
export const ChangeStatusOfTable = async(id,statusTable,values ,status,timeOfTable) => {
const name =values[0].waiterName;
  let totalofPrice = 0;
  values.forEach((item)=>{
    totalofPrice+=item.totalPrice
  })
  Number(totalofPrice).toFixed(2)
 
  const {data} = axios .put(`http://localhost:3006/tables/${id}`, {
      id: `${id}`,
      name: `MASA ${id}`,
      statusOfTable: statusTable,
      tableWaiterName:name ,
      totalofPrice:totalofPrice,
      time:timeOfTable,
      status:status
    
     
    })
    return {data}
  
};

//sifarisi update etmek ucun
export const ChangeStatusOfOrder = async (id,index,order, orderStatus) => {
  const {data} = await  axios
      .put(`http://localhost:3006/M${id}/${index + 1}`, {
       ...order, 
       orderStatus
      })
      return {data}
  };

 


  
  



