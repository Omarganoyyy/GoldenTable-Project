import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import './RestaurantCard.css';

export function RestaurantCard({ name, location, image, vibe, slug, rating, favorite, onToggleFavorite }) {
  return (
    <>
      <div className="card">

        <div className="card-image">
          <img src={image} alt={name} />
        </div>

        <div className="card-details">
          <p className="name">{name}</p>
          <p className="location">{location}</p>

          <div className="vibe-container">
            <p className="vibe">{vibe}</p>

            <button onClick={onToggleFavorite} className="favorite-btn" aria-label="Favorite restaurant">
              <Heart className="heart-icon"
                fill={favorite ? "#d4af37" : "none"}
                color={favorite ? "#d4af37" : "#9c8f6f"}
              />
            </button>
          </div>

          <div className="rating">
            <p>★ {rating ?? "N/A"}</p>
          </div>

        </div>

        <Link className="view-btn" to={`/restaurants/${slug}`}>View Tables</Link>
      </div>
    </>
  );
}
