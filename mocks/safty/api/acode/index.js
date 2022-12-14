const aCodeList = require('./aCodeList.json')

module.exports = {
  get() {
    return [200, aCodeList]
  },
  post() {
    return [200]
  },
}
