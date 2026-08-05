# GoldenTable Project — Complete Technical Architecture Report

## 1. Project Overview

GoldenTable is a front-end restaurant-table reservation application. It lets a visitor:

1. Land on a luxury-themed home page.
2. Browse featured restaurants or navigate to the full restaurant catalogue.
3. Search restaurants by name or location through a global search overlay.
4. Open a restaurant details page.
5. Open a reservation/floor-map page for that restaurant.
6. Select a date and arrival time.
7. View a mock user profile with reservations, favourites, and reservation history.

The business concept is a premium restaurant discovery and reservation experience focused on helping diners choose not only a restaurant but eventually a specific physical table—such as a window seat, booth, or bar seat.

The current project goal is primarily UI and interaction prototyping. It uses local JavaScript mock data instead of an API, authentication system, database, real-time availability service, or completed reservation submission flow.

The application is a React 19 single-page application built with Vite. Routing uses React Router’s `HashRouter`, so deployed URLs use hashes, for example:

```text
#/restaurants
#/restaurants/maison-dore
#/restaurants/maison-dore/map
```

---

## 2. Full Folder Structure

This tree lists all authored, tracked, and active static files in the working project. `node_modules/` and `dist/` are generated dependency/build directories and are excluded from the authored-source tree. `.git/` is Git metadata.

```text
GoldenTable-Project/
├── .git/
├── .gitignore
├── Backend/
│   ├── FeaturedRestaurants.js
│   ├── ReservationPageData.js
│   ├── RestaurantsPageData.js
│   └── UserData.js
├── dist/                              # Generated Vite output; ignored by Git
│   ├── assets/
│   │   ├── index-DYOe6UCK.css
│   │   └── index-HgAEM_5r.js
│   ├── index.html
│   ├── logo-png.png
│   ├── restaurant-images/
│   │   ├── Maison-Dore.jpg
│   │   ├── Nobu.jpg
│   │   ├── Pier88.webp
│   │   └── sample-map.png
│   ├── table-png.png
│   └── text-png.png
├── eslint.config.js
├── index.html
├── node_modules/                      # Installed dependencies; ignored by Git
├── package-lock.json
├── package.json
├── public/
│   ├── logo-png.png                   # Tracked as logo-png.PNG; Windows is case-insensitive
│   ├── restaurant-images/
│   │   ├── Maison-Dore.jpg
│   │   ├── Nobu.jpg
│   │   ├── Pier88.webp
│   │   └── sample-map.png
│   ├── table-png.png
│   └── text-png.png
├── README.md
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── FeaturedRestaurants.css
│   │   ├── FeaturedRestaurants.jsx
│   │   ├── Hero.jsx
│   │   ├── HowItWorks.css
│   │   ├── HowItWorks.jsx
│   │   ├── NavBar.css
│   │   ├── NavBar.jsx
│   │   ├── RestaurantCard.css
│   │   ├── RestaurantCard.jsx
│   │   ├── SearchComponent.css
│   │   └── SearchComponent.jsx
│   ├── index.css
│   ├── main.jsx
│   └── pages/
│       ├── HomePage.css
│       ├── HomePage.jsx
│       ├── MapPage.css
│       ├── MapPage.jsx
│       ├── RestaurantDetailsPage.css
│       ├── RestaurantDetailsPage.jsx
│       ├── RestaurantsPage.css
│       ├── RestaurantsPage.jsx
│       ├── UserProfile.css
│       └── UserProfile.jsx
└── vite.config.js
```

Working-tree note: `src/App.css` is tracked in Git but currently deleted locally. It is not imported by `App.jsx` and therefore has no runtime effect. Several JSX/CSS files have uncommitted local modifications.

---

## 3. Every File Explained

### Root and tooling files

#### `.gitignore`

Purpose: prevents generated, local, platform-specific, and editor-specific files from being committed.

Ignored categories:

- Logs: `logs`, `*.log`, package-manager debug logs.
- Dependencies and builds: `node_modules`, `dist`, `dist-ssr`.
- Environment/local files: `*.local`.
- Editor files: `.vscode/*` except `extensions.json`, `.idea`.
- OS and IDE artifacts: `.DS_Store`, Visual Studio files, swap files.

Exports/imports: none.

#### `package.json`

Purpose: project manifest, dependencies, scripts, and GitHub Pages deployment configuration.

Important fields:

- `name`: `goldentable-project`
- `private`: prevents accidental publication to npm.
- `type`: `module`, enabling ES-module syntax.
- `homepage`: `https://omarganoyyy.github.io/GoldenTable-Project`

Scripts:

- `npm run dev`: starts Vite’s development server.
- `npm run build`: generates production assets in `dist/`.
- `npm run lint`: runs ESLint over the repository.
- `npm run preview`: serves the production build locally.
- `npm run predeploy`: builds before deployment.
- `npm run deploy`: deploys `dist/` to GitHub Pages through `gh-pages`.

Runtime dependencies:

- `react`
- `react-dom`
- `react-router-dom`
- `lucide-react`

Development dependencies:

- Vite and its React plugin.
- ESLint, React Hooks linting, React Refresh linting.
- `gh-pages`.
- React type packages, although the application itself is JavaScript/JSX rather than TypeScript.

#### `package-lock.json`

Purpose: npm-generated lock file.

It records exact resolved package versions and dependency integrity hashes, ensuring consistent installations across machines and CI. It has no application exports and should not be edited manually.

#### `vite.config.js`

Purpose: Vite build configuration.

Imports:

- `defineConfig` from `vite`.
- `react` from `@vitejs/plugin-react`.

Exports: default Vite configuration.

Important configuration:

- `base: '/GoldenTable-Project/'` configures asset and route base paths for the GitHub Pages repository deployment.
- `plugins: [react()]` enables JSX/React support.

This base path is why public images are referenced with:

```js
import.meta.env.BASE_URL
```

#### `eslint.config.js`

Purpose: flat ESLint configuration.

Imports:

- Base JavaScript rules from `@eslint/js`.
- Browser globals from `globals`.
- React Hooks ESLint rules.
- React Refresh ESLint rules.
- `defineConfig` and `globalIgnores`.

Exports: default ESLint flat configuration.

Behavior:

- Ignores `dist/`.
- Lints `.js` and `.jsx`.
- Uses recommended JavaScript, React Hooks, and Vite React Refresh rule sets.
- Enables JSX parsing.
- Declares browser globals.

Current lint result:

```text
src/pages/UserProfile.jsx
  'favorite' is defined but never used
  'setFavorite' is defined but never used
```

#### `index.html`

Purpose: browser HTML shell for the Vite application.

Important elements:

- Root mount point: `<div id="root"></div>`.
- Loads `src/main.jsx` as an ES module.
- Defines favicon as `/logo-png.png`.
- Sets document title to `goldentable-project`.
- Includes responsive viewport metadata.

#### `README.md`

Purpose: unchanged generic Vite React template documentation.

It explains Vite React plugins and React Compiler background. It does not document GoldenTable-specific setup, architecture, data, routes, or business behavior.

---

### Backend mock-data files

#### `Backend/FeaturedRestaurants.js`

Purpose: supplies the four restaurants rendered in the home-page featured section.

Exports:

```js
featuredRestaurants
```

Each object contains:

- `name`
- `location`
- `vibe`
- `rating`
- `slug`
- `image`

Records:

- Maison Doré
- Nobu
- Pier88
- Sachi

Usage flow:

```text
featuredRestaurants
  → FeaturedRestaurants
  → RestaurantCard
```

Asset handling:

- Maison Doré, Nobu, and Pier88 use public assets prefixed with `import.meta.env.BASE_URL`.
- Sachi uses an external Unsplash URL.

#### `Backend/RestaurantsPageData.js`

Purpose: primary mock restaurant catalogue and the application’s source of truth for restaurant lookup by slug.

Exports:

```js
RestaurantsPageData
```

It contains 13 restaurants:

