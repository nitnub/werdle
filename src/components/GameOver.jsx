import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const GameOver = (props) => {
  const { outcome, setOutcome, solution, onHide } = props;
  console.log('game over Modal');
  return (
    <>
     
      <Modal
      {...props}
        size="lg"
        // aria-labelledby=""
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="game-over-modal">
            {`outcome code: ${outcome}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{solution}</h4>
          <p>{solution}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className={'btn-dark'} onClick={() => {
            onHide();
            setOutcome(0)}
            }>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameOver;
