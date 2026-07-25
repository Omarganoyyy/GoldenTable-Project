import { X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RestaurantsPageData } from "../../Backend/RestaurantsPageData";
import "./SearchComponent.css";

export function SearchComponent({ onClose , setSearchInput ,searchInput}) {
  const navigate = useNavigate();
  const query = searchInput.trim().toLowerCase();
  const suggestions = query
    ? RestaurantsPageData.filter(({ name, location }) =>
        name.toLowerCase().includes(query) || location.toLowerCase().includes(query)
      ).slice(0, 5)
    : [];

  const closeSearch = () => {
    setSearchInput("");
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    closeSearch();
    navigate("/restaurants");
  };

  const openRestaurant = (slug) => {
    setSearchInput("");
    onClose();
    navigate(`/restaurants/${slug}`);
  };

  return (
    /* Clicking backdrop closes the search screen */
    <div className="search-overlay-backdrop" onClick={closeSearch}>
      
      {/* stopPropagation prevents clicks INSIDE the modal from closing it */}
      <div 
        className="search-screen-container" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={closeSearch} aria-label="Close search">
          <X />
        </button>

        <form className="input-component" onSubmit={handleSubmit}>
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search restaurants, locations..." 
              autoFocus 
              onChange={(e)=>setSearchInput(e.target.value)}
              value={searchInput}
            />
          </div>
          <button className="search-submit-btn" type="submit">Search</button>
        </form>

        {suggestions.length > 0 && (
          <section className="search-suggestions" aria-label="Restaurant suggestions">
            <p className="suggestions-title">Suggestions</p>
            {suggestions.map((restaurant) => (
              <button
                className="suggestion-item"
                key={restaurant.slug}
                type="button"
                onClick={() => openRestaurant(restaurant.slug)}
              >
                <span>{restaurant.name}</span>
                <small>{restaurant.location}</small>
              </button>
            ))}
          </section>
        )}
      </div>

    </div>
  );
}
