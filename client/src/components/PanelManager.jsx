import React, { Component } from 'react'

import Panel from './Panel';

import Grid from './../elements/Grid';

import styled from 'styled-components';

const twitterWrapper = require('./../js/twitterWrapper');

const GridContainer = styled(Grid.ColContainer)`
  @media screen and (max-width:960px){
    display: flex;
    grid-template-columns: unset;
    flex-direction: column;

    /* Flex Container */
    & > div {
      margin: 0;
      height: 100vh;
    }

    & > div:nth-child(${prop=> prop.active + 1}){
      display: flex;
    }
    & > div:nth-child(${prop=> ((prop.active+1)%prop.max) + 1 }){
      display: none;
    }
    & > div:nth-child(${prop=> ((prop.active+2)%prop.max) + 1 }){
      display: none;
    }
  }
`;

export class PanelManager extends Component {
  users = ['nodejs', 'reactjs', 'github'];
  constructor() {
    super();
    this.state = {
      data: [],
      active: 0
    };
  }

  fetchData = () => {
    this.setState({ data: [] });

    let _arr = [];
    twitterWrapper.getList(
      this.users,
      (data, index) => {
        _arr[index] = data;
        this.setState({ data: _arr })
      },
      30
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  switchPanel = (add) => {
    let _res = (this.state.active + add + this.users.length) % this.users.length;
    this.setState({
      active: _res
    });
  }
  
  render() {
    return (
      <div>
        <GridContainer columns={this.users.length} active={this.state.active} max={this.users.length}>
          {
            this.state.data.map((data,index)=>(
              <Panel key={'Panel_'+index} data={data} callback={this.switchPanel}/>
            ))
          }
        </GridContainer>
      </div>
    )
  }
}

export default PanelManager;
