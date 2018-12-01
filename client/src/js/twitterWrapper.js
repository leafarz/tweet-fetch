function getList(screenNames, cb, count) {
  let _urls = [];

  screenNames.forEach(screenName => _urls.push(
      '/api/tweet?' +
      'user=' + screenName +
      '&count=' + count
  ));

  let _index = 0;
  Promise.all(_urls.map(data =>
    fetch(data)
      .then(res => res.json())
      .then(data => {
        cb(data, _index++);
      })
      .catch(err => console.log(err))
  ));
}

module.exports = {
  getList: getList
};