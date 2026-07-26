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
        <main className="empty-restaurant">
          <h1>Restaurant not found</h1>
          <Link to="/restaurants" className="btn-primary">
            Browse Restaurants
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />

      <div className="restaurant-details-container">
        <main className="restaurant-details">
          <img src={restaurant.image} alt={restaurant.name} />

          <div className="restaurant-details-content">
            <p className="location">{restaurant.location}</p>

            <h1>{restaurant.name}</h1>

            <span className="vibe-tag">{restaurant.vibe}</span>

            <p className="rating">
              <span className="star">★</span> {restaurant.rating}
            </p>

            <div className="buttons">
              <Link to="/restaurants" className="btn-secondary">
                Back to Restaurants
              </Link>
              <Link to={`/restaurants/${slug}/map`} className="btn-primary">
                View Interactive Floor Map
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