- Maison Doré
- Nobu
- Auric
- Pier88
- Sachi
- Izakaya
- Kazoku
- Revolver
- Baky Hospitality - Lexie’s
- Zuma
- Smokery
- Crimson Bar & Grill
- Coya

Every restaurant has:

- `name`: display name.
- `location`: city/neighborhood displayed in cards, details, search, and map page.
- `vibe`: cuisine/style descriptor.
- `rating`: numeric rating.
- `slug`: URL-safe restaurant identifier and lookup key.
- `image`: restaurant image URL or public asset path.
- `openingTime`: restaurant opening hour.
- `closingTime`: restaurant closing hour.

Only Maison Doré also contains:

- `map`: local `sample-map.png` path used by `MapPage`.

Usage flow:

```text
RestaurantsPageData
  ├── RestaurantsPage → filteredRestaurant list → RestaurantCard
  ├── SearchComponent → suggestions
  ├── RestaurantDetailsPage → find by URL slug
  ├── MapPage → find by URL slug + opening/closing hours + map
  └── UserProfile → fallback name-to-slug lookup
```

#### `Backend/ReservationPageData.js`

Purpose: creates the seven selectable reservation dates used in `MapPage`.

Exports:

```js
getOffsetDate(daysAhead)
ReservationPageDate
```

`getOffsetDate(daysAhead)`:

- Creates a `Date` for the current client date.
- Adds `daysAhead`.
- Returns an object:

```js
{
  month: number,
  day: number
}
```

`ReservationPageDate` is an array of seven objects generated at module evaluation time:

- today
- tomorrow
- five additional consecutive days

Important limitation: it has no year, weekday, availability, timezone normalization, or persistence. It changes when the module is evaluated/reloaded.

Usage flow:

```text
ReservationPageDate
  → MapPage
  → date selection buttons
```

#### `Backend/UserData.js`

Purpose: mock authenticated-user/profile data and initial favourites source.

Exports:

```js
userData
```

Top-level properties:

- `credentials`
  - `email`
  - `password`
- `profile`
  - `id`
  - `name`
  - `email`
  - `initials`
  - `memberSince`
  - `avatarUrl`
- `upcomingReservations`
- `favoriteRestaurants`
- `accountSettings`
- `reservationHistory`

`upcomingReservations` objects contain:

- `id`
- `restaurantName`
- `date`
- `displayDate`
- `table`
- `guests`
- `status`

`favoriteRestaurants` objects contain:

- `id`
- `name`
- `slug`

`accountSettings` contains mock email preference and two-factor settings, but no UI currently reads them.

`reservationHistory` objects contain:

- `id`
- `restaurantName`
- `date`
- `displayDate`
- `status`

Usage flow:

```text
userData
  ├── App → initial value for favorite state
  └── UserProfile → profile, reservations, favourites, history
```

Important: `UserProfile` reads `userData.favoriteRestaurants` directly. It does not render the lifted `favorite` prop from `App`.

---

### Application entry files

#### `src/main.jsx`

Purpose: client-side application bootstrap.

Imports:

- `StrictMode` from React.
- `createRoot` from React DOM.
- global CSS from `./index.css`.
- default `App`.
- `HashRouter` from React Router.

Behavior:

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)
```

Effects:

- Mounts React into `#root`.
- Enables development-only React Strict Mode checks.
- Makes all `Link`, `Routes`, `Route`, `useNavigate`, and `useParams` calls work.
- Uses hash routing, avoiding server-side GitHub Pages route-rewrite requirements.

Exports: none.

#### `src/App.jsx`

Purpose: top-level route owner and owner of shared search and attempted favourite state.

Imports:

- `Routes`, `Route` from React Router.
- `useState` from React.
- Page components:
  - `HomePage`
  - `RestaurantsPage`
  - `RestaurantDetailsPage`
  - `MapPage`
  - `UserProfile`
- `userData` mock data.

Exports:

```js
export default App
```

State:

```js
const [searchInput, setSearchInput] = useState("")
const [favorite, setFavorite] = useState(userData)
```

`searchInput`:

- Starts as an empty string.
- Is the shared global search query.
- Is passed to every page route, directly or indirectly to `NavBar` and `SearchComponent`.

`favorite`:

- Starts as the entire `userData` object, not a boolean, slug array, or favourites array.
- Is passed to `HomePage`, `RestaurantsPage`, and `UserProfile`.
- Is intended to support lifted favourites state.
- It is not correctly propagated to `RestaurantCard` in the current implementation.
- Because objects are truthy, if this value reached a card every card would initially appear favourited.
- `RestaurantCard` changes it to a boolean using `setFavorite(prev => !prev)`, destroying the object shape after the first click.
- `UserProfile` receives it but does not use it.

Routes rendered:

- `/` → `HomePage`
- `/restaurants` → `RestaurantsPage`
- `/restaurants/:slug` → `RestaurantDetailsPage`
- `/restaurants/:slug/map` → `MapPage`
- `/profile` → `UserProfile`

#### `src/index.css`

Purpose: minimal global CSS reset.

Rules:

- Applies zero margin/padding and `box-sizing: border-box` to all elements and pseudo-elements.
- Sets global `font-family: sans-serif`.
- Enables smooth HTML scrolling.
- Ensures images cannot exceed their parent width.

This file is imported once by `main.jsx`.

#### `src/App.css`

Purpose: previously tracked application stylesheet.

Current status: deleted from the working tree and not imported by `App.jsx`. It has no active effect.

---

### Reusable component files

#### `src/components/NavBar.jsx`

Purpose: shared sticky navigation bar, page navigation, home-page section scrolling, and search-overlay toggle owner.

Imports:

- Lucide icons: `House`, `Search`, `User`, `Info`.
- `useState`.
- `Link`.
- `SearchComponent`.
- `NavBar.css`.

Exports:

```js
export function NavBar(...)
```

Props received:

- `HeroRef`: optional React ref to the home-page hero DOM element.
- `FeaturedRestaurantsRef`: optional React ref to the featured section DOM element.
- `searchInput`: shared query string.
- `setSearchInput`: shared query setter.

State:

```js
const [search, setSearch] = useState(false)
```

- Default: `false`.
- Changes when the search icon is clicked.
- Determines whether `SearchComponent` is rendered.

Functions:

- `toggleSearch()`: toggles the overlay visibility.
- `scrollToContact()`: calls `FeaturedRestaurantsRef?.current?.scrollIntoView(...)`.
- `scrollToHero()`: calls `HeroRef?.current?.scrollIntoView(...)`.

Rendered navigation:

- Logo image wrapped in `Link to="/"`.
- Wordmark image wrapped in `Link to="/"`.
- House icon: `Link to="/"`; it additionally calls `scrollToHero`.
- Search icon: a `Link` without a `to` prop; it toggles search.
- User icon: `Link to="/profile"`.
- Info icon: a `Link` without a `to` prop; it calls `scrollToContact`.

Children:

```text
SearchComponent, conditionally
```

Important cross-route behavior:

- On `HomePage`, refs are provided, so Home/Info can smooth-scroll to sections.
- On non-home routes, refs are `undefined`, so these optional-chain calls do nothing.
- The Home icon still navigates to `/`; the scroll occurs before the target home DOM is mounted, so it does not reliably scroll to the hero after navigation.
- Search and Info use `Link` without `to`, which is not appropriate semantic routing usage. Buttons would be more correct.

#### `src/components/SearchComponent.jsx`

Purpose: modal search UI and search navigation controller.

Imports:

- `X`, `Search` from Lucide.
- `useNavigate`.
- `RestaurantsPageData`.
- `SearchComponent.css`.

Exports:

```js
export function SearchComponent(...)
```

Props received:

- `onClose`: callback supplied by `NavBar`; normally sets NavBar’s `search` state to `false`.
- `searchInput`: shared string from `App`.
- `setSearchInput`: shared setter from `App`.

Hook:

```js
const navigate = useNavigate()
```

Derived values:

