import { RestaurantsPageData } from "../../Backend/RestaurantsPageData";
import { Settings } from "lucide-react";
import "./UserProfile.css";
import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export function UserProfile({ searchInput, setSearchInput, user }) {
    return (

        <>

            <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />

            <div className="profile-container">
                {/* Header */}
                <div className="header">
                    <div className="left-header-side">
                        <img
                            src={user.profile.avatarUrl}
                            alt={user.profile.initials}
                        />
                        <div className="left-text-details">
                            <p>{user.profile.name}</p>
                            <p>Member since {user.profile.memberSince}</p>
                        </div>
                    </div>

                    <div className="right-header-side">
                        <button>
                            <Settings /> Edit Profile
                        </button>
                    </div>
                </div>

                {/* Upcoming Reservations */}
                <div className="middle-part">
                    <h3>Upcoming Reservations</h3>
                    <div className="upcoming-reservations">
                        {user.upcomingReservations.map((restaurant) => (
                            <div key={restaurant.id} className="reservation-row">
                                <p>{restaurant.restaurantName}</p>
                                <p>
                                    {restaurant.displayDate} - {restaurant.table} - {restaurant.guests} guests
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Favorite Restaurants */}
                <div className="lower-middle-part">
                    <h3>Favorite Restaurants</h3>
                    <div className="favourite-restaurants">
                        {user.favoriteRestaurants.map((restaurant) => {
                            const slug =
                                restaurant.slug ||
                                RestaurantsPageData.find((item) => item.name === restaurant.name)?.slug;
                            return (
                                <div key={restaurant.id} className="favorite-item">
                                    <Link to={slug ? `/restaurants/${slug}` : "/restaurants"}>
                                        {restaurant.name}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Reservation History */}
                <div className="history-section">
                    <h3>Reservation History</h3>
                    {user.reservationHistory.map((restaurant) => (
                        <div key={restaurant.id} className="reservation-history">
                            <p>{restaurant.restaurantName}</p>
                            <p>{restaurant.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
