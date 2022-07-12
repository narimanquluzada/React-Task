import React, { useEffect, useState, useMemo } from "react";
import "./main.css";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import getWaiter from "../store/actions/waiterAction";
import getTableMeals from "../store/actions/tableMealsAction";
import getMenu from "../store/actions/mealAction"
import { useParams } from "react-router-dom";
import Timer from "./Timer";
import {
  ChangeStatusOfTable,
  handleDeleteOrders,
  ChangeStatusOfOrder,
  PostOrder,
 
} from "./api/api";
function Orders() {
  const { id } = useParams();

  const [priceMeal, setPriceMeal] = useState(0);
  const [newPriceMeal, setNewPriceMeal] = useState(0);
  const [totalOfPriceList, setTotalOfPrice] = useState(0);

  const [tableDatas, setTableDatas] = useState([]);

  const waiters = useSelector((state) => state.allWaiter.waiters);
  const waiterDispatch = useDispatch();


  const tableMeals = useSelector((state) => state.allMealsTable.tablemeals);
  const tableMealsDispatch = useDispatch();
 

  useEffect(() => {
    console.log("ikinci");
    if (Array.isArray(tableMeals) && tableMeals.length >= 0) {
      let totalofPrice = 0;

      setTableDatas(tableMeals);
      for (let key in tableMeals) {
        if (tableMeals?.[key].orderStatus === 1)
          totalofPrice += tableMeals?.[key].totalPrice;
      }
    
      setTotalOfPrice(totalofPrice);
      ChangeStatusOfTable(id,1,tableMeals ,1,"" );
    }
   

  }, [tableMeals]);
  useEffect(() => {
    console.log("Birinci");
    waiterDispatch(getWaiter());
    mealDispatch(getMenu());
    tableMealsDispatch(getTableMeals(id));
   
  }, []);
  const meals = useSelector((state) => state.allMeal.meals);
  const mealDispatch = useDispatch();


  const event = new Date();
  const fulltime =event.getDate() +"-" + event.getMonth() +"-" + event.getFullYear()+ " " +  event.toLocaleTimeString()


  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      tableName: `MASA${id}`,
      waiterName: "",
      mealsName: "",
      mealsCount: "0",
      totalPrice: "",
      time: event.toLocaleTimeString(),
      orderStatus: 1,
    },
    onSubmit: async (values, { resetForm }) => {
      PostOrder(
        {
          ...values,
          totalPrice: newPriceMeal,
          initialMinute: 0,
          initialSeconds: 0,
        },
        id
      );
    
      resetForm();
      setPriceMeal(0);
      setNewPriceMeal(0);
      tableMealsDispatch(getTableMeals(id));
    },
  });

  //yemeklerin qiymetin gostermek
  const getPrice = (e) => {
    const price = meals.find((item) => {
      return item.Title == e.target.value;
    });
    setPriceMeal(price.Price);
  };
// sifaris vererken total price tapmaq ucun
  const calculatePrice = (e) => {
    if (e.target.value >= 1) {
      const neWprice = e.target.value * priceMeal;

      setNewPriceMeal(neWprice);
    }
  };
//sifarisi geri almaq ucun
  const handleReverseOrder = async (order, index) => {
    const { data } = await ChangeStatusOfOrder(id, index, order, 0);
    try {
      tableDatas.splice(index, 1, { ...order, ...data });
      setTableDatas([...[], ...tableDatas]);
      let totalofPrice = totalOfPriceList - order.totalPrice;
      setTotalOfPrice(totalofPrice);
    } catch (error) {
      console.log(error);
    }
  };
// Sifarisi sonlandirmaq ucun
  const handleFinishOrder = async () => {
    await handleDeleteOrders(tableDatas.length, id);
    ChangeStatusOfTable(id,2,tableMeals,1,fulltime);
  };

  return (
    <div>
    
  

<div className="container ">
<form onSubmit={handleSubmit}>
  <div className="row ">
    <div className="col-6">
      <h2 className="order-title">Masa {`${id}`}</h2>
        
           <select
           className="form-select  mt-3"
           name="waiterName"
           onChange={handleChange}
           value={values.waiterName}
         >
           <option selected>Select Waiter</option>
           {waiters.map((item) => (
             <option key={item.id}>{item.name}</option>
           ))}
         </select>

       
    
    </div>

    <div className="col-6 ">
      <div className="meals-menu">
        <h2 className="order-title">Menu</h2>
        <select
          className="form-select"
          name="mealsName"
          onInput={getPrice}
          onChange={handleChange}
          value={values.mealsName}
        >
          <option selected>Select Meals</option>
          {meals.map((item, i) => (
            <option key={i}>{item.Title}</option>
          ))}
        </select>

        <h6 className="order-title"> Price:{priceMeal}Azn</h6>

        <label htmlFor="count">
          <h4 className="order-title">Count Of Meal :</h4>
        </label>
        <input
          id="count"
          className="form-select "
          type="number"
          min="1"
          onInput={calculatePrice}
          name="mealsCount"
          onChange={handleChange}
          value={values.mealsCount}
        />
        <h4 className="order-title">
          Total Price:{Number(newPriceMeal).toFixed(2)}Azn
        </h4>
        <button className="btn btn-info" type="submit">
          Elave et
        </button>
      </div>
    </div>

    <div className="col-12 mt-4">
      {tableDatas?.length !== 0 && (
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">Say</th>
              <th scope="col">Yemek Adi</th>
              <th scope="col">Miqdar</th>
              <th scope="col">Mebleg</th>
              <th scope="col">Sifaris saati</th>
              <th scope="col">Gozleme</th>
              <th scope="col">#</th>
              <th scope="col">Geri</th>
            </tr>
          </thead>

          <tbody>
            {tableDatas?.map((item, i) => (
              <tr>
                <td>{i}</td>
                <td>{item.mealsName}</td>
                <td>{item.mealsCount}</td>
                <td>{Number(item.totalPrice).toFixed(2)} Azn</td>
                <td>{item.time}</td>
                <td>
                  {item.orderStatus === 1 ? (
                    <Timer
                      initialMinute={item.initialMinute}
                      initialSeconds={item.initialSeconds}
                    />
                  ) : (
                    "Imtina"
                  )}
                </td>
                <td>
                  {item.orderStatus === 1 && (
                    <button className="btn btn-success">verildi</button>
                  )}
                  {item.orderStatus === 0 && (
                    <button className="btn btn-danger">imtina</button>
                  )}
                </td>
                <td>
                  <button
                 
                    onClick={() => handleReverseOrder(item, i)}
                    type="button"
                    className="btn btn-info"
                  >
                    Geri Al
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="8">
                <h4>
                  {" "}
                  Cemi mebleg:{Number(totalOfPriceList).toFixed(2)} Azn
                </h4>
              </td>
            </tr>
            <tr>
              <td colspan="7"></td>
              <td>
                <button
                 type="button"
                  onClick={handleFinishOrder}
                  className="btn btn-danger"
                >
                  Sifarisi Sonlandir
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  </div>
</form>
</div>
      
   
    
    </div>
  );
}

export default Orders;
