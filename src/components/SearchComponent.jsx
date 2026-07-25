import { X, Search } from "lucide-react";
import "./SearchComponent.css";

export function SearchComponent({ onClose , setSearchInput ,searchInput}) {


  return (
    /* Clicking backdrop closes the search screen */
    <div className="search-overlay-backdrop" onClick={onClose}>
      
      {/* stopPropagation prevents clicks INSIDE the modal from closing it */}
      <div 
        className="search-screen-container" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose} aria-label="Close search">
          <X />
        </button>

        <div className="input-component">
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
        </div>
      </div>

    </div>
  );
}