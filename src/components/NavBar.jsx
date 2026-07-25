import { House, Search, User, Heart, Info } from "lucide-react";
import "./NavBar.css";
import { useState } from "react";
import { SearchComponent } from "./SearchComponent";
import { Link } from "react-router-dom";

export function NavBar({ FeaturedRestaurantsRef , searchInput , setSearchInput}) {
  const [search, setSearch] = useState(false);

  const toggleSearch = () => {
    setSearch((prev) => !prev);
  };

  const scrollToContact = () => {
    FeaturedRestaurantsRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };


  return (
    <div className="nav-bar">
      <div className="left-side">
        <Link to={'/'}><img src="/logo-png.png" alt="Logo" /></Link>
      </div>

      <div className="center">
        <Link to={'/'}><img src="/text-png.png" alt="Logo Text" /></Link>
      </div>

      <div className="right-side">
        <ul>
          <li>
            <Link to={'/'} aria-label="Home"><House /></Link>
          </li>

          <li>
            <Link onClick={toggleSearch} aria-label="Search">
              <Search />
            </Link>
          </li>

          <li>
            <Link aria-label="User"><User /></Link>
          </li>

          <li>
            <Link aria-label="Favorites"><Heart /></Link>
          </li>

          <li>
            <Link onClick={scrollToContact} aria-label="Info">
              <Info />
            </Link>
          </li>
        </ul>
      </div>

      {search && <SearchComponent onClose={() => setSearch(false)} searchInput={searchInput} setSearchInput={setSearchInput}/>}


    </div>
  );
}