```js
const query = searchInput.trim().toLowerCase()
```

```js
const suggestions = query
  ? RestaurantsPageData
      .filter(({ name, location }) =>
        name.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query)
      )
      .slice(0, 5)
  : []
```

Functions:

- `closeSearch()`
  - Clears `searchInput`.
  - Calls `onClose()`.
- `handleSubmit(event)`
  - Prevents form submit page reload.
  - Calls `closeSearch()`.
  - Navigates to `/restaurants`.
- `openRestaurant(slug)`
  - Clears the query.
  - Closes modal.
  - Navigates directly to `/restaurants/:slug`.

Rendered structure:

```text
search-overlay-backdrop
└── search-screen-container
    ├── close button
    ├── form
    │   ├── controlled text input
    │   └── submit button
    └── suggestions section
        ├── matching restaurant buttons
        └── empty-state text
```

Important search-flow limitation: `handleSubmit` clears the query before navigating. Consequently, `RestaurantsPage` receives an empty query and displays all restaurants rather than the searched results. Suggestion selection works because it navigates directly to a selected details page.

#### `src/components/RestaurantCard.jsx`

Purpose: reusable restaurant preview card with image, restaurant metadata, favourite heart, rating, and details link.

Imports:

- `Link` from React Router.
- `Heart` from Lucide.
- `RestaurantCard.css`.

Exports:

```js
export function RestaurantCard(...)
```

Props received:

- `name`
- `location`
- `image`
- `vibe`
- `slug`
- `rating`
- `favorite`
- `setFavorite`

Behavior:

- Displays provided restaurant information.
- Links to `/restaurants/${slug}` with label “View Tables.”
- Clicking heart calls:

```js
setFavorite((prev) => !prev)
```

Heart appearance:

```js
fill={favorite ? "#d4af37" : "none"}
color={favorite ? "#d4af37" : "#9c8f6f"}
```

Important current defect:

- `RestaurantsPage` does not pass `favorite` or `setFavorite`.
- `FeaturedRestaurants` does not accept or pass them either.
- As a result, clicking any rendered heart invokes `undefined(...)` and throws a runtime error.
- Favourites are not tracked per restaurant; a single boolean could only represent all cards collectively.
- The component needs a per-restaurant representation, normally `favoriteSlugs`/`favoriteRestaurantIds` plus a `toggleFavorite(slug)` callback.

#### `src/components/FeaturedRestaurants.jsx`

Purpose: renders the featured restaurant section on the home page.

Imports:

- `Link`.
- `RestaurantCard`.
- `FeaturedRestaurants.css`.
- `featuredRestaurants`.

Exports:

```js
export function FeaturedRestaurants(...)
```

Props received:

- `FeaturedRestaurantsRef`

It does not receive or forward `favorite` and `setFavorite`, despite `HomePage` passing these props to it. Those props are silently ignored.

Data flow:

```text
featuredRestaurants.map(...)
  → RestaurantCard
```

Each `RestaurantCard` receives:

- `key`
- `name`
- `location`
- `image`
- `vibe`
- `slug`
- `rating`

The section’s “EXPLORE RESTAURANTS” link navigates to `/restaurants`.

#### `src/components/Hero.jsx`

Purpose: visual landing-page hero.

Imports:

- `Link`.

Exports:

```js
export function Hero({ HeroRef })
```

Props received:

- `HeroRef`

Behavior:

- Attaches `HeroRef` to the root `.hero` element.
- Renders brand copy:
  - “Choose Your Perfect Table.”
  - “Where Every Seat Matters”
- Displays the table visual from:

```js
${import.meta.env.BASE_URL}table-png.png
```

- Renders two links, both to `/restaurants`:
  - “Reserve Now”
  - “Explore Restaurants”

It contains no state or data dependency.

#### `src/components/HowItWorks.jsx`

Purpose: static “How reserving works” informational section.

Imports:

- `Link`.
- Lucide icons: `Search`, `Armchair`, `Check`.
- `HowItWorks.css`.

Exports:

```js
export function HowItWorks()
```

Internal variable:

```js
const steps = [...]
```

Each step contains:

- `id`
- `icon`: JSX Lucide icon element.
- `title`
- `description`

Steps:

1. See it
2. Choose it
3. Reserve it

Each icon is wrapped in a link to `/restaurants`. There is no state, API call, or actual reservation logic.

---

### Page files

#### `src/pages/HomePage.jsx`

Purpose: composition root for the home route.

Imports:

- `useRef`.
- `NavBar`.
- `HomePage.css`.
- `Hero`.
- `FeaturedRestaurants`.
- `HowItWorks`.

Exports:

```js
export function HomePage(...)
```

Props received:

- `searchInput`
- `setSearchInput`
- `favorite`
- `setFavorite`

Refs:

```js
const FeaturedRestaurantsRef = useRef(null)
const HeroRef = useRef(null)
```

Rendered tree:

```text
NavBar
Hero
FeaturedRestaurants
HowItWorks
```

Prop flow:

- `NavBar` receives both refs and shared search props.
- `Hero` receives `HeroRef`.
- `FeaturedRestaurants` receives `HeroRef`, `FeaturedRestaurantsRef`, `favorite`, and `setFavorite`.
- `HowItWorks` receives no props.

Important issue: `FeaturedRestaurants` only destructures `FeaturedRestaurantsRef`; `HeroRef`, `favorite`, and `setFavorite` are not consumed or forwarded.

#### `src/pages/RestaurantsPage.jsx`

Purpose: full browse/search results page.

Imports:

- `RestaurantsPageData`.
- `NavBar`.
- `RestaurantCard`.
- `RestaurantsPage.css`.

Exports:

```js
export function RestaurantsPage({ searchInput = "", setSearchInput })
```

Props received:

- `searchInput`, defaulting to empty string.
- `setSearchInput`.

Derived values:

```js
const query = searchInput?.trim().toLowerCase() || ""
```

```js
const filteredRestaurants = RestaurantsPageData.filter(...)
```

Matching behavior:

- Empty query: returns every restaurant.
- Non-empty query: matches restaurant `name` or `location` case-insensitively.
- Does not match `vibe`, slug, cuisine terms outside the vibe property, rating, or opening hours.

Rendered children:

```text
NavBar
RestaurantCard × filtered result count
```

No-result state:

```text
No restaurants found matching "{searchInput}"
```

Important issue: this component does not accept/pass `favorite` or `setFavorite`, even though `App` passes them into its route element. In React, undeclared props are ignored.

#### `src/pages/RestaurantDetailsPage.jsx`

Purpose: dynamic restaurant details route.

Imports:

- `Link`, `useParams`.
- `RestaurantsPageData`.
- `NavBar`.
- `RestaurantDetailsPage.css`.

Exports:

```js
export function RestaurantDetailsPage({ searchInput, setSearchInput })
```

Props received:

- `searchInput`
- `setSearchInput`

Routing hook:

```js
const { slug } = useParams()
```

Data lookup:

```js
const restaurant = RestaurantsPageData.find(
  (item) => item.slug === slug
)
```

Valid restaurant render:

- Global `NavBar`.
- Restaurant image.
- Location.
- Restaurant name.
- Vibe.
- Rating.
- “Back to Restaurants” link.
- “View Interactive Floor Map” link to `/restaurants/:slug/map`.

Unknown slug fallback:

- Renders `NavBar`.
- Renders “Restaurant not found.”
- Offers a link to `/restaurants`.

No favourites or reservations state is used here.

#### `src/pages/MapPage.jsx`

Purpose: dynamic reservation selection and floor-plan prototype.

Imports:

- `useState`.
- `Link`, `useParams`.
- `RestaurantsPageData`.
- `ReservationPageDate`.
- `NavBar`.
- `MapPage.css`.

Non-exported helper functions:

- `parseHour(timeStr)`
- `formatHour(hour)`
- `generateTimeSlots(openStr, closeStr)`

`parseHour(timeStr)`:

