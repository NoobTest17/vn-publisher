import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div>
      Main
      <Button onClick={() => navigate('/admin_panel')}>Админ панель</Button>
    </div>
  );
};

export default Main;
