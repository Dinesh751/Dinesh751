import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./component/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Admin from "./component/Routes/Admin";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import AllUser from "./pages/Admin/AllUser";
import Profile from "./pages/User/Profile";
import Order from "./pages/User/Order";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UDproduct";
import SearchProducts from "./pages/SearchProducts";
import ProductDetails from "./pages/Products/ProductDetails";
import CategoryWiseProducts from "./pages/Products/CategoryWiseProducts";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug/:cid" element={<CategoryWiseProducts/>}/>
        <Route path="/products/search/:keyword" element={<SearchProducts/>}/>
        <Route path="/products/:slug/:id" element={<ProductDetails/>}/>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Order />} />
        </Route>
        <Route path="/dashboard" element={<Admin />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/orders" element={<AdminOrders />} />
          <Route path="admin/products/:slug/:id" element={<UpdateProduct />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/all-users" element={<AllUser />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-Password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