- Returns `12` if the string is empty.
- Parses an hour from a string.
- Supports AM/PM modifier logic if present.

Current data stores 24-hour-like strings such as `"18"` and `"01"` without an AM/PM modifier. The function still parses their hour portion successfully.

`formatHour(hour)`:

- Converts a 24-hour numeric hour into a display string such as `6:00 PM`.

`generateTimeSlots(openStr, closeStr)`:

1. Parses opening and closing hours.
2. If closing hour is numerically less than or equal to opening hour, adds 24 to represent an overnight closing time.
3. Generates one-hour intervals.
4. Produces labels such as:

```text
6:00 PM → 7:00 PM
```

Props received:

- `searchInput`
- `setSearchInput`

Routing:

```js
const { slug } = useParams()
const restaurantData = RestaurantsPageData.find(
  (item) => item.slug === slug
)
```

State:

```js
const [selectedDate, setSelectedDate] = useState(0)
const [selectedTime, setSelectedTime] = useState(null)
```

Valid restaurant render:

```text
NavBar
map-page-container
├── header
│   ├── Back to restaurant link
│   ├── location
│   ├── title
│   └── instruction text
└── reservation-layout
    ├── map-panel
    │   ├── legend
    │   └── map image or “coming soon” placeholder
    └── date-time-icons
        ├── date buttons
        └── time buttons
```

Floor-plan behavior:

- Maison Doré has `map`, so it shows `sample-map.png`.
- All other restaurants lack `map`, so they show “Floor plan coming soon.”

Important limitations:

- No actual clickable table entities.
- No selected table state.
- No guest count.
- No reservation confirmation button.
- No persisted reservation creation.
- No validation requiring date/time/table.
- Selection is purely visual and is lost on refresh/navigation.

#### `src/pages/UserProfile.jsx`

Purpose: mock profile dashboard.

Imports:

- `userData`.
- `RestaurantsPageData`.
- Lucide `Settings`.
- `UserProfile.css`.
- `Link`.
- `NavBar`.

Exports:

```js
export function UserProfile({
  searchInput,
  setSearchInput,
  favorite,
  setFavorite
})
```

Props received:

- `searchInput`
- `setSearchInput`
- `favorite`
- `setFavorite`

Only `searchInput` and `setSearchInput` are used, for `NavBar`. `favorite` and `setFavorite` are unused, producing the current ESLint errors.

Rendered sections:

1. Profile header
   - Avatar.
   - Name.
   - Membership year.
   - Decorative/nonfunctional “Edit Profile” button.

2. Upcoming Reservations
   - Iterates over `userData.upcomingReservations`.
   - Displays restaurant name, formatted date/time, table, and guest count.

3. Favorite Restaurants
   - Iterates over `userData.favoriteRestaurants`.
   - Resolves slug from the favourite object; if no slug existed, it would look up by matching restaurant name in `RestaurantsPageData`.
   - Links each favourite to its restaurant details route.

4. Reservation History
   - Iterates over `userData.reservationHistory`.
   - Displays restaurant name and raw ISO date.

Data source limitation: profile content is static mock data. It is not connected to attempted favourite state in `App`, nor to date/time selections in `MapPage`.

---

### Styling files

#### `src/components/NavBar.css`

Purpose: navigation layout and responsive behavior.

Key behavior:

- Three-column CSS Grid desktop layout: logo, centered wordmark, right icon list.
- Sticky top navigation with `z-index: 1000`.
- Near-black background `#0B0B0B`.
- Gold bottom border and icon colors.
- Small-screen layout collapses the wordmark at widths up to 760px.
- Further shrinks spacing and logo/icons at 600px and 380px.
- Contains a global `button` selector that resets button appearance across the whole application.

#### `src/components/SearchComponent.css`

Purpose: fullscreen search modal styling.

Key behavior:

- Fixed backdrop, `z-index: 2000`, blur/saturation effects.
- Centered modal with glass-like dark background and gold border.
- Controlled-input visual state through `:focus-within`.
- Scrollable suggestion list.
- Fade-in and pop-up animations.
- Mobile sizing uses `100dvh` and safe-area-aware padding.

#### `src/components/RestaurantCard.css`

Purpose: restaurant card layout and heart/button appearance.

Key behavior:

- Defines global `body` background/font and universal reset, affecting more than this component.
- Dark card surface with gold border and lift-on-hover.
- Restaurant image zoom on card hover.
- Card metadata typography and “vibe” pill.
- Heart hover/active transformations.
- Gold “View Tables” action button.
- Mobile card max width and image height adjustment.

#### `src/components/FeaturedRestaurants.css`

Purpose: featured-section layout.

Key behavior:

- Defines a global universal reset and global Playfair font.
- Full-screen-ish section with `scroll-margin-top: 80px`, enabling nav scroll offset.
- Responsive CSS grid of cards.
- Centered section title and “Explore Restaurants” link.
- One-column card grid under 520px.

Class-name note: several class names use the misspelling `restaurtants`, consistently in JSX and CSS, so they work but are harder to maintain.

#### `src/components/HowItWorks.css`

Purpose: styling for the static process section.

Key behavior:

- Dark full-screen section.
- Three-column grid on larger screens; one-column layout below 768px.
- Gold outlined icon circles with hover lift.
- Playfair/Cormorant typography declarations.
- Reusable classes: `.icon-wrapper`, `.step-card`, `.step-title`, `.step-description`.

#### `src/pages/HomePage.css`

Purpose: home hero layout and hero-specific visuals.

Key behavior:

- Imports Google Fonts: Cormorant Garamond and Montserrat.
- Defines hero as a three-column grid on desktop.
- Uses a dark luxury visual style and champagne/gold text.
- CTA links use filled-gold and outlined secondary variants.
- Table image floats with the `float` animation.
- Collapses to a single-column layout below 968px.
- Stacks CTAs below 520px.

#### `src/pages/RestaurantsPage.css`

Purpose: catalogue page layout.

Key behavior:

- Global reset.
- Centered page with responsive padding.
- CSS grid for cards using `repeat(auto-fit, minmax(230px, 1fr))`.
- One-column grid below 520px.

#### `src/pages/RestaurantDetailsPage.css`

Purpose: details-page layout and local CSS tokens.

Key behavior:

- Defines CSS custom properties within `:root`:
  - dark background
  - surface
  - gold tones
  - text colors
  - borders/radii
  - transition speed
- Uses a glassmorphism details card.
- Responsive two-column image/content layout collapsing to one column below 900px.
- Defines `.btn-primary` and `.btn-secondary`.
- Defines `.empty-restaurant` fallback styling, also used by `MapPage` without importing a dedicated shared empty-state stylesheet.

#### `src/pages/MapPage.css`

Purpose: reservation map/date/time layout.

Key behavior:

- Imports Cormorant Garamond and Montserrat.
- Responsive two-column map/control layout; collapses below 850px.
- Map panel, legend, floor-plan image container, and no-map placeholder.
- Date/time button selected states use `.is-selected`.
- One-column time slots below 480px.

#### `src/pages/UserProfile.css`

Purpose: profile dashboard visual design.

Key behavior:

- Centered max-width profile content.
- Glassmorphism header card.
- Avatar and gradient name treatment.
- Reservation cards and history rows.
- Favourite pills linking to restaurant details.
- Styling for the nonfunctional Edit Profile button.

---

### Static assets

#### `public/logo-png.png`

Purpose: GoldenTable logo image shown in the left side of `NavBar` and used as the favicon source.

Usage:

```text
index.html favicon
NavBar left logo
```

#### `public/text-png.png`

Purpose: wordmark image shown in the center of `NavBar`.

Usage:

```text
NavBar center wordmark
```

#### `public/table-png.png`

Purpose: decorative table image in `Hero`.

Usage:

```text
Hero → .hero .table img
```

#### `public/restaurant-images/Maison-Dore.jpg`

Purpose: restaurant image for Maison Doré.

Usage:

