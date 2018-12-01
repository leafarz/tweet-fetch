import React, { Component } from 'react'

import styled from 'styled-components';

import g from './../js/global';

const MainDiv = styled.div`
  line-height: 1.2rem;
  display: inline-block;
  padding: 5px 0;

  color: ${g.card.tweetColor};
  cursor: pointer;

  .text, div {
    display: inline;
  }

  .date {
    padding: 5px 0;
  }

  img {
    display: block;
    width: 100%;
    padding: 10px 0;
  }
`;

const SubLink = styled.div`
  color: ${g.card.tweetLinkColor};
  &:hover {
    text-decoration: underline;
  }
`;

export class Tweet extends Component {
  openURL = (url) => {
    window.open(url)
  }

  constructor(props) {
    super(props);

    this.state = {
      color: props.color,
      bgColor: props.bgColor,
      textData: props.textData,
      tweetURL: props.tweetURL,
      date: props.date
    }
  }

  render() {
    const { tweetURL, date } = this.state;

    return (
      <MainDiv
        onClick={()=>{window.open(tweetURL)}}
        bgColor={this.state.bgColor}>

        {
          this.state.textData.map((data, index) => {
            switch(data.type)
            {
              case g.entityType.Text:
                return (
                  <p className='text' key={'text_'+index}>
                    {data.text}
                  </p>
                );

              case g.entityType.Hashtag:
                let _hashtagURL = 'https://twitter.com/hashtag/' + data.text.substring(1) + '?src=hash';
                return (
                  <SubLink
                    key={'ht_'+index}
                    onClick={()=>{window.open(_hashtagURL)}}>
                    {data.text}
                  </SubLink>
                );

              case g.entityType.Mention:
                let _mentionURL = 'https://twitter.com/' + data.text.substring(1);
                return (
                  <SubLink key={'m_'+index}
                    onClick={()=>{window.open(_mentionURL)}}>
                    {data.text}
                  </SubLink>
                );

              case g.entityType.Symbol:
                return(
                  <SubLink
                    key={'s_'+index}>
                    {data.text}
                  </SubLink>
                );

              case g.entityType.URL:
                let _url = data.text;
                return (
                  <SubLink
                    key={'url_'+index}
                    onClick={()=>{window.open(_url)}}>
                    {data.text}
                  </SubLink>
                );

              case g.entityType.Media:
                return (
                  <img key={'media_'+index} src={data.url} alt='' />
                );
              default:
                return '';
            }
          })

        }
        <p className='date'>{date}</p>
      </MainDiv>
    )
  }
}

export default Tweet
