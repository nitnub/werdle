// import { types } from "util";

// export function getColorClass(letter, index, solution) {
export default function getColorClass(letter, index, solution) {
  if (typeof letter !== 'string' || typeof solution != 'string') {
    return 'incorrect';
  }

  letter = letter.toLowerCase();
  solution = solution.toLowerCase();

  const correctLetter = solution.slice(index, index + 1);
  const correctLetterIndex = solution.split('').indexOf(letter);

  if (correctLetter === letter) {
    return 'correct';
  } else if (correctLetterIndex >= 0) {
    return 'close';
  }
  return 'incorrect';
}
