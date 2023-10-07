import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./components/home/HomePage";
import { AddPrdouct } from "./components/productspage/AddProduct";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} exact />
          <Route path="/addproduct" Component={AddPrdouct} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
