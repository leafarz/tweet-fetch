import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: ${prop => prop.direction ? prop.direction : 'unset'};
  margin: ${prop => prop.margin ? prop.margin : 'unset'};
`;

const Item = styled.div`
  text-align: ${prop => prop.centered ? 'center' : 'unset'};
  height: ${prop => prop.height ? prop.height : 'unset'};
  background-color: ${prop => prop.bgColor ? prop.bgColor : 'unset'};
  padding: ${prop => prop.padding ? prop.padding : '20px'};
  margin: ${prop => prop.margin ? prop.margin : 'unset'};
`;

export default {
  Container,
  Item
};
