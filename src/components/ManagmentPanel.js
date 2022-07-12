import React,{useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import getTables from "../store/actions/tableAction";
import "./main.css";



function ManagmentPanel() {
  
  const tables = useSelector((state) => state.allTable.tables);
  const tableDispatch = useDispatch();

  useEffect(() => {
    tableDispatch(getTables());
  }, []);
  let totalOfPriceList=0;
  for (let key in tables) {
    console.log(tables[key].totalofPrice);
      totalOfPriceList += Number(tables[key].totalofPrice)
    
}

const newTable=tables.filter(item =>{
  return item.status === 1
})
  return (
    <div className="managcss">
    
      <section className="main-information">
        <div className="container">
          <div className="row">
            <div className="col-3 card-col">
              <div className="card">
                <i className="fa fa-users fa-2x card-icon"></i>
                <div className="card-body">
                  <h2 className="card-title">Employers</h2>
                  <p className="card-title">8</p>
                </div>
              </div>
            </div>
            <div className="col-3 card-col">
              <div className="card">
                <i className="fa fa-shopping-basket fa-2x card-icon"></i>
                <div className="card-body">
                  <h2 className="card-title">All Orders</h2>
                  <p className="card-title" >{newTable.length}</p>
                </div>
              </div>
            </div>
            <div className="col-3 card-col">
              <div className="card">
                <i className="fa fa-wallet fa-2x card-icon"></i>
                <div className="card-body">
                  <h3 className="card-title">Total Earnings</h3>
                  <p className="card-title">{Number(totalOfPriceList).toFixed(2)} Azn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManagmentPanel;
