import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const GameOver = (props) => {
  const { outcome, solution, onHide } = props;
  console.log('solution', solution)
  return (
    <>
      <Modal {...props} size="lg" centered>
        <Modal.Header className="modal-card" closeButton={false}>
          <Modal.Title>{outcome === 1 ? 'You won!' : 'Almost!'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-card">
          {/* <h4>{'The word was'} <i>{solution.toLowerCase()}</i></h4> */}
          <p>
            {'The word was...'} <i>{solution?.toUpperCase()}</i>
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-card">
          <Button
            className={'btn-dark'}
            onClick={() => {
              onHide();
              // setoutcome(0)
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameOver;
