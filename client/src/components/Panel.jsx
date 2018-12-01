import React, { Component } from 'react'

import Card from './Card';

import Flex from './../elements/Flex';
import Link from './../elements/Link';

import styled from 'styled-components';

import g from './../js/global';

const FlexContainer = styled(Flex.Container)`
  height: Calc(100vh - 40px);
`;

const ScrollArea = styled.div`
  overflow-y: scroll;
  ::-webkit-scrollbar-track
  {
    border: 1px solid black;
    background-color: ${g.panel.scrollbarBGColor};
  }

  ::-webkit-scrollbar
  {
    width: 10px;
    background-color: ${g.panel.scrollbarBGColor};
  }

  ::-webkit-scrollbar-thumb
  {
    background-color: ${g.panel.scrollbarColor};
    &:hover{
      background-color: ${g.panel.scrollbarHighlightColor};
    }
  }
`;

const FlexItem = styled(Flex.Item)`
  background-image: url(${prop => prop.bgImg ? prop.bgImg : ''});
  background-size: cover;
  background-position: center;
`;

const UserBanner = styled.div`
  img {
    border-radius: 50%;
    height: 60px;
    margin-bottom: -10px;
    border: solid 4px ${g.userBanner.outlineColor};
  }

  p {
    display: inline;
    font-size: larger;
    
    padding: 5px 5px;
    text-decoration: none;
    
    background-color: ${g.userBanner.outlineColor};
    border-radius: 4px;
  }

  a:hover {
    p {
      text-decoration: underline;
    }
  }
`;

export class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.data[0].user.screen_name,
      bgImgRef: props.data[0].user.profile_banner_url + '/600x200',
      imgRef: props.data[0].user.profile_image_url,
      tweetData: props.data,
      callback: props.callback
    }
  }

  render() {
    return (
      <FlexContainer direction='column' margin='20px' className='style-8'>
        <FlexItem height='70px' bgColor={g.userBanner.bgColor} bgImg={this.state.bgImgRef}>
          <UserBanner onClick={()=>this.state.callback(1)}>
            <Link
              href={'https://twitter.com/' + this.state.user}
              target='_'
              color={g.userBanner.fontColor}>
              <img src={this.state.imgRef} alt="" />
              <p>@{this.state.user}</p>
            </Link>
          </UserBanner>
        </FlexItem>

        <ScrollArea>
          {
            this.state.tweetData.map((data, index) => {
              return <Card key={'Card_' + index} data={data} />;
            })
          }
        </ScrollArea>
      </FlexContainer>
    )
  }
}

export default Panel
