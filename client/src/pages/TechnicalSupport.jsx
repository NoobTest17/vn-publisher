import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Dropdown, Form, FormLabel} from "react-bootstrap";
import {SUBJECTS} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const TechnicalSupport = () => {
  const [subject, setSubject] = useState({
    id: 0,
    subject: ''
  });
  const [problemMessage, setProblemMessage] = useState('')
  const navigate = useNavigate();

  return (<Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 60}}
    >
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">Техподдержка</h2>
        <Form>
          <Col className="d-flex mt-3 align-content-center flex-column">
            <Form.Label>Тема обращения:</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="">Выберете тему обращения</option>
              {
                SUBJECTS.map(Subject =>
                  <option
                    key={Subject.id}
                    onClick={() => setSubject(Subject)}
                  >
                    {Subject.subject}
                  </option>
                )}
            </Form.Select>
            <div
              style={{
                paddingLeft: 25,
              }}
              className="border-1"
            >
              {subject.subject}
            </div>
          </Col>
          <Col className="mt-3">
            <Form.Group>
              <Form.Label>Введите сообщение:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Введите ваше сообщение..."
                value={problemMessage}
                onChange={(e) => setProblemMessage(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="mt-3">
            <Button onClick={() => navigate('/login')}>
              Вернуться назад
            </Button>
          </Col>
        </Form>
      </Card>
    </Container>

  );
};

export default TechnicalSupport;