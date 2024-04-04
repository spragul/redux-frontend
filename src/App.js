
import './App.css';
import ProductList from './Components/ProductList';
import DetailProduct from './Components/DetailProduct';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './Components/AddProduct';
import EditProduct from './Components/EditProduct';
import Loginpage from './Components/Pages/signin/login';
import Cart from './Components/Cart';
import Orders from './Components/Orders';
import Signup from './Components/Pages/signup/signup';
import LoadPayment from './Components/Payment/payment';
import Admin from './Components/Admin/Admin';
import Firstpage from './Components/Pages/Firstpage';



function App() {
  return (
    <div className="App">
       <Routes>
        <Route path='/' element={<Firstpage/>}/>
        <Route path='/dashboard' element={ <ProductList/>}/>
        <Route path='/detail/:id' element={ <DetailProduct/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/edit/product/:id' element={<EditProduct/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/cart' element={<Cart/>}/>
       <Route path='/orders' element={<Orders/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/payment/:id' element={<LoadPayment/>}/>
       <Route path="/admin" element={<Admin/>}/>
       </Routes>
    </div>
  );
}

export default App;
