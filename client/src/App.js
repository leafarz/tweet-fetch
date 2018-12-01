import React, { Component } from 'react';

import './App.css';
import PanelManager from './components/PanelManager';

import styled from 'styled-components';
import g from './js/global';

const MainDiv = styled.div`
  background-color: ${g.bgColor};
`;
class App extends Component {
  
  render() {
    return (
      <MainDiv className="App">
        <PanelManager />
      </MainDiv>
    );
  }
}

export default App;
