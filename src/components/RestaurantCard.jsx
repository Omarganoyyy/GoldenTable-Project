import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import './RestaurantCard.css';
import { useState } from "react";

export function RestaurantCard({ name, location, image, vibe, slug }) {

    const [favorite,setFavorite]=useState(false)

    const toggleFavorite=()=>
    {
        setFavorite((prev) => !prev)
    }

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
            
            <button onClick={toggleFavorite} className="favorite-btn" aria-label="Favorite restaurant">
              <Heart className="heart-icon" 
                fill={favorite ? "#d4af37" : "none"} 
                color={favorite ? "#d4af37" : "#9c8f6f"}
              />
            </button>
          </div>
        </div>

        <Link className="view-btn" to={`/restaurants/${slug}`}>View Tables</Link>
      </div>
    </>
  );
}