import { useRef } from "react";
import { NavBar } from "../components/NavBar";
import "./HomePage.css";
import { Hero } from "../components/Hero";
import { FeaturedRestaurants } from "../components/FeaturedRestaurants";
import { HowItWorks } from "../components/HowItWorks";
import { useState } from "react";

export function HomePage() {

    const FeaturedRestaurantsRef = useRef(null);

    const [searchInput,setSearchInput]=useState('')

    return (
        <>

            <NavBar FeaturedRestaurantsRef={FeaturedRestaurantsRef} searchInput={searchInput} setSearchInput={setSearchInput}/>

            <Hero />

            <FeaturedRestaurants FeaturedRestaurantsRef={FeaturedRestaurantsRef} searchInput={searchInput}/>

            <HowItWorks/>
        </>
    );
}