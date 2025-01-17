import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedQuestions: {},
    };
  }

  toggleExpand = (question) => {
    this.setState((prevState) => ({
      expandedQuestions: {
        ...prevState.expandedQuestions,
        [question]: !prevState.expandedQuestions[question],
      },
    }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const userQuestion = event.target.userQuestion.value;

    try {
      const response = await axios.post('http://localhost:5000/ask', {
        question: userQuestion,
      });
      const answer = response.data.answer;
      alert(answer); // или обновите состояние компонента
    } catch (error) {
      console.error('Error asking question:', error);
      alert('Произошла ошибка при отправке вопроса.');
    }
  };

  render() {
    const { expandedQuestions } = this.state;

    return (
      <Container fluid style={{ backgroundColor: '#343a40', color: '#ffffff', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
          <Row className="mb-4">
            <Col>
              <h5>Ваш путеводитель с ответом на самые важные вопросы в жизни. Выберите вопрос из предложенных вариантов или задайте свой собственный.</h5>
            </Col>
          </Row>

          {/* Остальной код */}
        </div>

        <Row style={{ position: 'sticky', bottom: '0', backgroundColor: '#343a40', padding: '1em 0' }} className='mb-5 pb-5'>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Form.Group controlId="userQuestion">
                  <Form.Label>Напишите свой вопрос...</Form.Label>
                  <Form.Control type="text" placeholder="Введите ваш вопрос" style={{ backgroundColor: '#495057', color: '#ffffff' }} />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-1'>
                  Задать вопрос
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}