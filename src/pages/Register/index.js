import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector((state) => state.auth.isLoading);
  const { id, nameStored, emailStored } = useSelector(
    (state) => state.auth.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;

    setName(nameStored);
    setEmail(emailStored);
  }, [id, emailStored, nameStored]);

  async function handleSubmit(e) {
    e.preventDefault();

    let formErros = false;

    if (name.length < 3 || name.length > 255) {
      formErros = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErros = true;
      toast.error('email inválido');
    }

    if (!id && (password.length < 6 || password.length > 255)) {
      formErros = true;
      toast.error('senha deve ter entre 6 e 50 caracteres');
    }

    if (formErros) return;

    dispatch(actions.registerRequest(name, email, password, id));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1> {id ? 'Editar dados' : 'Crie sua conta'}</h1>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </label>

        <button type="submit">{id ? 'Salvar' : 'Criar conta'}</button>
      </Form>
    </Container>
  );
}
