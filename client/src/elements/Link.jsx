import styled from 'styled-components';

const Link = styled.a`
  text-decoration: none;
  color: ${prop => prop.color ? prop.color : 'white'};
`;

export default Link;
