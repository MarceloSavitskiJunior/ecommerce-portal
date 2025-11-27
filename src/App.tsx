import { Route, Routes } from "react-router-dom"
import { HomePage } from "./src/cases/home/home-page"
import { Header } from "./components/layout/header/header"
import { ProductDetailsPage } from "./src/cases/products/components/product-details"
import { CartPage } from "./src/cases/cart/pages/cart-page"
import { LoginPage } from "./src/pages/login"
import { SignupPage } from "./src/pages/signup"
import { CheckoutPage } from "./src/pages/checkout"

function App() {

  return (
    <div className="wrapper">
        <main className="w-full">
          <Header />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/" element={HomePage()}></Route>
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />

            <Route
              path="/checkout"
              element={
                <CheckoutPage />
              }
            />
          </Routes>
        </main>
    </div>
  )
}

export default App
