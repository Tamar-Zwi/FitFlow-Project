export const fitnessQuotes = [
  { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
  { text: "Strength does not come from the body. It comes from the will.", author: "Unknown" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Arnold Schwarzenegger" },
  { text: "Your body can stand almost anything. It's your mind that you have to convince.", author: "Unknown" },
  { text: "Success is what comes after you stop making excuses.", author: "Luis Galarza" },
  { text: "The only way to define your limits is by going beyond them.", author: "Arthur C. Clarke" },
  { text: "Don't limit your challenges. Challenge your limits.", author: "Jerry Dunn" },
  { text: "Fitness is not about being better than someone else. It's about being better than you used to be.", author: "Khloe Kardashian" },
  { text: "A one-hour workout is 4% of your day. No excuses.", author: "Unknown" },
  { text: "The hard days are what make you stronger.", author: "Aly Raisman" },
  { text: "The greatest wealth is health.", author: "Virgil" },
  { text: "Push harder than yesterday if you want a different tomorrow.", author: "Unknown" },
  { text: "When you feel like quitting, think about why you started.", author: "Unknown" },
  { text: "Sweat is just fat crying.", author: "Unknown" },
];

export function getRandomQuote() {
  return fitnessQuotes[Math.floor(Math.random() * fitnessQuotes.length)];
}
