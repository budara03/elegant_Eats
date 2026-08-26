import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../auth/SignIn";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Cakes from "../pages/Cakes";
import CustomCake from "../pages/CustomCake";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/custom-cake" element={<CustomCake />} />
      </Routes>
    </BrowserRouter>
  );
}
