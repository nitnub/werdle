const Keyboard = ({ keyColors }) => {
  const keyList = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
  ];
  console.log('KEYBOARD: ', keyColors)
  const clickHandler = (e) => {
    console.log(e.target.innerText);
  }
  return (
    <div className="keyboard-container">
     
      {keyList.map((row) => {
        return (
          <div key={row[0]} className="keyboard-row">
            {row.map((key) => (
              <div key={key}className={'keyboard-key ' + key.toLowerCase() + ' ' + keyColors[key]} onClick={clickHandler}>{key}</div>
            ))}{' '}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
