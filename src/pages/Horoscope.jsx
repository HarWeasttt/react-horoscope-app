import React, { useState } from 'react';
import { Container, Row, Button, ListGroup } from 'react-bootstrap';
import hor from '../images/Hor.png';
import './Horoscope.css';

const Horoscope = () => {
  const [prediction, setPrediction] = useState('');
  const [history, setHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGetHoroscope = () => {
    setIsAnimating(true); // Start animation

    // Simulate an animation duration (e.g., 2 seconds)
    setTimeout(() => {
      const newPrediction = `Ваш гороскоп на сегодня: Отличный день для новых начинаний!`; // Example prediction
      setPrediction(newPrediction);
      setHistory((prevHistory) => [newPrediction, ...prevHistory]); // Add to history
      setIsAnimating(false); // Stop animation
    }, 2000); // Adjust the timeout as needed
  };

  return (
    <Container className="text-center mb-5 pb-5" style={{ backgroundColor: '#343a40', color: '#ffffff', padding: '2em', borderRadius: '8px' }}>
      <Row className="justify-content-center">
        <img
          src={hor}
          alt="Horoscope"
          className={`horoscope-image ${isAnimating ? 'rotate' : ''}`}
          style={{ paddingTop: '2em', maxWidth: '100%', height: 'auto' }}
        />
      </Row>
      <Row className="justify-content-center mt-4">
        <Button variant="primary" onClick={handleGetHoroscope}>
          Узнать гороскоп на сегодня
        </Button>
      </Row>
      {prediction && (
        <Row className="justify-content-center mt-4">
          <h4>{prediction}</h4>
        </Row>
      )}
      <Row className="justify-content-center mt-4 mb-5">
        <h5>История предсказаний:</h5>
        <ListGroup className="w-100" style={{ backgroundColor: '#495057', color: '#ffffff' }}>
          {history.length === 0 ? (
            <ListGroup.Item style={{ backgroundColor: '#495057', color: '#ffffff' }}>
              Нет истории предсказаний
            </ListGroup.Item>
          ) : (
            history.map((item, index) => (
              <ListGroup.Item key={index} style={{ backgroundColor: '#495057', color: '#ffffff' }}>
                {item}
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Row>
    </Container>
  );
};

export default Horoscope;