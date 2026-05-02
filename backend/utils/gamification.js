module.exports = {
  calculateLevel: function(totalXP) {
    if (totalXP < 200) return { level: 1, title: 'Rookie', nextLevelXP: 200 }
    if (totalXP < 500) return { level: 2, title: 'Apprentice', nextLevelXP: 500 }
    if (totalXP < 1000) return { level: 3, title: 'Scholar', nextLevelXP: 1000 }
    if (totalXP < 2000) return { level: 4, title: 'Expert', nextLevelXP: 2000 }
    if (totalXP < 4000) return { level: 5, title: 'Master', nextLevelXP: 4000 }
    return { level: 6, title: 'Legend', nextLevelXP: null }
  },

  calculateXP: function(correctAnswers, timeTaken) {
    const baseXP = correctAnswers * 100
    const speedBonus = timeTaken < 90 ? 50 : 0
    return baseXP + speedBonus
  },

  checkBadges: function(stats) {
    const earned = []
    if (stats.totalQuizzes === 1) earned.push('First Blood')
    if (stats.perfectScore) earned.push('Flawless')
    if (stats.timeTaken < 60) earned.push('Speed Demon')
    if (stats.streak >= 7) earned.push('7-Day Warrior')
    if (stats.totalXP >= 1000) earned.push('XP Hunter')
    return earned
  }
}