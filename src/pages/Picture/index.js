import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Picture({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsloading] = useState(false);
  const [picture, setPicture] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsloading(true);
        const { data } = await axios.get(`/alunos/${id}`);

        setPicture(get(data, 'Fotos[0].url', ''));
        setIsloading(false);
      } catch {
        toast.error('Erro ao carregar a foto');
        setIsloading(false);
        history.push('/');
      }
    };

    getData();
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    const fotoURL = URL.createObjectURL(file);

    setPicture(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsloading(true);

      await axios.post('/fotos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto salva com sucesso');

      setIsloading(false);
      history.push(`/aluno/${id}/edit`);
    } catch (err) {
      setIsloading(false);

      const { status } = get(err, 'response', '');
      toast.error(`Erro ao salvar a foto (${status})`);

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container isLoading={isLoading}>
      <Loading />
      <Title> Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {picture ? <img src={picture} alt="Foto" /> : 'Selecione uma foto'}
          <input type="file" id="foto" onChange={(e) => handleChange(e)} />
        </label>
      </Form>
    </Container>
  );
}

Picture.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
