import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import Home from "./components/Home";
import AdminPage from "./pages/admin/AdminPage";
import CategoryManagementPage from "./pages/admin/CategoryManagementPage";
import Footer from "./components/Footer";
import About from "./pages/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Main from "./pages/Main";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import axios from "axios";
import ProductList from "./components/Product/productList/ProductList";
import ProductDetails from "./components/Product/ProductDetails";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

import OrderPage from './pages/OrderPage';
import OrderCompletePage from './pages/OrderCompletePage';

import Cart from "./components/Cart/cart";

import MemberUpdatePage from "./pages/MemberUpdate";
import OrderList from "./components/order/OrderList";
import OrderManagementPage from "./pages/admin/OrderManagementPage";
import MyPage from "pages/myPage/MyPage";

import AdminRoute from "components/common/AdminRoute";
import PrivateRoute from "components/common/PrivateRoute";
import NoAccessPage from "pages/admin/NoAccessPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#424242",
      contrastText: "#ffffff",
    },
  },
});

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [categories, setCategories] = useState([]);

  const fetchCategoriesHeader = useCallback(() => {
    axios
      .get(`${apiUrl}/api/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    fetchCategoriesHeader();
  }, [fetchCategoriesHeader]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header
            categories={categories}
            refreshCategories={fetchCategoriesHeader}
          />
          <div style={{ flex: 1, paddingBottom: "60px" }}>
            {" "}
            {/* Footer 높이만큼 여백 추가 */}
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/:productId" element={<ProductDetails />} />
              <Route path="products/category/:categoryId" element={<ProductList />} />
               <Route path="orders" element={<OrderList />} />
              {/* PrivateRoute로 보호 */}
              <Route path="/mypage" element={<PrivateRoute element={<MyPage />} />} />

              {/* AdminRoute로 보호 */}
              <Route path="/admin" element={<AdminRoute element={<AdminPage />} />}>
                <Route index element={<AdminDashboard />} />
                <Route
                    path="categories"
                    element={
                      <CategoryManagementPage
                          refreshCategories={fetchCategoriesHeader}
                      />
                    }
                />
                <Route path="members" element={<Home />} />
                <Route path="orders" element={<OrderManagementPage />} />
                <Route path="products" element={<ProductManagementPage />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/memberupdate" element={<MemberUpdatePage />} />


               <Route path="/order" element={<OrderPage />} />
               <Route path="/ordercomplete" element={<OrderCompletePage />} />
               <Route path="/no-access" element={<NoAccessPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
