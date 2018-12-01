import styled from 'styled-components';

const ColContainer = styled.div`
  display: grid;
  grid-template-columns: repeat( ${prop => prop.columns ? prop.columns : 2}, 1fr);
  grid-gap: ${prop => prop.gap ? prop.gap : 'unset'};
  padding: ${prop => prop.padding ? prop.padding : 'unset'};
  margin: ${prop => prop.margin ? prop.margin : 'unset'};
`;

const RowContainer = styled.div`
  display: grid;
  grid-gap: ${prop => prop.gap ? prop.gap : 'unset'};
  padding: ${prop => prop.padding ? prop.padding : 'unset'};
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
  ColContainer,
  RowContainer,
  Item
};
