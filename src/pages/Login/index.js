import React from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';

import * as exampleActions from '../../store/modules/example/actions';

export default function Login() {
  const dispatch = useDispatch();

  function handleCLick(e) {
    e.preventDefault();

    dispatch(exampleActions.clicaBotãoRequest());
  }
  return (
    <Container>
      <h1>Ola login</h1>
      <button type="submit" onClick={handleCLick}>
        Enviar
      </button>
    </Container>
  );
}
