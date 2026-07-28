import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RestaurantsPage } from "./pages/RestaurantsPage";
import { RestaurantDetailsPage } from "./pages/RestaurantDetailsPage";
import { useState } from "react";
import { MapPage } from "./pages/MapPage";

function App() {

    const [searchInput,setSearchInput]=useState("")


  return (
    <Routes>
      <Route path="/" element={<HomePage searchInput={searchInput} setSearchInput={setSearchInput}/>} />
      <Route
        path="/restaurants"
        element={<RestaurantsPage searchInput={searchInput} setSearchInput={setSearchInput} />}
      />
      <Route
        path="/restaurants/:slug"
        element={<RestaurantDetailsPage searchInput={searchInput} setSearchInput={setSearchInput} />}
      />
      <Route path="/restaurants/:slug/map" element={<MapPage searchInput={searchInput} setSearchInput={setSearchInput} />} />
    </Routes>
  );
}

export default App;
