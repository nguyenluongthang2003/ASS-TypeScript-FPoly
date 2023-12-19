import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Client/HomePage';
import LoginPage from './pages/LoginPage';
import ClientLayout from './layout/ClientLayout';
import DetailProduct from './pages/Client/ProductDetail';
import AdminLayout from './layout/AdminLayout';
import DashboardPage from './layout/DasboarhLayout';
import AddProduct from './pages/Admin/Products/AddProduct';
import UpdateProduct from './pages/Admin/Products/UpdateProduct';
import ListProducts from './pages/Admin/Products/ListProducts';
import Signup from './pages/SignupPage';
import CategoriesAdd from './pages/Admin/Categories/AddCategory';
import ListCategories from './pages/Admin/Categories/ListCategories';
import Dashboard from './pages/Admin/Dasboard';
import CategoriesUpdate from './pages/Admin/Categories/UpdateCategories';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<HomePage />} />
          <Route path='product/:id' element={<DetailProduct />} />
        </Route>
        
        <Route path='/admin' element={<AdminLayout/>}>

          <Route path='' element={<DashboardPage/>}>
            <Route index element ={<Dashboard/>}/>
          </Route>
          

          <Route path='product' element={<DashboardPage/>} >
            <Route path='add' element={<AddProduct/>} />
            <Route index element={<ListProducts />} />
            <Route path='update/:id' element={<UpdateProduct />} />
          </Route>

          <Route path='category' element={<DashboardPage/>} >
            <Route path='add' element={<CategoriesAdd/>} />
            <Route index element={<ListCategories />} />
            <Route path='update/:id' element={<CategoriesUpdate />} />
          </Route>
        </Route>

        <Route path="/signin" element={<LoginPage />} />

        <Route path="/signup" element={<Signup/>} />
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