```text
FeaturedRestaurants data
RestaurantsPageData
RestaurantCard
RestaurantDetailsPage
```

#### `public/restaurant-images/Nobu.jpg`

Purpose: restaurant image for Nobu.

Usage:

```text
FeaturedRestaurants data
RestaurantsPageData
RestaurantCard
RestaurantDetailsPage
```

#### `public/restaurant-images/Pier88.webp`

Purpose: restaurant image for Pier88.

Usage:

```text
FeaturedRestaurants data
RestaurantsPageData
RestaurantCard
RestaurantDetailsPage
```

#### `public/restaurant-images/sample-map.png`

Purpose: only current floor-plan image.

Usage:

```text
RestaurantsPageData[Maison Doré].map
  → MapPage
```

---

## 4. React Component Tree

```text
main.jsx
└── StrictMode
    └── HashRouter
        └── App
            └── Routes
                ├── "/" → HomePage
                │   ├── NavBar
                │   │   └── SearchComponent (only while local `search` is true)
                │   ├── Hero
                │   ├── FeaturedRestaurants
                │   │   └── RestaurantCard × 4
                │   └── HowItWorks
                │
                ├── "/restaurants" → RestaurantsPage
                │   ├── NavBar
                │   │   └── SearchComponent (conditionally)
                │   └── RestaurantCard × filtered catalogue count
                │
                ├── "/restaurants/:slug" → RestaurantDetailsPage
                │   └── NavBar
                │
                ├── "/restaurants/:slug/map" → MapPage
                │   └── NavBar
                │
                └── "/profile" → UserProfile
                    └── NavBar
```

`RestaurantDetailsPage`, `MapPage`, and `UserProfile` are page components with their own markup rather than child component decomposition.

---

## 5. Routing

| Route | Rendered component | Route parameters | Purpose |
|---|---|---|---|
| `/` | `HomePage` | None | Landing page with hero, featured restaurants, and how-it-works section. |
| `/restaurants` | `RestaurantsPage` | None | Full restaurant catalogue and query filtering. |
| `/restaurants/:slug` | `RestaurantDetailsPage` | `slug` | Shows the restaurant matching `RestaurantsPageData.slug`. |
| `/restaurants/:slug/map` | `MapPage` | `slug` | Reservation UI prototype for the restaurant. |
| `/profile` | `UserProfile` | None | Mock account dashboard. |

Routing implementation details:

- `App.jsx` owns all `<Route>` declarations.
- `main.jsx` wraps `App` in `HashRouter`.
- `Link` handles internal navigation.
- `useParams` retrieves `slug` in details/map pages.
- `useNavigate` performs programmatic navigation in `SearchComponent`.
- Invalid slugs produce an explicit “Restaurant not found” fallback on details and map pages.

---

## 6. State Management

There is no Redux, Zustand, Context API, server-state library, local storage, or persistent state. All state is React local state.

### `App`

#### `searchInput`

```js
const [searchInput, setSearchInput] = useState("")
```

- Default value: empty string.
- Changes through: the controlled input in `SearchComponent`.
- Passed to:
  - `HomePage`
  - `RestaurantsPage`
  - `RestaurantDetailsPage`
  - `MapPage`
  - `UserProfile`
  - then into `NavBar`
  - then into `SearchComponent`
- Why it exists: attempts to preserve the current search query across routes/pages.

Actual flow:

```text
App.searchInput
  ↓
page component
  ↓
NavBar
  ↓
SearchComponent input
```

Search filtering flow:

```text
App.searchInput
  ↓
RestaurantsPage
  ↓
query normalization
  ↓
RestaurantsPageData.filter(...)
  ↓
RestaurantCard list
```

Important flaw: submitting the search overlay calls `closeSearch()`, which clears `searchInput` before navigation. Therefore the browse page does not receive the submitted search text.

#### `favorite`

```js
const [favorite, setFavorite] = useState(userData)
```

- Default value: entire `userData` object.
- Intended purpose: lifted favourite state.
- Passed to:
  - `HomePage`
  - `RestaurantsPage`
  - `UserProfile`

Current actual usage:

```text
App.favorite
  ├── HomePage receives it
  │   └── FeaturedRestaurants receives it as an unused extra prop
  ├── RestaurantsPage receives it as an ignored extra prop
  └── UserProfile receives it but does not use it
```

The state is currently not connected to a visible working feature.

The existing `RestaurantCard` expectation is:

```js
favorite: boolean
setFavorite: setter
```

But a correct favourites architecture needs restaurant-specific state, for example:

```js
const [favoriteSlugs, setFavoriteSlugs] = useState(
  userData.favoriteRestaurants.map((restaurant) => restaurant.slug)
)
```

Each card would receive:

```js
isFavorite={favoriteSlugs.includes(slug)}
onToggleFavorite={() => toggleFavorite(slug)}
```

Then `UserProfile` would render from `favoriteSlugs`, joined to `RestaurantsPageData`, instead of reading static `userData.favoriteRestaurants`.

### `NavBar`

#### `search`

```js
const [search, setSearch] = useState(false)
```

- Default value: `false`.
- Changes through: search icon click and `SearchComponent` close callback.
- Controls: whether the full-screen `SearchComponent` is mounted.
- Exists because overlay open/closed state only concerns the navigation component.

### `MapPage`

#### `selectedDate`

```js
const [selectedDate, setSelectedDate] = useState(0)
```

- Default: `0`, representing today.
- Changes through: date-button click.
- Used to add `.is-selected` and set `aria-pressed`.
- Not passed anywhere.
- Exists only for visual date-selection feedback.

#### `selectedTime`

```js
const [selectedTime, setSelectedTime] = useState(null)
```

- Default: `null`, no selection.
- Changes through: time-slot button click.
- Used to add `.is-selected` and set `aria-pressed`.
- Not passed anywhere.
- Exists only for visual time-selection feedback.

---

## 7. `useRef` Usage

All refs exist in `HomePage`.

### `FeaturedRestaurantsRef`

Creation:

```js
const FeaturedRestaurantsRef = useRef(null)
```

Passed to:

```text
HomePage → NavBar
HomePage → FeaturedRestaurants
```

Attached to:

```jsx
<section ref={FeaturedRestaurantsRef} ...>
```

Referenced DOM element: the `FeaturedRestaurants` root `<section>`.

Feature enabled:

- Clicking NavBar’s Info icon calls `scrollIntoView` on this section.
- CSS `scroll-margin-top: 80px` keeps it from appearing underneath the sticky navigation.

### `HeroRef`

Creation:

```js
const HeroRef = useRef(null)
```

Passed to:

```text
HomePage → NavBar
HomePage → Hero
HomePage → FeaturedRestaurants (unused)
```

Attached to:

```jsx
<div ref={HeroRef} className="hero">
```

Referenced DOM element: the root hero `<div>`.

Feature enabled:

- On the home page, the NavBar Home icon attempts smooth scrolling to the hero.
- It does not work reliably when clicked from another route because that route’s NavBar does not have these refs and navigation happens before the home page mounts.

---

## 8. Data Files

### Restaurant data relationship

```text
FeaturedRestaurants.js
  → featuredRestaurants
  → HomePage / FeaturedRestaurants
  → RestaurantCard

RestaurantsPageData.js
  → RestaurantsPage
  → RestaurantCard
  → RestaurantDetailsPage
  → MapPage
  → SearchComponent
  → UserProfile fallback slug lookup
```

The featured list is separate from the main list. Three featured restaurants overlap with the catalogue; Sachi also overlaps. The data is duplicated rather than derived from one catalogue source.

### Reservation date data relationship

```text
ReservationPageData.js
  → ReservationPageDate
  → MapPage
  → selectable date buttons
```

### User data relationship

```text
UserData.js
  → App initial `favorite` state
  → UserProfile direct mock rendering
```

The App state and profile data do not currently form one coherent data model.

---

## 9. Complete Data Flow

### Searching restaurants

