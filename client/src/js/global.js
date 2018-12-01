const bgColor = '#111111';

const panel = {
  scrollbarColor: '#017467',
  scrollbarHighlightColor: '#219487',
  scrollbarBGColor: '#888'
}
const userBanner = {
  bgColor: '#293940',
  fontColor: '#fff',
  outlineColor: 'rgba(30, 30, 30, 0.9)'
}
const card = {
  bgColor: ['rgba(50,50,50,30)', 'rgba(55,55,55,30)'],
  retweetedColor: '#577',
  userColor: '#bdd',
  tweetColor: '#41FF00',
  tweetLinkColor: '#00b000',
  highlightColor: 'rgba(60, 60, 60, 30)'
}

const entityType = {
  Text: 0,
  Hashtag: 1,
  Symbol: 2,
  URL: 3,
  Mention: 4,
  Media: 5
}

module.exports = {
  bgColor: bgColor,
  panel: panel,
  userBanner: userBanner,
  card: card,
  entityType: entityType
};