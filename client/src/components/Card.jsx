import React, { Component } from 'react'

import Flex from './../elements/Flex';
import Link from './../elements/Link';

import styled from 'styled-components';

import g from './../js/global';

import icn_retweet from './../assets/textures/retweet.png';
import Tweet from './../components/Tweet';
//#region styled components
const FlexItem = styled(Flex.Item)`
  background-color: ${g.card.bgColor[0]};
  
  &:nth-child(odd) {
    background-color: ${g.card.bgColor[1]};
  }
  
  &:hover {
    background-color: ${g.card.highlightColor};
  }
`;

const CardHeader = styled(Link)`
  &:hover {
    h3 { /* UserName */
      text-decoration: underline;
      border-bottom: 1px solid;
    }
  }
`;

const ImgUser = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 5px;
  height: 40px;
`;

const UserName = styled.div`
  display: inline-block;

  .retweeted {
    display: flex;

    img {
      height: 1.5rem;
      margin-right: 10px;
      margin-top: 4px;
    }

    p {
      color: ${g.card.retweetedColor};
      padding: 0.5rem 0;
      margin-left: -0.5rem;
    }
  }

  .userName {
    display: inline;
  }

  .screenName {
    display: inline;
  }
  padding: 7.5px 0;
`;
//#endregion

export class Card extends Component {
  getElapsedTime(date) {
    const _convertions = {
      s: 1000,
      m: 60,
      h: 60,
      d: 24,
      w: 7,
      y: 52
    }

    let _units = new Date()-date;
    let _keys = Object.keys(_convertions);

    for(let i=-1; ++i < _keys.length; )
    {
      let _key = _keys[i];

      if(_units >= _convertions[_key]) {
        _units /= _convertions[_key];
      }
      else {
        return Math.trunc(_units) + _keys[Math.max(0, i-1)];
      }
    }

    return Math.trunc(_units) + 'y';
  }

  getIndex(text, word) {
    return text.toLowerCase().indexOf(word.toLowerCase());
  }

  parseHashtags(text, hashtags) {
    let _data = {};
    hashtags.forEach(hashtag => {
      // indices is not working properly that's why we use indexOf
      // we use toLowerCase since screen_name sometimes have different casing from text
      let _startIndex = this.getIndex(text, '#' + hashtag.text);
      let _endIndex = _startIndex + hashtag.text.length + 1;
      _data[_startIndex] = {
        end: _endIndex,
        text: hashtag.text,
        type: g.entityType.Hashtag
      }
    });
    return _data;
  }
  parseSymbols(text, symbols) {
    let _data = {};
    symbols.forEach(symbol => {
    });
    return _data;
  }
  parseURLs(text, urls) {
    let _data = {};
    urls.forEach(url => {
      // indices is not working properly that's why we use indexOf
      // we use toLowerCase since screen_name sometimes have different casing from text
      let _startIndex = this.getIndex(text, url.url);
      let _endIndex = _startIndex + url.url.length;
      _data[_startIndex] = {
        end: _endIndex,
        url: url.url,
        type: g.entityType.URL
      }
    });
    return _data;
  }
  parseMentions(text, mentions) {
    let _data = {};
    mentions.forEach(mention => {
      // indices is not working properly that's why we use indexOf
      // we use toLowerCase since screen_name sometimes have different casing from text
      let _startIndex = this.getIndex(text, '@' + mention.screen_name);
      let _endIndex = _startIndex + mention.screen_name.length + 1;

      _data[_startIndex] = {
        end: _endIndex,
        name: mention.screen_name,
        type: g.entityType.Mention
      }
    });
    return _data;
  }
  parseMedia(text, media) {
    let _data = {};
    if(!media) { return; }
    
    media.forEach((medium, index) => {
      _data['media_' + index] = {
        url: medium.media_url,
        type: g.entityType.Media
      }
    });
    return _data;
  }
  parseText(text, entities) {
    let _data = {
      ...this.parseHashtags(text, entities.hashtags),
      ...this.parseSymbols(text, entities.symbols),
      ...this.parseURLs(text, entities.urls),
      ...this.parseMentions(text, entities.user_mentions),
      ...this.parseMedia(text, entities.media)
    };
    
    let _elements = [];
    let _lastIndex = 0;


    Object.keys(_data).forEach(key => {
      // special case #hacky
      if(key.startsWith('media_')) {
        _elements.push({
          url: _data[key].url,
          type: g.entityType.Media
        })
        return;
      }

      let _type = _data[key].type;
      let _startIndex = parseInt(key);
      let _endIndex = _data[key].end;

      let _captured = text.substring(_lastIndex, _startIndex);
      // text only
      if(_captured.length > 0)
      {
        _elements.push({
          text: _captured,
          type: g.entityType.Text
        });
        _lastIndex = _startIndex;
      }

      // type
      _captured = text.substring(_lastIndex, _endIndex);
      if(_captured.length > 0)
      {
        _elements.push({
          text: _captured,
          type: _type
        });
        _lastIndex = _endIndex;
      }
    });

    return _elements;
  }
  
  constructor(props) {
    super(props);

    const _retweeted = props.data.retweeted_status !== undefined;
    const { user, created_at, entities, text, id_str } =
      (_retweeted ? props.data.retweeted_status : props.data);

    const _date = new Date(created_at);
    const _textData = this.parseText(text, entities);

    this.state = {
      name: user.name,
      screen_name: '@' + user.screen_name,
      profileURL: 'https://twitter.com/' + user.screen_name,
      imgRef: user.profile_image_url,
      retweeted: _retweeted,
      tweetURL: 'https://twitter.com/statuses/' + id_str,
      date: _date.toDateString() + ' | '+ _date.toLocaleTimeString(),
      elapsedDate: this.getElapsedTime(_date),
      originalText: text,
      textData: _textData
    };
  }

  render() {
    const {name, screen_name, profileURL, retweeted, tweetURL, date, elapsedDate} = this.state;

    return (
      <FlexItem>
        <CardHeader href={profileURL} target='_' color={g.card.userColor}>
          <ImgUser src={this.state.imgRef} alt="" />
          <UserName>
            {
              retweeted
                ? <div className='retweeted'>
                    <img src={icn_retweet} alt=''/>
                    <p>Retweeted</p>
                  </div>
                : ''
            }
            <h3 className='userName'>{name}</h3>
            <p className='screenName'>{' ' + screen_name + ' | ' + elapsedDate}</p>
          </UserName>
        </CardHeader>

        <br/>
        
        <Tweet tweetURL={tweetURL} date={date} textData={this.state.textData} />
      </FlexItem>
    )
  }
}

export default Card
