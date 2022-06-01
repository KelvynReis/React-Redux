import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

    if (password.length < 6 || password.length > 255) {
      formErros = true;
      toast.error('senha deve ter entre 6 e 50 caracteres');
    }

    if (formErros) return;

    try {
      await axios.post('/users', {
        name,
        email,
        password,
      });

      toast.success('Usuário criado com sucesso');
      history.push('/login');
    } catch (err) {
      const errors = get(err, 'response.data.erros', []);
      errors.map((error) => toast.error(error));
    }
  }

  return (
    <Container>
      <h1> Crie sua conta</h1>

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

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
