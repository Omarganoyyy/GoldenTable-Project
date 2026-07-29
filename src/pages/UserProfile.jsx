import { userData } from "../../Backend/UserData";
import { RestaurantsPageData } from "../../Backend/RestaurantsPageData";
import { Settings } from "lucide-react";
import "./UserProfile.css";
import { Link } from "react-router-dom";

export function UserProfile() {
    return (
        <div className="profile-container">
            {/* Header */}
            <div className="header">
                <div className="left-header-side">
                    <img
                        src={userData.profile.avatarUrl}
                        alt={userData.profile.initials}
                    />
                    <div className="left-text-details">
                        <p>{userData.profile.name}</p>
                        <p>Member since {userData.profile.memberSince}</p>
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
                    {userData.upcomingReservations.map((restaurant) => (
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
                    {userData.favoriteRestaurants.map((restaurant) => {
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
                {userData.reservationHistory.map((restaurant) => (
                    <div key={restaurant.id} className="reservation-history">
                        <p>{restaurant.restaurantName}</p>
                        <p>{restaurant.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
