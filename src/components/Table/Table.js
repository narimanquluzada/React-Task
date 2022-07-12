import React, { useEffect } from "react";
import "./table.scss";
import { useSelector, useDispatch } from "react-redux";
import getTables from "../../store/actions/tableAction";
import {Link} from 'react-router-dom'

function Table() {
  const tables = useSelector((state) => state.allTable.tables);
  const tableDispatch = useDispatch();

  useEffect(() => {
    tableDispatch(getTables());
  }, []);



  return (
    <div>
      <div className="container">
        <div className="row">
          {tables.map((item, i) => (
          
            <div className="col-3 mb-3" key={i}>
             
              <Link   to={item.statusOfTable == 2 ? '#' :  `/order/${item.id}`}>
              <div className="card-table">
                <div className="face face1">
                  <div className="content">
                    <span className="stars">
                    { item.statusOfTable == 0 && <h5>Sifaris et</h5> }
                    { item.statusOfTable == 1 && <h5>Doludur</h5> }
                     
                      </span>
                
                  
                  </div>
                </div>
                { item.statusOfTable == 0 && 
                  <div className="face face2">
                  <h2>{item.name}</h2> <br />
                  <h2> (Empty)</h2>
                </div>
                }
                { item.statusOfTable == 1 && 
                  <div className="face face3">
                  <h2>{item.name}</h2> <br />
                  <h2> (Full)</h2>
                </div>
                }
                  { item.statusOfTable == 2 && 
                  <div className="face face4">
                  <h2>{item.name}</h2> <br />
                  <h2> (Cleaning ...)</h2>
                </div>
                }

                
              </div>
              </Link>
            </div>
        
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table;
