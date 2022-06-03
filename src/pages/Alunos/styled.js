import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #eee;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const NewStudents = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 10px 0;
  border-radius: 4px;
  margin-top: 25px;
  background-color: #eee;

  text-align: center;
`;
