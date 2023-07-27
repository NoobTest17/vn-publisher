import React, {useContext} from 'react';
import {Routes as Switch, Route} from 'react-router-dom'
import {publicRoutes} from "../routes";
import NotFound from "../pages/NotFound";
import {Context} from "../index";
import Main from "../pages/Main";
import AdminPanel from "../pages/AdminPanel";

const AppRouter = () => {
  const {user} = useContext(Context)

  return (
    <Switch>
        {publicRoutes.map(({path, Component}) =>
          <Route key={path} path={path} element={Component}/>
        )}
        <Route path="/main" element={<Main/>}/>{/*Тестовый путь*/}
        <Route path="/admin_panel" element={<AdminPanel/>}/>
        <Route path="*" element={<NotFound/>}/>
    </Switch>
  );
};

export default AppRouter;