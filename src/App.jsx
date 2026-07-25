import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RestaurantsPage } from "./pages/RestaurantsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/restaurants" element={<RestaurantsPage />} />
    </Routes>
  );
}

export default App;