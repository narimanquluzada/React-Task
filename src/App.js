import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Orders from './components/Orders';
import ManagmentPanel from './components/ManagmentPanel';
import Table from './components/Table/Table'
import TotalOrders from './components/TotalOrders';



function App() {
  return (
    <div >
         <Router>
          <Navbar/>
        <Routes>
        <Route path='/' element={<ManagmentPanel/>} />
        <Route path='/order/:id' element={<Orders/>} />
        <Route path='/table' element={<Table/>} />
        <Route path='/totalOrders' element={<TotalOrders/>} />
        </Routes>
         </Router>

    
    </div>
  );
}

export default App;
