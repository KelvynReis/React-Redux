import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

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
