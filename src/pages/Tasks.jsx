import React, { Component } from 'react';
import { Tab, Nav, ListGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: ['Задание 1', 'Задание 2', 'Задание 3'],
      completedTasks: [],
      activeKey: 'tasks', // Track the active key
    };
  }

  completeTask = (task) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter(t => t !== task),
      completedTasks: [...prevState.completedTasks, task],
    }));
  };

  handleSelect = (key) => {
    this.setState({ activeKey: key });
  };

  render() {
    const { tasks, completedTasks, activeKey } = this.state;

    return (
      <div className="tasks-container" style={{ padding: '20px', backgroundColor: '#343a40', color: '#ffffff', minHeight: '100vh' }}>
        <h1 className="text-center mb-4">Задания</h1>
        <Tab.Container activeKey={activeKey} onSelect={this.handleSelect}>
          <Nav variant="tabs" className="justify-content-center mb-4">
            <Nav.Item>
              <Nav.Link 
                eventKey="tasks" 
                className={`text-light ${activeKey !== 'tasks' ? 'bg-secondary' : 'bg-dark'}`}>
                Задания
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="completed" 
                className={`text-light ${activeKey !== 'completed' ? 'bg-secondary' : 'bg-dark'}`}>
                Выполненные
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="tasks">
              <ListGroup>
                {tasks.length === 0 ? (
                  <ListGroup.Item className="bg-dark text-light">Нет заданий</ListGroup.Item>
                ) : (
                  tasks.map((task, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center bg-dark text-light">
                      {task}
                      <Button variant="success" onClick={() => this.completeTask(task)}>Выполнить</Button>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Tab.Pane>

            <Tab.Pane eventKey="completed">
              <h2 className="text-center">История выполненных заданий</h2>
              <ListGroup>
                {completedTasks.length === 0 ? (
                  <ListGroup.Item className="bg-dark text-light">Нет выполненных заданий</ListGroup.Item>
                ) : (
                  completedTasks.map((task, index) => (
                    <ListGroup.Item key={index} className="bg-dark text-light">{task}</ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  }
}