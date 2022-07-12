import React,{useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import getTables from '../store/actions/tableAction';

function TotalOrders() {
  

    const tables = useSelector((state) => state.allTable.tables);
    const tableDispatch = useDispatch();
  
    useEffect(() => {
      tableDispatch(getTables());
    }, []);


   const newTable = tables.sort((a, b) => {
      return a.statusOfTable - b.statusOfTable;
  });
 
    let totalOfPriceList=0;
    for (let key in tables) {
        totalOfPriceList += Number(tables[key].totalofPrice)
        
  }
  
  
  let statusof=0;;
  for (let key in tables) {
    statusof += tables?.[key].status;
}
console.log(statusof);
let y=1;
  return (
    <div>

    {statusof == 0 && (
      <div className="container">
      <div className="row">
        <div className="col-6 offset-3 ">
          <h1 style={{color:"#fff"}}>Sifaris Yoxdur</h1>
        </div>
      </div>
    </div>
    )
    }
     <div className="col-12 mt-4">
              {statusof > 0 && (
                <table className="table table-success table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Say</th>
                      <th scope="col">Masa #</th>
                      <th scope="col">Waiter name</th>
                      <th scope="col">isExpired</th>
                      <th scope="col">Mebleg</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {newTable?.map((item) => (
                       item.status === 1 &&
                    <tr>
                     <td>{y++}</td>
                     <td>{item.name}</td>
                     <td>{item.tableWaiterName}</td>
                     <td>
                      {item.statusOfTable=== 1 && <span style={{color: "red"}}>-</span>}
                      {item.statusOfTable=== 2 && <span>Sonlanib</span>}
                     </td>
                     <td>{Number(item.totalofPrice).toFixed(2)} Azn</td>
                     <td>{item.time}</td>
                   </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="8">
                        <h4>
                          Cemi mebleg:{Number(totalOfPriceList).toFixed(2)} Azn
                        </h4>
                      </td>
                    </tr>
                    </tfoot>
                
                </table>
              )}
            </div>
    </div>
  )
}

export default TotalOrders