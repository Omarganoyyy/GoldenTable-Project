// App.jsx
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RestaurantsPage } from "./pages/RestaurantsPage";
import { RestaurantDetailsPage } from "./pages/RestaurantDetailsPage";
import { useState } from "react";
import { MapPage } from "./pages/MapPage";
import { UserProfile } from "./pages/UserProfile";
import { userData } from "../Backend/UserData";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState(userData);

  const favoriteSlugs = user.favoriteRestaurants.map((restaurant) => restaurant.slug);

  const handleToggleFavorite = (restaurant) => {
    setUser((prevUser) => {
      const alreadyFavorite = prevUser.favoriteRestaurants.some((item) => item.slug === restaurant.slug);
      const newFavorites = alreadyFavorite
        ? prevUser.favoriteRestaurants.filter((item) => item.slug !== restaurant.slug)
        : [
          ...prevUser.favoriteRestaurants,
          {
            id: restaurant.id || `fav_${restaurant.slug}`,
            name: restaurant.name,
            slug: restaurant.slug,
          },
        ];

      return { ...prevUser, favoriteRestaurants: newFavorites };
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            favoriteSlugs={favoriteSlugs}
            onToggleFavorite={handleToggleFavorite}
          />
        }
      />
      <Route
        path="/restaurants"
        element={
          <RestaurantsPage
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            favoriteSlugs={favoriteSlugs}
            onToggleFavorite={handleToggleFavorite}
          />
        }
      />
      <Route
        path="/restaurants/:slug"
        element={<RestaurantDetailsPage searchInput={searchInput} setSearchInput={setSearchInput} />}
      />
      <Route path="/restaurants/:slug/map" element={<MapPage searchInput={searchInput} setSearchInput={setSearchInput} />} />
      <Route
        path="/profile"
        element={
          <UserProfile
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            user={user}
          />
        }
      />
    </Routes>
  );
}

export default App;