import React from 'react';

import { Switch } from 'react-router-dom';
import MyRoute from './MyRoute';

import Login from '../pages/Login';
import Alunos from '../pages/Alunos';
import Aluno from '../pages/Aluno';
import Register from '../pages/Register';
import Fotos from '../pages/Picture';
import Page404 from '../pages/Page404';

export default function Routers() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Alunos} isClosed={false} />
      <MyRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
      <MyRoute exact path="/aluno" component={Aluno} isClosed />
      <MyRoute exact path="/fotos/:id" component={Fotos} isClosed />
      <MyRoute exact path="/login" component={Login} isClosed={false} />
      <MyRoute exact path="/register" component={Register} isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
