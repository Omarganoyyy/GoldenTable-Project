import { Link } from 'react-router-dom';
import { RestaurantCard } from './RestaurantCard';
import './FeaturedRestaurants.css';
import { featuredRestaurants } from "../../Backend/FeaturedRestaurants";


export function FeaturedRestaurants({ FeaturedRestaurantsRef, searchInput='' }) {

    const filteredRestaurants = featuredRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <section ref={FeaturedRestaurantsRef} className="featured-restaurtants-section">

            <div className="featured-restaurants-title">

                <p>Tailored for Your Taste</p>

                <h3>Featured restaurants</h3>

            </div>

            <div className="featured-restaurtants-grid">


                {filteredRestaurants.map((restaurant) =>
                (
                    <RestaurantCard
                        key={restaurant.slug}
                        name={restaurant.name}
                        location={restaurant.location}
                        image={restaurant.image}
                        vibe={restaurant.vibe}
                        slug={restaurant.slug}
                    />
                ))}
            </div>

            <div className="button">
                <Link to='/restaurants'>EXPLORE RESTAURANTS</Link>
            </div>

        </section>
    );
}