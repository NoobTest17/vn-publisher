import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(()=> {
    navigate(LOGIN_ROUTE)
  },[])
};

export default NotFound;