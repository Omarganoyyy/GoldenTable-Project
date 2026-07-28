export function getOffsetDate(daysAhead) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysAhead);

  return {
    month: targetDate.getMonth() + 1, // Correctly rolls over to next month
    day: targetDate.getDate(),        // Correctly wraps around to 1, 2, 3...
  };
}

export const ReservationPageDate = [
  getOffsetDate(0), // Today
  getOffsetDate(1), // Tomorrow
  getOffsetDate(2),
  getOffsetDate(3),
  getOffsetDate(4),
  getOffsetDate(5),
  getOffsetDate(6),
];