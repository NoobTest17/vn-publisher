import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, ListGroup, ListGroupItem} from "react-bootstrap";
import {
  LOGIN_ROUTE, REGISTRATION_ROUTE, RULES_LOGIN, RULES_REGISTRATION, TECHNICAL_SUPPORT_ROUTE
} from "../utils/consts";
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
  const [codeHistory, setCodeHistory] = useState('')
  const [authorRegistration, setAuthorRegistration] = useState(false)
  const navigate = useNavigate();
  console.log(codeHistory)

  const click = async () => {
    try {
      if (isLogin) {
        const response = await login(loginUser, password, user.selectedRole)
        console.log(response)
        user.setIsAuth(true)
        navigate('/main')
      } else {
        const response = await registration(loginUser, password, codeHistory)
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
    setIsError({status: false, message: ''})
    setAuthorRegistration(false)
    user.setSelectedRole({})
  }

  const handlerInput = () => {
    setIsError({status: false, message: ''})
  }

  return (<Container
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
        {isLogin ? <Col className="d-flex justify-content-between mt-3">
          {RULES_LOGIN.map(rule => <Button
            variant="primary"
            style={{width: 160}}
            key={rule.id}
            onClick={() => {
              user.setSelectedRole(rule)
              click()
            }}
          >
            {rule.name}
          </Button>)}
        </Col> : <ListGroup className="mt-3">
          {RULES_REGISTRATION.map(rule => <ListGroupItem
            style={{cursor: "pointer"}}
            active={rule.id === user.selectedRole.id}
            onClick={() => {
              user.setSelectedRole(rule)
              setAuthorRegistration(rule.id === 2)
            }}
            key={rule.id}
          >
            {rule.name}
          </ListGroupItem>)}
        </ListGroup>}
        {authorRegistration && <Form.Control
          className="mt-3"
          value={codeHistory}
          onChange={(e) => setCodeHistory(e.target.value)}
          placeholder="Видете серийный номер истории"
        />}
        {isError.status && <Col className="d-flex justify-content-center mt-3 align-items-center">
          <div style={{color: 'red'}}>{isError.message}</div>
        </Col>}
        <Col className="d-flex justify-content-center mt-3 align-items-center">
          {isLogin ? <div className="w-100">
            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} onClick={clearAllInput}>Зарегистрируйся!</NavLink>
          </div> : <div className="w-100">
            Есть аккаунта? <NavLink to={LOGIN_ROUTE} onClick={clearAllInput}>Войдите!</NavLink>
          </div>}
          {isLogin || <Button
            variant={"primary"}
            onClick={() => {
              click();
              setPassword('')
            }}
          >
            {'Зарегистрироваться'}
          </Button>}
        </Col>
        <Col className="d-flex justify-content-start mt-3 align-items-center">
          <div>
            {'Возникли проблемы? '} <NavLink to={TECHNICAL_SUPPORT_ROUTE}>Техническая поддержка</NavLink>
          </div>
        </Col>
      </Form>
    </Card>
  </Container>);
};

export default observer(Auth);