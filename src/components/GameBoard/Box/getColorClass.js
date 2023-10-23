// export function getColorClass(letter, index, solution) {
export default function getColorClass(letter, index, solution) {
  const correctLetter = solution.slice(index, index + 1);
  const correctLetterIndex = solution.split('').indexOf(letter);

  if (correctLetter === letter) {
    return 'correct';
  } else if (correctLetterIndex >= 0) {
    return 'close';
  } else {
    return 'incorrect';
  }
}
