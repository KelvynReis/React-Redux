import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-weight: bold;
  }

  input {
    height: 40px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;
