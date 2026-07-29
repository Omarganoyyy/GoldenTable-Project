export const userData = {
  credentials: {
    email: "jordan.diaz@example.com",
    password: "password123"
  },
  profile: {
    id: "user_01",
    name: "Jordan Diaz",
    email: "jordan.diaz@example.com",
    initials: "JD",
    memberSince: 2026,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
  },
  upcomingReservations: [
    {
      id: "res_up_01",
      restaurantName: "Maison Doré",
      date: "2026-08-14",
      displayDate: "Aug 14, 7:30 PM",
      table: "Table 12",
      guests: 2,
      status: "Upcoming"
    }
  ],
  favoriteRestaurants: [
    {
      id: "rest_01",
      name: "Maison Doré",
      slug: "maison-dore"
    },
    {
      id: "rest_02",
      name: "Auric",
      slug: "auric"
    },
    {
      id: "rest_03",
      name: "Sachi",
      slug: "sachi-park-st"
    }
  ],
  accountSettings: {
    emailPreferences: {
      marketing: true,
      reservationUpdates: true
    },
    security: {
      twoFactorEnabled: false
    }
  },
  reservationHistory: [
    {
      id: "res_hist_01",
      restaurantName: "Auric",
      date: "2026-06-02",
      displayDate: "Jun 2, 2026",
      status: "Completed"
    },
    {
      id: "res_hist_02",
      restaurantName: "Maison Doré",
      date: "2026-05-18",
      displayDate: "May 18, 2026",
      status: "Completed"
    }
  ]
};