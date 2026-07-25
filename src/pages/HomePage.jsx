import { useRef } from "react";
import { NavBar } from "../components/NavBar";
import "./HomePage.css";
import { Hero } from "../components/Hero";
import { FeaturedRestaurants } from "../components/FeaturedRestaurants";
import { HowItWorks } from "../components/HowItWorks";

export function HomePage({searchInput,setSearchInput}) {

    const FeaturedRestaurantsRef = useRef(null);

    return (
        <>

            <NavBar FeaturedRestaurantsRef={FeaturedRestaurantsRef} searchInput={searchInput} setSearchInput={setSearchInput}/>

            <Hero />

            <FeaturedRestaurants FeaturedRestaurantsRef={FeaturedRestaurantsRef}/>

            <HowItWorks/>
        </>
    );
}