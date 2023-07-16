import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, ListGroup, ListGroupItem} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, TECHNICAL_SUPPORT_ROUTE} from "../utils/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {login, registration} from "../http/userAPI";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE
  const {user} = useContext(Context)
  const [loginUser, setLoginUser] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState({status: false, message: ''})
  const navigate = useNavigate();

  const click = async () => {
    try {
      if (isLogin) {
        const response = await login(loginUser, password)
        console.log(response)
        user.setIsAuth(true)
        // navigate()
      } else {
        const response = await registration(loginUser, password)
        console.log(response)
        navigate(LOGIN_ROUTE)
      }
    } catch (e) {
      setIsError({status: true, message: e.response.data.message})
    }
  }

  const clearAllInput = () => {
    setLoginUser('')
    setPassword('')
  }

  const handlerInput = () => {
    setIsError({status: false, message: ''})
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 60}}
    >
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            value={loginUser}
            onChange={(e) => setLoginUser(e.target.value)}
            onClick={handlerInput}
            className="mt-3"
            placeholder="Видете логин"
          />
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={handlerInput}
            className="mt-3"
            type="password"
            placeholder="Видете пароль"
          />
          {isLogin && <ListGroup className="mt-3">
            {user.rules.map(rule =>
              <ListGroupItem
                style={{cursor: "pointer"}}
                active={rule.id === user.selectedRole.id}
                onClick={() => user.setSelectedRole(rule)}
                key={rule.id}
              >
                {rule.name}
              </ListGroupItem>
            )}
          </ListGroup>}
          {
            isError.status &&
            <Col className="d-flex justify-content-center mt-3 align-items-center">
              <div style={{color: 'red'}}>{isError.message}</div>
            </Col>
          }
          <Col className="d-flex justify-content-center mt-3 align-items-center">
            {isLogin ?
              <div className="w-100">
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} onClick={clearAllInput}>Зарегистрируйся!</NavLink>
              </div>
              :
              <div className="w-100">
                Есть аккаунта? <NavLink to={LOGIN_ROUTE} onClick={clearAllInput}>Войдите!</NavLink>
              </div>
            }
            {isLogin ?
              <Button
                variant={"outline-success"}
                onClick={click}
              >
                {'Войти'}
              </Button>
              :
              <Button
                variant={"outline-success"}
                onClick={() => {
                  click();
                  setPassword('')
                }}
              >
                {'Зарегистрироваться'}
              </Button>
            }
          </Col>
          <Col className="d-flex justify-content-start mt-3 align-items-center">
            <div>
              {'Возникли проблемы? '} <NavLink to={TECHNICAL_SUPPORT_ROUTE}>Техническая поддержка</NavLink>
            </div>
          </Col>
        </Form>
      </Card>
    </Container>
  );
};

export default observer(Auth);