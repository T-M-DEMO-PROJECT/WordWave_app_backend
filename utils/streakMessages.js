// utils/streakMessages.js
export function getStreakMessage(streak) {
    const messages = {
        beginners: [
            "You’re off to a great start! 1 day down, a lifetime of stories to go. 🌟",
            "The first step is always the hardest, but you’ve got this! Keep the streak alive! 🚀"
        ],
        earlyStreaks: [
            `Day ${streak}! You’re on fire 🔥 Keep those earbuds buzzing!`,
            "You're creating a habit of greatness! 7 days of audiobooks—keep building the streak! 🌈📖",
            `6 days strong—your story is just beginning. Push for that 1-week milestone! 🎯`
        ],
        midLevelStreaks: [
            `Boom! 10 days in a row. You’ve unlocked consistency. 🏆 Keep it going!`,
            `Your streak is ${streak} days old! African literature is proud of your dedication. 🌍✨`,
            `You’re turning pages like a champ—20 days streaking and growing! 📚💪`
        ],
        highLevelStreaks: [
            `Legend alert! 📢 ${streak} days of audiobooks—your commitment is inspirational! 👑`,
            `Wow, ${streak} days straight! You’ve turned listening into an art form. 🎨 Keep it going!`,
            `You’ve joined the Hall of Fame with ${streak} days of streaks. Audiobooks have never been more alive! 🥇✨`
        ],
        motivational: [
            "Missed yesterday? No worries, today is a fresh page in your audiobook journey. Let’s go! 🌟",
            "Every streak starts with Day 1. Restart your journey today, and let the stories guide you! 🎧✨",
            "Your daily dose of wisdom awaits. What will today’s chapter teach you? 🎙️🌈",
            "Don’t stop now! Press play and let the next story unfold. 📖✨",
            "Listening to African audiobooks is leveling up your vocab game! Keep up the great work, wordsmith! 🧠🔤",
            "Today’s story brings more than just words—it brings power and perspective. 🌍✨"
        ],
        rewards: [
            "Streak Bonus Unlocked! 🎉 You’ve kept up for 5 days. Here’s a motivational quote for today: 'The journey of a thousand miles begins with a single step.'",
            "10-Day Streak Achieved! 🎊 You’ve just unlocked a special vocabulary word from today’s book: Ubuntu (n.): ‘A sense of humanity and togetherness.’",
            `Incredible! Your ${streak}-day streak has earned you a badge: ‘Storyteller in the Making!’ 🏅 Keep it up!`
        ],
        genZ: [
            `Audiobook streak: on fleek! 🔥💅 ${streak} days straight. Keep the drip alive. 🎧✨`,
            `No cap, you’re crushing it with ${streak} days of stories. 📚 Stay lit! 🌟`,
            `Streak status: ${streak} days strong. You’re officially a pro listener. 🎙️👑`
        ]
    };

    if (streak === 1) {
        return messages.beginners[Math.floor(Math.random() * messages.beginners.length)];
    } else if (streak >= 2 && streak <= 7) {
        return messages.earlyStreaks[Math.floor(Math.random() * messages.earlyStreaks.length)];
    } else if (streak >= 8 && streak <= 30) {
        return messages.midLevelStreaks[Math.floor(Math.random() * messages.midLevelStreaks.length)];
    } else if (streak >= 31) {
        return messages.highLevelStreaks[Math.floor(Math.random() * messages.highLevelStreaks.length)];
    } else {
        return "Keep going! You're doing great! 🌟";
    }
}