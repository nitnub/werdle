import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function GameOver (props) {
  const { outcome, solution, onHide } = props;

  return (
    <>
      <Modal {...props} size="lg" centered>
        <Modal.Header className="modal-card" closeButton={false}>
          <Modal.Title>{outcome === 1 ? 'You won!' : 'Almost!'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-card">
          <p>
            {'The word was...'} <i>{solution?.toUpperCase()}</i>
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-card">
          <Button
            className={'btn-dark'}
            onClick={() => {
              onHide();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// export default GameOver;