```text
User clicks NavBar search icon
  ↓
NavBar.toggleSearch()
  ↓
NavBar.search becomes true
  ↓
SearchComponent mounts
  ↓
User types into controlled input
  ↓
SearchComponent calls App.setSearchInput(value)
  ↓
App.searchInput changes
  ↓
SearchComponent recomputes suggestions from RestaurantsPageData
```

Suggestion selection:

```text
User clicks suggestion
  ↓
SearchComponent.openRestaurant(slug)
  ↓
search input cleared
  ↓
overlay closed
  ↓
navigate("/restaurants/:slug")
  ↓
RestaurantDetailsPage uses useParams()
  ↓
finds restaurant in RestaurantsPageData
```

Search submission:

```text
User submits search form
  ↓
SearchComponent.handleSubmit()
  ↓
closeSearch() clears App.searchInput
  ↓
navigate("/restaurants")
  ↓
RestaurantsPage sees empty query
  ↓
all restaurants are shown
```

The intended filtered-results behavior is not currently achieved because the query is cleared too early.

### Selecting a restaurant

From a card:

```text
RestaurantCard
  ↓
Link to /restaurants/:slug
  ↓
RestaurantDetailsPage
  ↓
useParams().slug
  ↓
RestaurantsPageData.find(item.slug === slug)
```

From search suggestions:

```text
SearchComponent
  ↓
useNavigate(`/restaurants/${slug}`)
  ↓
RestaurantDetailsPage
```

From profile favourite:

```text
UserProfile
  ↓
Link to `/restaurants/${slug}`
  ↓
RestaurantDetailsPage
```

### Viewing restaurant details

```text
Route /restaurants/:slug
  ↓
RestaurantDetailsPage
  ↓
RestaurantsPageData.find(...)
  ├── found: display image, location, name, vibe, rating
  └── not found: display fallback + Browse Restaurants link
```

### Opening map page

```text
RestaurantDetailsPage
  ↓
Link to /restaurants/:slug/map
  ↓
MapPage
  ↓
useParams().slug
  ↓
RestaurantsPageData.find(...)
  ↓
generateTimeSlots(openingTime, closingTime)
  ↓
render floor plan / placeholder + date buttons + time buttons
```

### Favoriting restaurants

Current intended flow:

```text
RestaurantCard heart
  ↓
toggleFavorite()
  ↓
setFavorite(prev => !prev)
```

Current actual flow:

```text
App passes favorite/setFavorite to HomePage and RestaurantsPage
  ↓
HomePage forwards them to FeaturedRestaurants
  ↓
FeaturedRestaurants ignores them
  ↓
RestaurantsPage ignores them
  ↓
RestaurantCard gets undefined props
  ↓
clicking heart throws because setFavorite is undefined
```

Profile flow is separately static:

```text
UserProfile
  ↓
userData.favoriteRestaurants
  ↓
static favourite pills
```

No card interaction can add/remove these static favourite pills.

### Profile page

```text
Route /profile
  ↓
UserProfile
  ├── userData.profile
  ├── userData.upcomingReservations
  ├── userData.favoriteRestaurants
  └── userData.reservationHistory
```

The profile is a read-only mock dashboard. The Edit Profile control does not change state or navigate.

### Reservation process

Current flow:

```text
RestaurantDetailsPage
  ↓
View Interactive Floor Map
  ↓
MapPage
  ↓
choose one date
  ↓
choose one time
  ↓
visual selected states only
```

The process stops there. It does not select a table, collect guest count, validate availability, confirm a reservation, create a reservation record, update profile reservations, or persist anything.

---

## 10. Current Features

### Implemented features

- Vite React application bootstrap.
- Hash-based client-side routing.
- Sticky navigation bar.
- Navigation to home, catalogue, profile, details, and map routes.
- Home-page hero.
- Featured restaurant section.
- Full restaurant catalogue.
- Case-insensitive filtering by restaurant name and location when `RestaurantsPage` receives a query.
- Full-screen search overlay.
- Live top-five name/location suggestions.
- Direct navigation from a search suggestion to restaurant details.
- Restaurant detail views based on dynamic slug routes.
- Invalid-slug fallback pages.
- Restaurant floor-map page shell.
- Dynamic hourly time-slot generation from mock opening/closing times.
- Date/time visual selection states.
- One actual floor-plan image and generic no-floor-plan fallback.
- Mock profile header.
- Mock upcoming reservations.
- Mock favourite links.
- Mock reservation history.
- Responsive layouts across major sections.
- GitHub Pages deployment configuration.
- Lucide icons.
- Luxury dark/gold visual system.

### Unfinished features

- Working per-restaurant favourites.
- Favourite persistence.
- Synchronization between cards and profile favourites.
- Search-submit results preservation.
- Search result highlighting/filter state after submitting.
- Interactive table selection.
- Actual availability data.
- Guest-count selection.
- Reservation confirmation.
- Reservation creation.
- Reservation persistence.
- Updating upcoming reservations/history after a reservation.
- Authentication and actual login.
- Edit Profile behavior.
- Account settings behavior.
- Email preferences and security controls.
- Real map/floor-plan support for all restaurants.
- Real restaurant backend/API.
- Error/loading states for remote images/data.
- Tests.
- GoldenTable-specific README documentation.

### Placeholder features

- “Floor plan coming soon” panel for restaurants without a `map`.
- “Edit Profile” button.
- How-it-works promise of choosing an exact table.
- Map legend claiming available tables.
- Reservation date/time selection without final action.
- Mock account settings retained in data but not rendered.

### Mocked features

- Restaurant catalogue.
- Featured restaurants.
- Restaurant ratings, locations, images, hours.
- User credentials.
- User profile and avatar.
- Upcoming reservation.
- Favourite restaurants.
- Reservation history.
- Reservation dates.
- Floor plan.
- Availability implied by buttons/legend.

---

## 11. Styling

### CSS organization

Styling is colocated beside components/pages, plus a small global stylesheet:

```text
src/index.css                         global reset
src/components/*.css                  component styles
src/pages/*.css                       page styles
```

There is no CSS Modules, Sass, Tailwind, styled-components, shared token file, or centralized design-system package.

### Global styles

Global styling is spread across multiple files:

- `index.css` sets global reset, `sans-serif`, smooth scrolling, responsive images.
- `RestaurantCard.css` sets global `body` background/font and universal reset.
- `FeaturedRestaurants.css` sets universal reset and global Playfair font.
- `RestaurantsPage.css` sets universal reset.
- `RestaurantDetailsPage.css` also sets reset and defines `:root` custom properties.
- `NavBar.css` includes a global `button` reset.

Because normal CSS is globally scoped, import order can affect typography and resets across unrelated components.

### Color palette

Primary colors used repeatedly:

| Role | Color |
|---|---|
| Main dark background | `#0b0b0b`, `#0d0d0d`, `#0a0a0a` |
| Dark card surface | `#141414`, `rgba(26, 26, 26, ...)` |
| Primary gold | `#d4af37` |
| Alternate gold | `#c9a144` |
| Light gold/champagne | `#e2c258`, `#e6ca97` |
| Light cream text | `#f4e9cf`, `#e8dcc0`, `#f5f5f5` |
| Muted text | `#9c8f6f`, `#a3a3a3`, `#a0957d` |

### Design system characteristics

The visual system is an informal luxury/dark design language:

- Near-black backgrounds.
- Gold borders and accent actions.
- Cormorant Garamond, Playfair Display, and Montserrat typography.
- Glassmorphism cards using translucent dark surfaces and blur.
- Large editorial headings.
- Gold hover animations.
- Rounded cards, panels, and pills.
- Responsive grid-to-stack behavior.

There is no formal reusable token architecture, although `RestaurantDetailsPage.css` is closest because it defines reusable CSS custom properties.

### Reusable CSS classes

Some reuse occurs by class naming, but mostly within a component/page:

- `.btn-primary`, `.btn-secondary`
- `.empty-restaurant`
- `.map-eyebrow`
- `.is-selected`
- `.card`
- `.favorite-btn`
- `.reservation-row`

