import styled from 'styled-components';
import StyledInput from './StyledInput.js';
const FormInput = styled(StyledInput)`
  border: 0.3px solid #bbb8b8;
  width: 99%;
  width: 350px;
  height: 50px;
  border-radius: 15px;
  border: none;

  margin-right: 20px;
  border: 0.3px solid #caf1fa;
  ::placeholder {
    color: whiteGrey;
    font-size: 1.2rem;
  }
`;

export default FormInput;
