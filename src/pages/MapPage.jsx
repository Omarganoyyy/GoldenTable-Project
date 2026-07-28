import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RestaurantsPageData } from "../../Backend/RestaurantsPageData";
import { ReservationPageDate } from "../../Backend/ReservationPageData";
import { NavBar } from "../components/NavBar";
import "./MapPage.css";

function parseHour(timeStr) {
  if (!timeStr) return 12;
  const [time, modifier] = timeStr.split(" ");
  let hours = parseInt(time.split(":")[0], 10);
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;
  return hours;
}

function formatHour(hour) {
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour >= 12 && hour < 24 ? "PM" : "AM";
  return `${displayHour}:00 ${period}`;
}

function generateTimeSlots(openStr, closeStr) {
  const startHour = parseHour(openStr);
  let endHour = parseHour(closeStr);
  if (endHour <= startHour) endHour += 24;

  return Array.from({ length: endHour - startHour }, (_, index) => {
    const hour = startHour + index;
    return `${formatHour(hour % 24)} → ${formatHour((hour + 1) % 24)}`;
  });
}

export function MapPage({ searchInput, setSearchInput }) {
  const { slug } = useParams();
  const restaurantData = RestaurantsPageData.find((item) => item.slug === slug);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);

  if (!restaurantData) {
    return <><NavBar searchInput={searchInput} setSearchInput={setSearchInput} /><main className="empty-restaurant"><h1>Restaurant not found</h1><Link to="/restaurants" className="btn-primary">Browse Restaurants</Link></main></>;
  }

  const timeSlots = generateTimeSlots(restaurantData.openingTime, restaurantData.closingTime);

  return (
    <>
      <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <main className="map-page-container">
        <header className="map-page-heading">
          <Link to={`/restaurants/${slug}`} className="map-back-link">← Back to restaurant</Link>
          <p className="map-page-location">{restaurantData.location}</p>
          <h1>Reserve your table at {restaurantData.name}</h1>
          <p>Choose a date and arrival time, then select your preferred table from the floor plan.</p>
        </header>

        <section className="reservation-layout" aria-label="Reservation selection">
          <div className="map-panel">
            <div className="map-panel-heading">
              <div><p className="map-eyebrow">Floor plan</p><h2>Find your perfect setting</h2></div>
              <span className="map-legend"><i /> Available tables</span>
            </div>
            <div className="map-image">
              {restaurantData.map ? (
                <img src={restaurantData.map} alt={`${restaurantData.name} floor map`} />
              ) : (
                <div className="map-unavailable">
                  <span>Floor plan coming soon</span>
                  <p>{restaurantData.name}'s floor plan will appear here once it is added.</p>
                </div>
              )}
            </div>
          </div>

          <aside className="date-time-icons">
            <div className="reservation-step">
              <p className="map-eyebrow">Step 1</p><h2>Select a date</h2>
              <div className="date-icons">
                {ReservationPageDate.map((dateItem, index) => <button key={`${dateItem.month}-${dateItem.day}`} className={`date-btn ${selectedDate === index ? "is-selected" : ""}`} onClick={() => setSelectedDate(index)} aria-pressed={selectedDate === index}><span>{index === 0 ? "Today" : index === 1 ? "Tomorrow" : "Date"}</span><strong>{dateItem.month}/{dateItem.day}</strong></button>)}
              </div>
            </div>
            <div className="reservation-step">
              <p className="map-eyebrow">Step 2</p><h2>Select an arrival time</h2>
              <div className="time-icons">
                {timeSlots.map((slot) => <button key={slot} className={`time-slot-btn ${selectedTime === slot ? "is-selected" : ""}`} onClick={() => setSelectedTime(slot)} aria-pressed={selectedTime === slot}>{slot}</button>)}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