The `MapPage` relies on `.empty-restaurant` and `.btn-primary` styles that happen to come from `RestaurantDetailsPage.css` only if that stylesheet has been imported in the SPA session/build bundle. This coupling should be made explicit through shared styles.

---

## 12. Architecture Decisions

### React with Vite

React provides component composition and stateful UI. Vite provides fast local development, JSX handling, production bundling, and static deployment compatibility.

### React Router

React Router provides:

- Declarative `<Routes>` and `<Route>`.
- `<Link>` navigation.
- Dynamic `:slug` routes.
- `useParams` for restaurant lookup.
- `useNavigate` for search-suggestion navigation.

### `HashRouter`

Hash routing is suited to GitHub Pages because GitHub Pages serves static files and does not automatically rewrite arbitrary URL paths to `index.html`. Hash fragments are handled client-side and do not require server route configuration.

### Local React state

`searchInput`, modal state, and reservation UI selection are local because the project is currently a frontend prototype without shared state infrastructure or persistent APIs.

The decision is appropriate for small UI-only state, but the attempted favourite feature has crossed the boundary where a structured shared representation is needed.

### Mock JavaScript data in `Backend/`

The `Backend/` directory is not an actual backend. It is a client-imported mock-data directory. This choice allows UI development before an API/database exists.

It has advantages:

- Simple imports.
- No network failures.
- Fast prototyping.
- Easy deterministic demo data.

It also means credentials, user profile data, and restaurant data are shipped to the browser and are not secure or dynamic.

### Slug routing

Restaurant `slug` values are used as:

- React list keys.
- URL identifiers.
- lookup keys.

This is human-readable and works well for static/mock data. It is better for URLs than passing full object state through route navigation.

### Separate featured and catalogue datasets

Featured restaurants are currently a separate array to keep the home-page selection simple. This produces duplication, including names/slugs/images that overlap with the full catalogue. A future API or selector should derive featured items from a single restaurant source.

### Public assets plus `import.meta.env.BASE_URL`

Vite copies `public/` files directly to the build root. Prefixing asset paths with `import.meta.env.BASE_URL` supports the `/GoldenTable-Project/` GitHub Pages subpath.

---

## 13. Technical Debt

1. `favorite` state has the wrong shape: it starts as the full `userData` object.
2. Favourite state is not per restaurant.
3. `RestaurantCard` can throw at runtime because rendered callers do not pass `setFavorite`.
4. Favourites state is not connected to `UserProfile`.
5. `favorite` and `setFavorite` are unused in `UserProfile`, causing two ESLint errors.
6. Search submit clears the query before navigating, so catalogue filtering is lost.
7. `SearchComponent` assumes `searchInput` is a string and calls `.trim()` without optional protection.
8. Search only displays up to five suggestions and offers no explicit no-match message distinct from empty input.
9. `Link` is misused without a `to` prop for the NavBar search and info actions.
10. Cross-route home/featured smooth scrolling is unreliable because refs only exist on `HomePage`.
11. `FeaturedRestaurants` receives props it does not use.
12. `HomePage` passes unused `HeroRef` to `FeaturedRestaurants`.
13. `RestaurantsPage` receives implicit extra favourite props from `App` but ignores them.
14. There are duplicate restaurant records across `FeaturedRestaurants.js` and `RestaurantsPageData.js`.
15. Names contain visible encoding corruption, such as `Maison DorÃ©` and rendered star/arrow characters like `â˜…` and `â†’`.
16. Hardcoded mock `password` is included in client-delivered source.
17. All profile/reservation information is static and not user-specific.
18. Reservation selection does not produce a reservation.
19. No table-level data model exists.
20. Only one restaurant has a map.
21. Time parsing is simplistic and does not validate malformed times, minutes, timezone, or real service windows.
22. Empty opening times default to noon without an explicit business rule.
23. Date data is generated at module load and has no year/weekday/timezone semantics.
24. No loading/error handling exists for remote Unsplash images.
25. External Unsplash image URLs create an outside-network runtime dependency.
26. CSS is globally scoped, with repeated universal resets and global `body`/`button` rules.
27. Typography imports are duplicated/inconsistent; Playfair is declared but not imported by the project CSS.
28. Design tokens are isolated in one page stylesheet rather than shared.
29. `MapPage` relies on style classes primarily defined by another page stylesheet.
30. No tests exist.
31. README is generic and does not explain this product.
32. No accessibility audit is evident; modal lacks focus trapping, Escape-key close behavior, and dialog semantics.
33. The search backdrop uses click-to-close but lacks keyboard parity.
34. No image lazy loading is applied.
35. No memoization is needed yet, but every search keystroke filters arrays directly.
36. `dist/` is generated but present locally; it should remain non-authoritative.
37. `src/App.css` is a deleted tracked file, leaving repository state inconsistent until committed or restored intentionally.

---

## 14. Future Roadmap

Recommended implementation order based on the current code:

1. Repair the current lint errors and remove unused props.
2. Complete favourites:
   - store favourite slugs/IDs in `App`;
   - create a toggle callback;
   - pass it through both card paths;
   - render profile favourites from the shared state;
   - persist to local storage temporarily.
3. Fix search submission:
   - navigate to `/restaurants` without clearing the query;
   - only clear on explicit close or after a selected suggestion;
   - consider URL query parameters such as `#/restaurants?search=nobu`.
4. Consolidate restaurant data:
   - make featured restaurants references/flags within `RestaurantsPageData`, rather than duplicated records.
5. Build a proper reservation state model:
   - date;
   - arrival time;
   - party size;
   - selected table;
   - restaurant slug.
6. Add table/floor-plan data for each restaurant.
7. Add a reservation summary and confirmation action.
8. Connect confirmed reservations to profile upcoming reservations/history.
9. Introduce a backend/API:
   - restaurant catalogue;
   - availability;
   - users/authentication;
   - favourites;
   - reservations.
10. Add authentication and protected profile behavior.
11. Refactor shared CSS tokens and components.
12. Add tests for routing, filtering, favourites, slot generation, and reservation validation.
13. Replace generic README with product-specific setup and architecture documentation.
14. Improve accessibility and keyboard interaction.
15. Add production quality concerns: image optimization, API loading/error states, analytics, and monitoring.

---

## 15. File Dependencies

### `App.jsx`

- Imports: React `useState`; React Router `Routes`, `Route`; all page components; `userData`.
- Exports: default `App`.
- Parent: `main.jsx`.
- Children: route-rendered pages.
- Data dependencies: `UserData`.
- Owns: `searchInput`, attempted `favorite`.

### `HomePage.jsx`

- Imports: `useRef`, `NavBar`, `Hero`, `FeaturedRestaurants`, `HowItWorks`, CSS.
- Exports: `HomePage`.
- Parent: `App`.
- Children: `NavBar`, `Hero`, `FeaturedRestaurants`, `HowItWorks`.
- Data dependencies: no direct data import.
- Receives: search and attempted favourite props.

### `RestaurantsPage.jsx`

- Imports: `RestaurantsPageData`, `NavBar`, `RestaurantCard`, CSS.
- Exports: `RestaurantsPage`.
- Parent: `App`.
- Children: `NavBar`, multiple `RestaurantCard`s.
- Data dependencies: `RestaurantsPageData`.
- Receives: search props.

### `RestaurantDetailsPage.jsx`

- Imports: React Router `Link`, `useParams`; `RestaurantsPageData`; `NavBar`; CSS.
- Exports: `RestaurantDetailsPage`.
- Parent: `App`.
- Children: `NavBar`.
- Data dependencies: `RestaurantsPageData`.
- Receives: search props.

### `MapPage.jsx`

- Imports: `useState`; `Link`, `useParams`; `RestaurantsPageData`; `ReservationPageDate`; `NavBar`; CSS.
- Exports: `MapPage`.
- Parent: `App`.
- Children: `NavBar`.
- Data dependencies: restaurant catalogue and generated dates.
- Receives: search props.

