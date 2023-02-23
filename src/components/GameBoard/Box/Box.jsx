export default function Box({
  index,
  state,
  letter,
  boxHeight,
  solution,
  thisRoundIsOver,

}) {
  const getColorClass = (letter, index, solution) => {
    const correctLetter = solution.slice(index, index + 1);
    const correctLetterIndex = solution.split('').indexOf(letter);
    console.log('correct letter:', correctLetter);
    console.log(' letter:', letter);
    console.log();
    if (correctLetter === letter) {
      return 'correct';
    } else if (correctLetterIndex >= 0) {
      return 'close';
    } else {
      return 'incorrect';
    }
  };
  console.log('box solution:', state.solution);
  return (
    <div
      id={`box${index}`}
      className={`box  ${
        // thisRoundIsOver && getColorClass(letter, index, state.solution)
        thisRoundIsOver && getColorClass(letter, index, state.solution)
      }`}
      style={{ width: boxHeight, fontSize: `${boxHeight * 0.6}px` }} // Adjust font size to fit box
    >
      {letter}
    </div>
  );
}
