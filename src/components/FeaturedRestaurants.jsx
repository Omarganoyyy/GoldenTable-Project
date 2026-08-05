import { Link } from 'react-router-dom';
import { RestaurantCard } from './RestaurantCard';
import './FeaturedRestaurants.css';
import { featuredRestaurants } from "../../Backend/FeaturedRestaurants";


export function FeaturedRestaurants({ FeaturedRestaurantsRef, favoriteSlugs = [], onToggleFavorite }) {


    return (
        <section ref={FeaturedRestaurantsRef} className="featured-restaurtants-section">

            <div className="featured-restaurants-title">

                <p>Tailored for Your Taste</p>

                <h3>Featured restaurants</h3>

            </div>

            <div className="featured-restaurtants-grid">


                {featuredRestaurants.map((restaurant) => {
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
                })}
            </div>

            <div className="button">
                <Link to='/restaurants'>EXPLORE RESTAURANTS</Link>
            </div>

        </section>
    );
}