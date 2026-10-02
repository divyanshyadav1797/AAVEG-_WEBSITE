/**
 * =========================================================================
 * AAVEG 2026 HOUSE BATTLE POINTS CONFIGURATION
 * =========================================================================
 * You can edit any house point value directly below in the code.
 * The Leaderboard rankings, graph bars, podium order, and scores will
 * immediately update dynamically based on these point numbers!
 */

export const HOUSE_POINTS = {
  'house-1': 1480, // House 1 Points
  'house-2': 1390, // House 2 Points
  'house-3': 1270, // House 3 Points
  'house-4': 1190, // House 4 Points
  'house-5': 1080, // House 5 Points
  'house-6': 970,  // House 6 Points
  'house-7': 910,  // House 7 Points
  'house-8': 840,  // House 8 Points
};

/**
 * Helper function to retrieve all houses merged with their configured points,
 * sorted descending by points.
 */
export function getSortedLeaderboard(housesList = []) {
  return housesList
    .map((house) => ({
      ...house,
      points: HOUSE_POINTS[house.id] ?? house.points ?? 0,
    }))
    .sort((a, b) => b.points - a.points);
}
