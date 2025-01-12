import React, { Component } from 'react';
import { Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Airdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAddress: '', 
    };
  }

  handleInputChange = (event) => {
    this.setState({ walletAddress: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault(); 
    const { walletAddress } = this.state;

    if (walletAddress) {
      console.log('Connecting to wallet:', walletAddress);
      alert(`Подключение к кошельку: ${walletAddress}`);
      this.setState({ walletAddress: '' });
    } else {
      alert('Пожалуйста, введите адрес кошелька.');
    }
  };

  render() {
    const { walletAddress } = this.state;

    return (
      <Container style={{ backgroundColor: '#343a40', color: '#ffffff', padding: '2em', borderRadius: '8px' }} className='mb-5'>
        <h1 className="text-center">Задача для участия в Airdrop</h1>
        <h2 className="text-center">1. Подключите кошелек</h2>
        <p className="text-center" style={{ backgroundColor: '#007bff', color: '#ffffff', padding: '10px', borderRadius: '5px' }}>
          Кошелек можно подключить только к одному аккаунту.
        </p>
        
        <p className="text-center mt-4">
          Airdrop — это распределение токенов на кошельки игроков. Эти токены будут торговаться на ведущих биржах, и вы можете либо продать, либо удерживать их. Чтобы получить свои токены, вы должны выполнить две другие задачи.
        </p>
        <p className="text-center mb-5">
          В настоящее время мы находимся на этапе добры, где игроки зарабатывают токены для airdrop. Дата Airdrop станет известна скоро в нашем Telegram-канале.
        </p>
      </Container>
    );
  }
}