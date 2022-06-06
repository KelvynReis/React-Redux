import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', '');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const [picture, setPicture] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsloading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Foto[0].url', '');
        setPicture(Foto);

        setName(data.nome);
        setLastName(data.sobrenome);
        setEmail(data.email);
        setAge(data.idade);
        setWeight(data.peso);
        setHeight(data.altura);

        setIsloading(false);
      } catch (err) {
        setIsloading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
          history.push('/');
        }
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErros = false;

    if (name.length < 3 || name.length > 255) {
      toast.error('nome precisa ter entre 3 e 255 caracteres');
      formErros = true;
    }
    if (lastName.length < 3 || lastName.length > 255) {
      toast.error('sobrenome precisa ter entre 3 e 255 caracteres');
      formErros = true;
    }

    if (!isEmail(email)) {
      formErros = true;
      toast.error('E-mail inválido');
    }

    if (!isInt(String(age))) {
      formErros = true;
      toast.error('Idade invalida');
    }

    if (!isFloat(String(weight))) {
      formErros = true;
      toast.error('Peso invalido');
    }

    if (!isFloat(String(height))) {
      formErros = true;
      toast.error('Altura invalida');
    }
    if (formErros) return;

    try {
      setIsloading(true);
      if (id) {
        // update
        await axios.put(`/alunos/${id}`, {
          nome: name,
          sobrenome: lastName,
          email,
          idade: age,
          peso: weight,
          altura: height,
        });
        toast.success('Aluno(a) atualizado(a) com sucesso!');
      } else {
        // create
        const { data } = await axios.post('/alunos', {
          nome: name,
          sobrenome: lastName,
          email,
          idade: age,
          peso: weight,
          altura: height,
        });
        toast.success('Aluno(a) criado(a) com sucesso!');
        history.push(`/aluno/${data.id}/edit`);
      }
      setIsloading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title> {id ? 'Editar Aluno' : 'Novo Aluno'} </Title>

      {id && (
        <ProfilePicture>
          {picture ? (
            <img src={picture} alt={name} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome"
          />
        </label>

        <label htmlFor="lastName">
          Sobrenome:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Digite sobrenome"
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite Email"
          />
        </label>

        <label htmlFor="age">
          Idade:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Digite sua idade"
          />
        </label>

        <label htmlFor="weight">
          Peso:
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Digite seu peso"
          />
        </label>

        <label htmlFor="height">
          Altura:
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Digite seu peso"
          />
        </label>

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
