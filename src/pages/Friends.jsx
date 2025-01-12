import React, { Component } from 'react';
import { Button, ListGroup, Card, Form } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaStar, FaRegStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referralLink: '',
      friends: [
        { name: 'Алекс', birthday: '01.01.1990', zodiac: 'Козерог', prediction: 'Сегодня будет удачный день!', isPriority: false },
        { name: 'Мария', birthday: '15.05.1995', zodiac: 'Телец', prediction: 'Сосредоточьтесь на своих целях.', isPriority: false },
        { name: 'Иван', birthday: '20.08.1988', zodiac: 'Лев', prediction: 'Верьте в себя, и все получится!', isPriority: false },
      ],
      expandedFriendIndex: null,
    };
  }

  handleInputChange = (event) => {
    this.setState({ referralLink: event.target.value });
  };

  handleReferralSubmit = () => {
    const { referralLink } = this.state;
    if (referralLink) {
      console.log('Referral Link Submitted:', referralLink);
      alert(`Реферальная ссылка отправлена: ${referralLink}`);
      this.setState({ referralLink: '' });
    } else {
      alert('Пожалуйста, введите реферальную ссылку.');
    }
  };

  copyInvitation = () => {
    const invitationText = "Приглашаем вас присоединиться к нашему приложению!";
    navigator.clipboard.writeText(invitationText)
      .then(() => {
        alert('Приглашение скопировано в буфер обмена!');
      })
      .catch(err => {
        console.error('Ошибка при копировании текста: ', err);
      });
  };

  toggleExpand = (index) => {
    this.setState(prevState => ({
      expandedFriendIndex: prevState.expandedFriendIndex === index ? null : index,
    }));
  };

  togglePriority = (index) => {
    this.setState(prevState => {
      const friends = [...prevState.friends];
      const friend = friends[index];
      friend.isPriority = !friend.isPriority;

      if (friend.isPriority) {
        friends.splice(index, 1);
        friends.unshift(friend);
      }

      return { friends };
    });
  };

  render() {
    const { friends, expandedFriendIndex, referralLink } = this.state;

    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#343a40', color: '#ffffff' }}>
        <div style={{ padding: '20px' }}>
          <div className="mb-3 d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="Введите реферальную ссылку"
              value={referralLink}
              onChange={this.handleInputChange}
              style={{ marginRight: '10px' }}
            />
            <Button variant="success" onClick={this.handleReferralSubmit}>
              ✅
            </Button>
          </div>
          <h1 className="text-center">Друзья</h1>

          <div className='text-center'>
            <Button
              variant="primary"
              onClick={this.copyInvitation}
              className="mb-3"
            >
              Скопировать приглашение
            </Button>
          </div>

          <div className='text-center mb-3'>
            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                onClick={() => alert('Создание истории в Telegram...')}
                className="mx-1"
                style={{ flex: '1' }}
              >
                Сделать ТГ сторис
              </Button>
              <Button
                variant="primary"
                onClick={() => alert('Создание истории в Instagram...')}
                className="mx-1"
                style={{ flex: '1' }}
              >
                Сделать Инст сторис
              </Button>
            </div>
          </div>

          <ListGroup>
            {friends.map((friend, index) => (
              <Card key={index} className="mb-3" style={{ backgroundColor: '#495057', color: '#ffffff' }}>
                <Card.Header
                  onClick={() => this.toggleExpand(index)}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: '#6c757d' }}
                >
                  <Button
                    variant="link"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.togglePriority(index);
                    }}
                    style={{ color: '#ffffff' }}
                  >
                    {friend.isPriority ? <FaStar /> : <FaRegStar />}
                  </Button>
                  <span style={{ flexGrow: 1 }}>{friend.name}</span>
                  {expandedFriendIndex === index ? <FaChevronUp color="#ffffff" /> : <FaChevronDown color="#ffffff" />}
                </Card.Header>
                {expandedFriendIndex === index && (
                  <Card.Body style={{ backgroundColor: '#495057', color: '#ffffff' }}>
                    <Card.Text>
                      <strong>Дата рождения:</strong> {friend.birthday}<br />
                      <strong>Знак зодиака:</strong> {friend.zodiac}<br />
                      <strong>Предсказание на сегодня:</strong> {friend.prediction}
                    </Card.Text>
                  </Card.Body>
                )}
              </Card>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }
}