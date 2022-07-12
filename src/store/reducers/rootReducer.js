import { combineReducers } from "redux";
import waiterReducer from "./waiterReducer";
import tableReducer from "./tableReducer";
import mealReducer from "./mealReducer";
import tableMealsReducer from "./tableMealsReducer";



const rootReducer = combineReducers({
    allWaiter:waiterReducer,
    allTable:tableReducer,
    allMeal :mealReducer,
    allMealsTable:tableMealsReducer,
  
})


export default rootReducer;