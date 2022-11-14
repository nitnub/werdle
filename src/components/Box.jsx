const Box = ({ id, className, letter, boxHeight }) => {








  
  return (
    <div className="box-container">
      <div
        id={`box${id}`}
        className={className}
        style={{ width: boxHeight }}
        letter={letter}
      >
        {letter}
      </div>
    </div>
  );
};

export default Box;
