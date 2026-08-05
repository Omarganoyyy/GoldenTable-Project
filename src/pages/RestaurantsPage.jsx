import { RestaurantsPageData } from "../../Backend/RestaurantsPageData";
import { NavBar } from "../components/NavBar";
import { RestaurantCard } from "../components/RestaurantCard";
import './RestaurantsPage.css';

export function RestaurantsPage({ searchInput = "", setSearchInput, favoriteSlugs = [], onToggleFavorite }) {
    // 1. Convert to lowercase & trim whitespace safely
    const query = searchInput?.trim().toLowerCase() || "";

    // 2. Filter restaurants safely with optional chaining
    const filteredRestaurants = RestaurantsPageData.filter((restaurant) => {
        if (!query) return true;

        const nameMatch = restaurant.name?.toLowerCase().includes(query);
        const locationMatch = restaurant.location?.toLowerCase().includes(query);

        return nameMatch || locationMatch;
    });

    return (
        <>
            <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />

            <div className="restaurants-section">
                <div className="title-section">
                    <h3>BROWSE & RESERVE TABLES</h3>
                </div>

                <div className="restaurants-grid">
                    {/* 3. Render cards or empty message */}
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => {
                            const isFavorite = favoriteSlugs.includes(restaurant.slug);
                            return (
                                <RestaurantCard
                                    key={restaurant.slug}
                                    name={restaurant.name}
                                    location={restaurant.location}
                                    image={restaurant.image}
                                    vibe={restaurant.vibe}
                                    slug={restaurant.slug}
                                    rating={restaurant.rating}
                                    favorite={isFavorite}
                                    onToggleFavorite={() => onToggleFavorite(restaurant)}
                                />
                            );
                        })
                    ) : (
                        <p className="no-results">No restaurants found matching "{searchInput}"</p>
                    )}
                </div>
            </div>
        </>
    );
}