### `UserProfile.jsx`

- Imports: `userData`, `RestaurantsPageData`, Lucide `Settings`, `Link`, `NavBar`, CSS.
- Exports: `UserProfile`.
- Parent: `App`.
- Children: `NavBar`.
- Data dependencies: `UserData`, `RestaurantsPageData`.
- Receives: search and unused favourite props.

### `NavBar.jsx`

- Imports: Lucide icons, `useState`, `SearchComponent`, `Link`, CSS.
- Exports: `NavBar`.
- Parents: every page.
- Child: conditional `SearchComponent`.
- Data dependencies: none directly.
- Receives: search props and optional home refs.

### `SearchComponent.jsx`

- Imports: Lucide icons, `useNavigate`, `RestaurantsPageData`, CSS.
- Exports: `SearchComponent`.
- Parent: `NavBar`.
- Children: none.
- Data dependencies: `RestaurantsPageData`.
- Receives: search value/setter and close callback.

### `Hero.jsx`

- Imports: `Link`.
- Exports: `Hero`.
- Parent: `HomePage`.
- Children: none.
- Data dependencies: public `table-png.png`.
- Receives: hero ref.

### `FeaturedRestaurants.jsx`

- Imports: `Link`, `RestaurantCard`, `featuredRestaurants`, CSS.
- Exports: `FeaturedRestaurants`.
- Parent: `HomePage`.
- Children: multiple `RestaurantCard`s.
- Data dependencies: `featuredRestaurants`.
- Receives: featured section ref.

### `RestaurantCard.jsx`

- Imports: `Link`, Lucide `Heart`, CSS.
- Exports: `RestaurantCard`.
- Parents: `FeaturedRestaurants`, `RestaurantsPage`.
- Children: none.
- Data dependencies: receives restaurant fields as props.
- Receives: restaurant fields and intended favourite props.

### `HowItWorks.jsx`

- Imports: `Link`, three Lucide icons, CSS.
- Exports: `HowItWorks`.
- Parent: `HomePage`.
- Children: none.
- Data dependencies: internal static `steps` array.

### `FeaturedRestaurants.js`

- Imports: none.
- Exports: `featuredRestaurants`.
- Consumers: `FeaturedRestaurants`.

### `RestaurantsPageData.js`

- Imports: none.
- Exports: `RestaurantsPageData`.
- Consumers: `RestaurantsPage`, `SearchComponent`, `RestaurantDetailsPage`, `MapPage`, `UserProfile`.

### `ReservationPageData.js`

- Imports: none.
- Exports: `getOffsetDate`, `ReservationPageDate`.
- Consumer: `MapPage`.

### `UserData.js`

- Imports: none.
- Exports: `userData`.
- Consumers: `App`, `UserProfile`.

---

## 16. Improvement Suggestions

Without changing the overall React/Vite/React Router architecture:

- Make favourites a normalized collection of slugs or IDs, not one boolean/object.
- Pass explicit callback props such as `onToggleFavorite`.
- Derive featured restaurants from `RestaurantsPageData` using a `featured: true` property or slug list.
- Keep submitted search input intact when navigating to `/restaurants`.
- Put search query in URL parameters for shareable/bookmarkable results.
- Replace action-only `Link` elements with `<button>` controls.
- Add `aria-modal`, `role="dialog"`, Escape-to-close, and focus management to the search overlay.
- Use one shared stylesheet or token file for colors, spacing, radii, typography, and button styles.
- Remove globally scoped resets from component CSS; keep resets in `index.css`.
- Create reusable `EmptyState`, `PageContainer`, and button components if duplication grows.
- Correct character encoding in restaurant names and UI glyphs.
- Add a real `Reservation` domain model before adding more UI.
- Add tests around:
  - route lookup;
  - invalid slugs;
  - restaurant filtering;
  - time-slot generation;
  - favourite toggling;
  - reservation validation.
- Use `loading="lazy"` for catalogue images.
- Add image fallback behavior.
- Keep static public images local where possible and document external image sources.
- Replace mock credentials with no credential data at all until authentication exists.
- Update README with install, run, build, deploy, route, and mock-data documentation.
- Commit or intentionally remove the deleted `src/App.css` record to restore a clean repository state.

---

## 17. Final Architecture Summary

GoldenTable is a Vite-built React SPA deployed for GitHub Pages with `HashRouter`. `App.jsx` owns route definitions and shared search state. Pages compose reusable components such as `NavBar`, `RestaurantCard`, search overlay, hero, featured restaurants, and how-it-works content. Restaurant, reservation-date, and user information is currently supplied by local JavaScript mock-data files in `Backend/`.

Restaurant identity is based on `slug`, which drives list keys, route URLs, details lookup, and map lookup. The details and map pages dynamically read the route slug and search `RestaurantsPageData`. The UI is visually mature, responsive, and centered on a dark luxury/gold theme, but its business functions remain prototype-level: favourites are incorrectly wired, search submissions lose their query, and the reservation page supports visual date/time selection only.


# Golden Table - Project Description

Golden Table is a premium restaurant reservation platform available as both a web application and a mobile application. It is designed specifically for luxury restaurants, offering customers a personalized dining reservation experience that goes beyond simply choosing a date and time.

The core innovation of Golden Table is the ability to reserve a specific table rather than accepting an automatically assigned one. Instead of displaying only a list of available reservation times, the platform presents an interactive 2D floor map of the restaurant that accurately represents the dining layout.

Each table is displayed in its real location within the restaurant, allowing customers to visually explore the venue before making a reservation. By selecting a table, users can view detailed information about its characteristics, including:

* Window or panoramic view
* Indoor or outdoor seating
* Quiet or lively area
* Distance from televisions or entertainment screens
* Privacy level
* Proximity to the entrance, kitchen, or restrooms
* Romantic, family-friendly, or business-friendly location
* Wheelchair accessibility (when applicable)
* Capacity and seating arrangement
* Any additional features defined by the restaurant

This visual approach helps customers choose the table that best matches their preferences instead of relying solely on restaurant staff or random assignments.

## Restaurant Floor Map

The restaurant map is a simplified 2D representation of the actual restaurant layout. It is not intended to be a navigation system but rather a visual planning tool. The map contains icons representing tables, chairs, walls, windows, entrances, decorations, and other important landmarks to help customers understand the restaurant's environment.

Each table has predefined coordinates within the map, allowing the frontend to display clickable table icons in their exact positions. Selecting a table opens detailed information about that table and allows the customer to reserve it if it is available.

## Reservation Workflow

1. The customer chooses a restaurant.
2. The customer selects the reservation date and time.
3. The system displays only the tables available during that time slot.
4. The customer explores the interactive restaurant map.
5. The customer selects a preferred table.
6. The customer reviews the table details and confirms the reservation.
7. The selected table becomes unavailable for overlapping reservations.

## Restaurant Management

Restaurant owners can manage:

* Restaurant profile
* Opening hours
* Restaurant floor map
* Table locations
* Table capacities
* Table features
* Reservation availability
* Customer reservations

Owners can position tables directly on the restaurant map by specifying their X and Y coordinates, making the visual layout match the real restaurant as closely as possible.

## Design Philosophy

Golden Table focuses on creating a premium and cinematic reservation experience. The interface should feel elegant, modern, and luxurious while remaining simple and intuitive. The goal is to give customers confidence in their reservation by allowing them to see exactly where they will be seated before they book.

Unlike traditional reservation platforms that only allow users to reserve a seat at a restaurant, Golden Table allows customers to reserve *their ideal table*. This transforms the reservation process into a personalized experience and provides luxury restaurants with a unique competitive advantage.

## Project Vision

Golden Table aims to become the leading premium restaurant reservation platform by combining elegant design, interactive restaurant visualization, and precise table selection. The platform bridges the gap between digital reservations and the real dining experience, giving customers greater control over where they dine and helping restaurants deliver a more personalized level of service.

                