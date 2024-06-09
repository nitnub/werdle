import getColorClass from './getColorClass';

export default function Box({
  index,
  state,
  letter,
  boxHeight,
  thisRoundIsOver,
}) {
  return (
    <div
      data-testid="game-letter"
      id={`box${index}`}
      className={`box  ${
        thisRoundIsOver && getColorClass(letter, index, state.solution)
      }`}
      style={{ width: boxHeight, fontSize: `${boxHeight * 0.6}px` }} // Adjust font size to fit box
    >
      {letter}
    </div>
  );
}
