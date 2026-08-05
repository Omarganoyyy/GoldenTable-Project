import { useRef } from "react";
import { NavBar } from "../components/NavBar";
import "./HomePage.css";
import { Hero } from "../components/Hero";
import { FeaturedRestaurants } from "../components/FeaturedRestaurants";
import { HowItWorks } from "../components/HowItWorks";

export function HomePage({ searchInput, setSearchInput, favoriteSlugs, onToggleFavorite }) {

    const FeaturedRestaurantsRef = useRef(null);

    const HeroRef = useRef(null)

    return (
        <>

            <NavBar HeroRef={HeroRef} FeaturedRestaurantsRef={FeaturedRestaurantsRef} searchInput={searchInput} setSearchInput={setSearchInput} />

            <Hero HeroRef={HeroRef} />

            <FeaturedRestaurants
                HeroRef={HeroRef}
                FeaturedRestaurantsRef={FeaturedRestaurantsRef}
                favoriteSlugs={favoriteSlugs}
                onToggleFavorite={onToggleFavorite}
            />

            <HowItWorks />
        </>
    );
}