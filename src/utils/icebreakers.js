export const iceBreakers = [
  "What's your go-to karaoke song?",
  "Coffee or tea person?",
  "What's the best adventure you've been on?",
  "Morning person or night owl?",
  "What's your hidden talent?",
  "If you could have dinner with anyone, who would it be?",
  "What's the most spontaneous thing you've ever done?",
  "Beach vacation or mountain retreat?",
  "What's your comfort food?",
  "Dogs or cats?",
  "What's a skill you'd love to learn?",
  "Favorite way to spend a Sunday?",
  "What's your guilty pleasure show?",
  "Early bird or night owl?",
  "What's your dream travel destination?",
  "Cooking at home or dining out?",
  "What book changed your perspective?",
  "Summer or winter person?",
  "What's your weekend ritual?",
  "If you could master any instrument, which one?"
];

export const getRandomIceBreaker = () => {
  return iceBreakers[Math.floor(Math.random() * iceBreakers.length)];
};

export const getMultipleIceBreakers = (count = 3) => {
  const shuffled = [...iceBreakers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};