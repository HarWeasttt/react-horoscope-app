import React, { Component } from 'react';
import { Container, Row, Col, Button, ListGroup, Form } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedQuestions: {}, // Track which questions are expanded
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

  render() {
    const { expandedQuestions } = this.state;

    return (
      <Container fluid style={{ backgroundColor: '#343a40', color: '#ffffff', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Main Content */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
          <Row className="mb-4">
            <Col>
              <h5>Ваш путеводитель с ответом на самые важные вопросы в жизни. Выберите вопрос из предложенных вариантов или задайте свой собственный.</h5>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h6>Спроси сейчас:</h6>
              <ListGroup>
                <ListGroup.Item className="bg-primary text-white">Когда я встречу любовь всей своей жизни?</ListGroup.Item>
                <ListGroup.Item className="bg-primary text-white">Смогу ли я поехать за границей для обучения?</ListGroup.Item>
                <ListGroup.Item className="bg-primary text-white">Расскажи мне о личной жизни.</ListGroup.Item>
                <ListGroup.Item className="bg-primary text-white">Можешь рассказать мне о денежном потоке в следующем году?</ListGroup.Item>
                <ListGroup.Item className="bg-primary text-white">Каковы мои сильные и слабые стороны?</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h6>Идеи для других вопросов:</h6>
              <ListGroup>
                {['Лучшие даты для...', 'Личность', 'Любовь', 'Образование', 'Карьера', 'Дело'].map((question) => (
                  <div key={question}>
                    <ListGroup.Item
                      action
                      style={{ backgroundColor: '#495057', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      onClick={() => this.toggleExpand(question)}
                    >
                      <span>{question}</span>
                      {expandedQuestions[question] ? <FaChevronUp color="#ffffff" /> : <FaChevronDown color="#ffffff" />}
                    </ListGroup.Item>
                    {expandedQuestions[question] && (
                      <ListGroup style={{ paddingLeft: '20px' }}>
                        <ListGroup.Item style={{ backgroundColor: '#495057', color: '#ffffff' }}>
                          {`... о ${question.toLowerCase()}`}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ backgroundColor: '#495057', color: '#ffffff' }}>
                          {`... как ${question.toLowerCase()}?`}
                        </ListGroup.Item>
                      </ListGroup>
                    )}
                  </div>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </div>

        {/* Sticky Form at the Bottom */}
        <Row style={{ position: 'sticky', bottom: '0', backgroundColor: '#343a40', padding: '1em 0' }} className='mb-5 pb-5'>
          <Col>
            <Form>
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