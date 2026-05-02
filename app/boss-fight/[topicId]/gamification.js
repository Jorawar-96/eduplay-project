/**
 * Calculates the user's level, title, and progress to the next level based on their total XP.
 * 
 * @param {number} totalXP 
 * @returns {object} { level, title, nextLevelXP, progress }
 */
function calculateLevel(totalXP) {
  if (totalXP < 200) {
    return { level: 1, title: "Rookie", nextLevelXP: 200, progress: (totalXP / 200) * 100 };
  }
  if (totalXP < 500) {
    return { level: 2, title: "Apprentice", nextLevelXP: 500, progress: ((totalXP - 200) / 300) * 100 };
  }
  if (totalXP < 1000) {
    return { level: 3, title: "Scholar", nextLevelXP: 1000, progress: ((totalXP - 500) / 500) * 100 };
  }
  if (totalXP < 2000) {
    return { level: 4, title: "Expert", nextLevelXP: 2000, progress: ((totalXP - 1000) / 1000) * 100 };
  }
  if (totalXP < 4000) {
    return { level: 5, title: "Master", nextLevelXP: 4000, progress: ((totalXP - 2000) / 2000) * 100 };
  }
  return { level: 6, title: "Legend", nextLevelXP: null, progress: 100 };
}

module.exports = { calculateLevel };