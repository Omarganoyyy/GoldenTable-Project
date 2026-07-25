import { Link, useParams } from "react-router-dom";
import { RestaurantsPageData } from "../../Backend/RestaurantsPageData";
import { NavBar } from "../components/NavBar";
import "./RestaurantDetailsPage.css";

export function RestaurantDetailsPage({ searchInput, setSearchInput }) {
  const { slug } = useParams();
  const restaurant = RestaurantsPageData.find((item) => item.slug === slug);

  if (!restaurant) {
    return (
      <>
        <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />
        <main className="restaurant-details empty-restaurant">
          <h1>Restaurant not found</h1>
          <Link to="/restaurants">Browse restaurants</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <main className="restaurant-details">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="restaurant-details-content">
          <p>{restaurant.location}</p>
          <h1>{restaurant.name}</h1>
          <span>{restaurant.vibe}</span>
          <Link to="/restaurants">Back to restaurants</Link>
        </div>
      </main>
    </>
  );
}
