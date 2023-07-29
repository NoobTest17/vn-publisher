import React, {useEffect, useState} from 'react';
import {Card, Col, Container, ListGroup, Nav, Row, Tab} from "react-bootstrap";
import {getAllUsers} from "../http/adminAPI";

const AdminPanel = () => {
  const [users, setUsers] = useState([])

  useEffect(  () => {
    const allUsers = async () => {
      const dataUser = await getAllUsers()
      setUsers(dataUser.data.users)
    }
    allUsers()
  }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 60}}
    >
      <Card style={{width: 900}} className="p-5">
        <h2 className="m-auto">Панель администратора</h2>
        <Tab.Container id="left-tabs-example" defaultActiveKey="userList">
          <Row className="mt-3">
            <Col sm={3}>
              <Nav variant="pills" className="flex-column" style={{width: 150}}>
                <Nav.Item>
                  <Nav.Link eventKey="userList">Список игроков</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Открытые чаты</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="userList">
                  <ListGroup>
                    {users.map(({login}) => <ListGroup.Item key={login}>{login}</ListGroup.Item>)}
                  </ListGroup>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  чаты
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Card>
    </Container>
  );
};

export default AdminPanel;