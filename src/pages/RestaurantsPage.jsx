import { RestaurantsPageData } from "../../Backend/RestaurantsPageData"
import { NavBar } from "../components/NavBar"
import { RestaurantCard } from "../components/RestaurantCard"
import './RestaurantsPage.css'

export function RestaurantsPage()
{
    return(
        <>
        <NavBar />

        <div className="restaurants-section">
            <div className="title-section">
                <h3>BROWSE & RESERVE TABLES</h3>
            </div>

            <div className="restaurants-grid">
                {RestaurantsPageData.map((restaurant)=>
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

        </div>
        </>
    )
}