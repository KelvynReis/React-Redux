import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErros = false;

    if (!isEmail(email)) {
      formErros = true;
      toast.error('email inválido');
    }

    if (password.length < 6 || password.length > 255) {
      formErros = true;
      toast.error('senha invalida');
    }

    if (formErros) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1> Login</h1>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />

        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
